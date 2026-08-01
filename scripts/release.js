#!/usr/bin/env node
/**
 * Cuts a release of @ff8-speedruns/ui.
 *
 *   npm run release -- 1.1.0
 *
 * Because the tools install this package straight from git, the built output
 * has to be committed alongside the version bump — otherwise a consumer pins a
 * tag and gets stale JavaScript. Doing it in one script is the whole point:
 * there is no way to tag without rebuilding first.
 *
 * It deliberately stops short of pushing. Review, then push the branch and tag.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// git.exe is a real executable, not a shell script, so it never needs `shell:
// true` — and shouldn't get it: with shell:true, Node concatenates args with
// spaces instead of escaping them, so a multi-word commit message silently
// splits into separate argv entries (e.g. `-m "Release v1.1.0"` becomes the
// three words `-m`, `Release`, `v1.1.0`, and git reads the stray `v1.1.0` as a
// pathspec — exactly the "pathspec did not match any files" error this caused).
const run = (cmd, args) => execFileSync(cmd, args, { cwd: root, stdio: 'inherit' });

// npm.cmd on Windows is a batch file and does need shell resolution to run at
// all, so it keeps shell:true — its own arguments here never contain spaces.
const runNpm = (args) =>
  execFileSync('npm', args, { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' });

const version = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(version ?? '')) {
  console.error('Usage: npm run release -- <major.minor.patch>');
  process.exit(1);
}

const status = execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' });
const dirty = status.split('\n').filter((line) => line.trim() && !line.includes('dist/'));
if (dirty.length) {
  console.error('Working tree has uncommitted changes outside dist/:\n' + dirty.join('\n'));
  process.exit(1);
}

const pkgPath = resolve(root, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
pkg.version = version;
writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

runNpm(['run', 'build']);
run('git', ['add', 'package.json', 'dist']);
run('git', ['commit', '-m', `Release v${version}`]);
run('git', ['tag', `v${version}`]);

console.log(`\nTagged v${version}. Push when you are happy with it:`);
console.log('  git push origin main --follow-tags\n');
console.log('Then bump the tag in each consuming tool:');
console.log(`  "@ff8-speedruns/ui": "github:ff8-speedruns/ff8-ui#v${version}"\n`);

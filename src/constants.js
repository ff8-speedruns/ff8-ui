// The hub. Every tool links back here from its header.
//
// Deliberately host-relative: the site answers on both ff8-speedruns.github.io
// and the custom domain tools.ff8.wiki, and every tool is a project page under
// whichever one the visitor arrived on. An absolute URL would bounce people
// between the two.
export const GARDEN_URL = '/';

export const ORG_URL = 'https://github.com/ff8-speedruns';

// Shared across every tool on purpose. All of them are served from the same
// origin (ff8-speedruns.github.io), so one key means a runner's light/dark
// choice follows them from the hub into each tool and back.
export const COLOR_SCHEME_KEY = 'ff8-color-scheme';

// Same vocabulary the hub's tool table uses, so a tool's own badge and its row
// on the hub can never disagree about what a status is called.
export const STATUSES = {
  working: { label: 'Working', color: 'green', textColor: 'white' },
  needsTesters: { label: 'Needs Testers', color: 'yellow' },
  development: { label: 'Development', color: 'orange', textColor: 'white' },
  external: { label: 'External Link', color: 'gray' },
};

export function repoUrl(repo) {
  return repo?.startsWith('http') ? repo : `${ORG_URL}/${repo}`;
}

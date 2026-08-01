# @ff8-speedruns/ui

Shared Mantine theme and app shell for the FF8 speedrunning tools, so every tool
in the org looks and behaves the same.

The tools install this package straight from git,
which is why `dist/` is committed to the repo.

## Using it in a tool

```json
"dependencies": {
  "@ff8-speedruns/ui": "github:ff8-speedruns/ff8-ui#v1.0.0",
  "@mantine/core": "^9.5.0",
  "@mantine/hooks": "^9.5.0",
  "@tabler/icons-react": "^3.46.0",
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
}
```

`main.jsx`:

```jsx
import { createRoot } from 'react-dom/client';
import { FF8Provider, ToolShell } from '@ff8-speedruns/ui';

import '@mantine/core/styles.css';
import '@ff8-speedruns/ui/styles.css';

createRoot(document.getElementById('root')).render(
  <FF8Provider>
    <ToolShell title="Fish Fin Manip" status="working" repo="fish-fins">
      {/* the tool itself */}
    </ToolShell>
  </FF8Provider>
);
```

Order matters: Mantine's stylesheet first, ours second.

### index.html

Every tool needs this in `<head>`, before the app script. It reads the saved
colour scheme and sets it on `<html>` before first paint — without it the page
flashes light for a frame on every load for anyone using dark mode.

```html
<script>
  try {
    var s = window.localStorage.getItem('ff8-color-scheme');
    var scheme = s === 'light' || s === 'dark' || s === 'auto' ? s : 'auto';
    document.documentElement.setAttribute(
      'data-mantine-color-scheme',
      scheme !== 'auto'
        ? scheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
    );
  } catch (e) {}
</script>
```

The `ff8-color-scheme` key is shared by every tool deliberately. They are all
served from `ff8-speedruns.github.io`, so one key means a runner's light/dark
choice follows them from the hub into a tool and back.

## What's exported

| Export             | What it is                                                                |
| ------------------ | ------------------------------------------------------------------------- |
| `FF8Provider`      | `MantineProvider` with the shared theme and colour-scheme manager          |
| `ToolShell`        | Header + content container + footer. The frame a tool renders inside       |
| `SiteHeader`       | The header bar on its own, if a tool needs a custom shell                  |
| `ToolFooter`       | Credits and back-to-garden links                                           |
| `ColorSchemeToggle`| Light/dark button                                                          |
| `StatusBadge`      | Working / Needs Testers / Development badge, same vocabulary as the hub    |
| `DPad`             | The directional pad used by the pole-skip and final-party manips           |
| `theme`            | The raw Mantine theme, if you need to extend it                            |
| `STATUSES`         | Status keys, labels and colours                                            |

### ToolShell

```jsx
<ToolShell
  title="Final Party Manipulation"
  status="needsTesters"
  repo="final-party-manip"
  intro="Short description of what the tool does."
  links={[{ label: 'How-to', href: 'https://youtube.com/...' }]}
  credits="Pingval, awesomeWaves, Brofar."
  size="lg"
>
  {children}
</ToolShell>
```

`repo` accepts a bare repo name (`fish-fins`) or a full URL.

### DPad

Owns the widget and the key bindings — arrow keys always, WASD when focus isn't
in a text field. What a press *means* stays in the tool:

```jsx
<DPad onPress={(dir) => append(dir)} withWild />
```

`onPress` receives `'up' | 'down' | 'left' | 'right' | 'wild'`.

## Development

```bash
npm install
npm run build      # or: npm run watch
```

To test a change against a tool before tagging, point that tool at your working
copy: `npm install ../ff8-ui` (this writes a `file:` dependency, so remember to
put the `github:` line back before committing).

## Releasing

```bash
npm run release -- 1.1.0
```

That rebuilds `dist/`, commits it with the version bump, and tags `v1.1.0`. It
does not push. Once you've pushed, bump the tag in each tool that should pick
the change up — tools stay on their pinned tag until you do, which is the point.

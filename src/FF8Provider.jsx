import PropTypes from 'prop-types';
import {
  MantineProvider,
  localStorageColorSchemeManager,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { theme } from './theme';
import { COLOR_SCHEME_KEY } from './constants';

const colorSchemeManager = localStorageColorSchemeManager({ key: COLOR_SCHEME_KEY });

// mod+J came from the hub. Registering it here means every tool answers to the
// same shortcut instead of only the one page that happened to implement it.
function ColorSchemeHotkey() {
  const { setColorScheme } = useMantineColorScheme();
  const computed = useComputedColorScheme('light', { getInitialValueInEffect: false });
  useHotkeys([['mod+J', () => setColorScheme(computed === 'dark' ? 'light' : 'dark')]]);
  return null;
}

/**
 * Wrap every tool's tree in this. It supplies the shared theme and points the
 * colour-scheme manager at the shared storage key.
 *
 * Pair it with the matching inline script in index.html (see the README) —
 * without that, the page paints in light mode for a frame before React boots
 * and reads localStorage.
 */
export function FF8Provider({ children, defaultColorScheme = 'auto' }) {
  return (
    <MantineProvider
      theme={theme}
      colorSchemeManager={colorSchemeManager}
      defaultColorScheme={defaultColorScheme}
    >
      <ColorSchemeHotkey />
      {children}
    </MantineProvider>
  );
}

FF8Provider.propTypes = {
  children: PropTypes.node,
  defaultColorScheme: PropTypes.oneOf(['light', 'dark', 'auto']),
};

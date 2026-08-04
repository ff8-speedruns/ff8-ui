import PropTypes from 'prop-types';
import { ActionIcon, Tooltip, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

export function ColorSchemeToggle({ size = 'lg', variant = 'default' }) {
  const { setColorScheme } = useMantineColorScheme();
  // getInitialValueInEffect: false - the inline script in index.html has already
  // resolved the scheme by the time this renders, so there is nothing to defer.
  const computed = useComputedColorScheme('light', { getInitialValueInEffect: false });
  const dark = computed === 'dark';

  return (
    <Tooltip label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <ActionIcon
        size={size}
        variant={variant}
        color={dark ? 'yellow' : 'blue'}
        onClick={() => setColorScheme(dark ? 'light' : 'dark')}
        aria-label="Toggle color scheme"
      >
        {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
      </ActionIcon>
    </Tooltip>
  );
}

ColorSchemeToggle.propTypes = {
  size: PropTypes.string,
  variant: PropTypes.string,
};

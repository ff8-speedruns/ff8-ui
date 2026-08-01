import { createTheme } from '@mantine/core';

export const BRAND_GRADIENT = { from: 'blue', to: 'cyan', deg: 45 };

export const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md',
  defaultGradient: BRAND_GRADIENT,
  cursorType: 'pointer',
  // Keeps text legible on filled badges and buttons without every tool having
  // to pick a foreground colour by hand.
  autoContrast: true,
  headings: {
    fontWeight: '600',
    textWrap: 'balance',
  },
  components: {
    Anchor: { defaultProps: { underline: 'hover' } },
    Table: { defaultProps: { highlightOnHover: true, verticalSpacing: 'xs' } },
    Badge: { defaultProps: { variant: 'filled' } },
  },
});

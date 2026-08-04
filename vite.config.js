import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Library build. Everything the consuming tools already have - React, Mantine,
// the icon set - stays external so we don't ship a second copy of it.
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.js'),
      formats: ['es'],
      fileName: () => 'index.js',
      cssFileName: 'styles',
    },
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        'react-dom',
        '@mantine/core',
        '@mantine/hooks',
        '@tabler/icons-react',
        'prop-types',
      ],
    },
  },
});

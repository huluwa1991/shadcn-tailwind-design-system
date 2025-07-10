import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    dts: true,
    sourcemap: true,
    splitting: false,
    clean: true,
    format: ['esm', 'cjs'],
    external: [
        'react',
        'react-dom',
        'clsx',
        'tailwind-merge',
        '@radix-ui/react-avatar',
        '@radix-ui/react-checkbox',
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-label',
        '@radix-ui/react-popover',
        '@radix-ui/react-radio-group',
        '@radix-ui/react-select',
        '@radix-ui/react-slot',
        '@radix-ui/react-switch',
        '@radix-ui/react-tabs',
        '@radix-ui/react-tooltip',
    ],
})

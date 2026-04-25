import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            'auto-skeleton': path.resolve(__dirname, '../src/index.ts'),
        },
    },
    server: {
        port: 5173,
        open: true,
    },
});

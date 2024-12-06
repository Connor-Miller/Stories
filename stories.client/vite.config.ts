import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tailwindcss from "tailwindcss";



// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), mkcert()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '^/api': {
                target: 'https://localhost:7057',
                secure: false
            }
        },
        port: 5173,
        https: true
    }
})

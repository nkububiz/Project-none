import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function cleanUrlsPlugin(): Plugin {
  const rewrite = (req: any) => {
    if (req.url) {
      const [pathname, search] = req.url.split('?');
      const q = search ? `?${search}` : '';
      if (pathname === '/jobs') req.url = `/jobs.html${q}`;
      else if (pathname === '/enroll') req.url = `/enroll.html${q}`;
      else if (pathname === '/post-job') req.url = `/post-job.html${q}`;
      else if (pathname === '/admin') req.url = `/admin.html${q}`;
    }
  };

  return {
    name: 'clean-urls',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewrite(req);
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewrite(req);
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), cleanUrlsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          jobs: path.resolve(__dirname, 'jobs.html'),
          enroll: path.resolve(__dirname, 'enroll.html'),
          postJob: path.resolve(__dirname, 'post-job.html'),
          admin: path.resolve(__dirname, 'admin.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});


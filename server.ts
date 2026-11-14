import express from 'express';
import path from 'node:path';
import { Readable } from 'node:stream';
import type { ReadableStream as NodeWebReadableStream } from 'node:stream/web';

const PORT = 3000;
const ALLOWED_R2_PREFIX = 'https://pub-dcfbf26a7f4e400a970b6df041e7a3f5.r2.dev/';

function sanitizePdfFilename(rawName: string | undefined, fallbackUrl: string): string {
  let candidate = (rawName || '').trim();
  if (!candidate) {
    try {
      const parsed = new URL(fallbackUrl);
      candidate = decodeURIComponent(parsed.pathname.split('/').pop() || 'parts-book.pdf');
    } catch {
      candidate = 'parts-book.pdf';
    }
  }
  candidate = candidate.replace(/[<>:"/\\|?*\x00-\x1f]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!candidate) candidate = 'parts-book.pdf';
  if (!/\.pdf$/i.test(candidate)) {
    candidate += '.pdf';
  }
  return candidate;
}

async function startServer() {
  const app = express();

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.get('/api/download-pdf', async (req, res) => {
    const rawUrl = typeof req.query.url === 'string' ? req.query.url : '';
    const rawFilename = typeof req.query.filename === 'string' ? req.query.filename : '';

    if (!rawUrl || !rawUrl.startsWith(ALLOWED_R2_PREFIX)) {
      res.status(400).json({ error: 'Invalid or disallowed PDF URL' });
      return;
    }

    try {
      const upstream = await fetch(rawUrl);
      if (!upstream.ok || !upstream.body) {
        res.status(upstream.status || 502).json({ error: 'Failed to fetch PDF file' });
        return;
      }

      const filename = sanitizePdfFilename(rawFilename, rawUrl);
      const asciiFallback = filename.replace(/[^\x20-\x7e]/g, '_').replace(/"/g, '');
      const utf8Encoded = encodeURIComponent(filename);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${asciiFallback}"; filename*=UTF-8''${utf8Encoded}`
      );
      res.setHeader('Cache-Control', 'private, max-age=3600');

      const contentLength = upstream.headers.get('content-length');
      if (contentLength) {
        res.setHeader('Content-Length', contentLength);
      }

      const nodeStream = Readable.fromWeb(upstream.body as unknown as NodeWebReadableStream);
      nodeStream.on('error', () => {
        if (!res.headersSent) {
          res.status(502).end();
        } else {
          res.destroy();
        }
      });
      nodeStream.pipe(res);
    } catch {
      if (!res.headersSent) {
        res.status(502).json({ error: 'Download proxy request failed' });
      }
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

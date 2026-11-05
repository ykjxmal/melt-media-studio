# MELT — Media Studio

A designed, responsive Next.js interface for choosing YouTube media output formats.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Import that repository in Vercel as a Next.js project.
3. Deploy. The interface works immediately.

## Important: conversion backend

**This repository does not perform actual downloads by itself.** The API route `/api/convert` forwards to `CONVERTER_BACKEND_URL/convert` if that environment variable is set. With no backend it returns an honest 503 error. `package.json` installs the web dependencies, **not** FFmpeg or yt-dlp system binaries.

A real processing backend should be hosted separately on a long-running service (not Vercel Functions), install FFmpeg and yt-dlp, validate URLs and formats, restrict downloads to permitted content, and implement jobs with progress reporting, size/time limits, rate limits, and direct download URLs. The current route is a basic integration placeholder and is not a production streaming pipeline. It times out after 25 seconds, so a production backend should use a job API instead.

Never expose an unrestricted downloader to the public without abuse protection. YouTube terms and content permissions apply.

## Formats

MP3, MP4, MKV, ALAC, AAC, FLAC, WAV, M4A, OPUS, OGG, WEBM.

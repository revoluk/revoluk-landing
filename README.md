# Revoluk Solution's — Landing Page

Landing page institucional da Revoluk Solution's. React + Vite + Tailwind CSS, inspirada no design system do expo.dev (dark mode, bento grid, glow sutil).

## Rodando localmente

```
npm install
npm run dev
```

## Build de producao

```
npm run build
npm run start
```

npm run start sobe o vite preview na porta definida pela variavel de ambiente PORT (usada pelo Railway).

## Deploy no Railway

Este repositorio ja inclui railway.json configurando build (npm ci && npm run build) e start (npm run start). Basta conectar o repositorio no Railway e o deploy e automatico a cada push na branch principal.

# syntax=docker/dockerfile:1.6

FROM node:22-alpine AS deps
WORKDIR /repo

RUN apk add --no-cache libc6-compat
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.json tsconfig.base.json ./
COPY packages ./packages
COPY docs-blitz ./docs-blitz

RUN pnpm install --frozen-lockfile

FROM node:22-alpine AS build
WORKDIR /repo

RUN apk add --no-cache libc6-compat
RUN corepack enable

COPY --from=deps /repo/node_modules ./node_modules
COPY --from=deps /repo/package.json ./package.json
COPY --from=deps /repo/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=deps /repo/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=deps /repo/tsconfig.json ./tsconfig.json
COPY --from=deps /repo/tsconfig.base.json ./tsconfig.base.json
COPY --from=deps /repo/packages ./packages
COPY --from=deps /repo/docs-blitz ./docs-blitz

WORKDIR /repo/docs-blitz
RUN pnpm build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /repo/docs-blitz/.next/standalone ./
COPY --from=build /repo/docs-blitz/.next/static ./docs-blitz/.next/static
COPY --from=build /repo/docs-blitz/public ./docs-blitz/public

USER nextjs
EXPOSE 3000
CMD ["node", "docs-blitz/server.js"]

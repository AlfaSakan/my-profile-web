# DEPS
FROM node:16-alpine AS deps

ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
RUN yarn add --dev typescript @types/react @types/node tailwindcss postcss autoprefixer

# BUILDER
FROM node:16-alpine AS builder

ENV NODE_ENV=production

WORKDIR /app

COPY next.config.js tailwind.config.js tsconfig.json package.json yarn.lock .babelrc postcss.config.js .env.production ./
COPY --from=deps /app/node_modules ./node_modules

COPY components ./components
COPY configs ./configs
COPY constants ./constants
COPY hooks ./hooks
COPY models ./models
COPY pages ./pages
COPY public ./public
COPY services ./services
COPY stores ./stores
COPY styles ./styles
COPY utils ./utils
COPY view_model ./view_model

RUN yarn build

# RUNNER
FROM node:16-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

CMD ["node", "server.js"]

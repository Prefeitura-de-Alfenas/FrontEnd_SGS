# Base image
FROM node:16-bullseye AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

# Force Next.js to use Babel compiler instead of SWC
ENV SWCMINIFY 0
ENV NODE_OPTIONS="--max_old_space_size=4096"

# Create a simple .babelrc to ensure Babel is used
RUN echo '{"presets": ["next/babel"]}' > .babelrc

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user to run the app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

# Make sure the nextjs user owns these directories
RUN chown -R nextjs:nodejs /app

# Switch to the nextjs user
USER nextjs

# Expose the port
EXPOSE 3016

# Start the application
CMD ["npm", "run", "start"]
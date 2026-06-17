# =============================================================================
# Stage 1: Build stage - compile TypeScript
# =============================================================================
FROM node:20-alpine AS builder
WORKDIR /app

# Install build dependencies (Python for native modules like sharp, bcrypt)
RUN apk add --no-cache python3 py3-pip make g++

# Copy package files first for layer caching
COPY package.json package-lock.json* ./

# Install ALL dependencies (including devDependencies) for build
RUN npm ci

# Copy source code
COPY tsconfig.json ./
COPY src/ ./src/

# Build TypeScript to JavaScript
RUN npm run build

# =============================================================================
# Stage 2: Production dependencies
# =============================================================================
FROM node:20-alpine AS deps
WORKDIR /app

# Install runtime OS dependencies (build tools needed for native modules like sharp)
RUN apk add --no-cache python3 py3-pip make g++

# Copy package files
COPY package.json package-lock.json* ./
COPY requirements.txt* ./

# Install only production Node.js dependencies
RUN npm ci --omit=dev

# Install Python dependencies if requirements.txt exists
RUN if [ -f requirements.txt ]; then pip install --no-cache-dir -r requirements.txt; fi

# =============================================================================
# Stage 3: Production runner
# =============================================================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Install minimal runtime dependencies (Python for native modules)
RUN apk add --no-cache python3 py3-pip curl

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Copy production dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy package files for metadata
COPY --from=builder /app/package.json ./

# Copy Python dependencies if installed
COPY --from=deps /usr/lib/python3* /usr/lib/python3*

# Create logs directory and set permissions
RUN mkdir -p logs && chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3001

# Build-time arguments for image labeling
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION

# Labels for image metadata
LABEL org.opencontainers.image.title="AetherMint Backend" \
      org.opencontainers.image.description="Backend API for AetherMint decentralized education platform" \
      org.opencontainers.image.source="https://github.com/AetherEdu/AetherMint" \
      org.opencontainers.image.version="${VERSION:-latest}" \
      org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.revision="${VCS_REF}"

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD curl -f http://localhost:3001/api/health || exit 1

# Start the application
CMD ["node", "dist/index.js"]

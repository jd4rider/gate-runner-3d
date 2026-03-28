import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const normalizeBasePath = (rawBasePath: string | undefined) => {
  if (!rawBasePath || rawBasePath === '/') {
    return '/'
  }

  const trimmed = rawBasePath.replace(/^\/+|\/+$/g, '')
  return `/${trimmed}/`
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: normalizeBasePath(env.VITE_BASE_PATH),
    build: {
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (
              id.includes('/three/') ||
              id.includes('@react-three/fiber') ||
              id.includes('@react-three/drei')
            ) {
              return 'r3f'
            }

            return undefined
          },
        },
      },
    },
    plugins: [react()],
  }
})

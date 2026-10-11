import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static-site friendly build: relative assets, SPA fallback handled by the host
// (see README.md for nginx / generic static host configuration).
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Split the heaviest dependencies into their own cached chunks.
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('@mui') || id.includes('@emotion')) return 'mui'
          if (
            id.includes('react-router') ||
            id.includes('lucide-react') ||
            /node_modules\/(react|react-dom)\//.test(id)
          ) {
            return 'vendor'
          }
          return undefined
        },
      },
    },
  },
})

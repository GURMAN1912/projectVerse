import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist', // this is default for Vite
    rollupOptions: {
      // any custom build options
    }
  },
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        secure:false,
      }
    }
  },
  plugins: [react()],
})

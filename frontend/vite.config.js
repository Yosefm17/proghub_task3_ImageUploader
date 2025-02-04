import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // port: 3000, // Change the port if needed
    open: true, // Opens the browser when the server starts
    // cors: true, // Enables CORS
  }
})

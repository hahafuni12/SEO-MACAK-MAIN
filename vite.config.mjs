import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { webcrypto } from 'node:crypto'

if (typeof globalThis.crypto === 'undefined' || typeof globalThis.crypto.getRandomValues !== 'function') {
  globalThis.crypto = webcrypto
}

export default defineConfig({
  plugins: [react()],
})

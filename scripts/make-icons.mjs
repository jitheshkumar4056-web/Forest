/**
 * Generates the PWA icons (PNG) and favicon for LEX Kerala.
 * Run: node scripts/make-icons.mjs
 */
import sharp from 'sharp'
import { mkdirSync, writeFileSync } from 'node:fs'

const BG = '#0c0f0d'
const GOLD = '#c8a75f'

const glyph = (offset = 0, scale = 1) => {
  const t = (x, y) => `${(x * scale + offset).toFixed(1)} ${(y * scale + offset).toFixed(1)}`
  return `
  <g stroke="${GOLD}" stroke-width="${(24 * scale).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M ${t(256, 136)} V ${t(256, 392)}"/>
    <path d="M ${t(198, 392)} h ${(116 * scale).toFixed(1)}"/>
    <path d="M ${t(142, 172)} h ${(228 * scale).toFixed(1)}"/>
    <path d="M ${t(142, 172)} L ${t(106, 260)} M ${t(142, 172)} L ${t(178, 260)} M ${t(106, 260)} A ${(36 * scale).toFixed(1)} ${(36 * scale).toFixed(1)} 0 0 0 ${t(178, 260)}"/>
    <path d="M ${t(370, 172)} L ${t(334, 260)} M ${t(370, 172)} L ${t(406, 260)} M ${t(334, 260)} A ${(36 * scale).toFixed(1)} ${(36 * scale).toFixed(1)} 0 0 0 ${t(406, 260)}"/>
  </g>
  <circle cx="${256 * scale + offset}" cy="${118 * scale + offset}" r="${20 * scale}" fill="${GOLD}"/>`
}

const iconSvg = (maskable = false) => {
  const g = maskable ? glyph(76.8, 0.7) : glyph(0, 1)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${BG}"/>
  ${g}
</svg>`
}

// favicon: rounded square, no maskable padding
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="${BG}"/>
  ${glyph(46, 0.82)}
</svg>`

mkdirSync('public/icons', { recursive: true })
writeFileSync('public/favicon.svg', faviconSvg)

const jobs = [
  ['public/icons/icon-192.png', iconSvg(false), 192],
  ['public/icons/icon-512.png', iconSvg(false), 512],
  ['public/icons/icon-maskable-512.png', iconSvg(true), 512],
  ['public/apple-touch-icon.png', iconSvg(false), 180],
]

for (const [out, svg, size] of jobs) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(out)
  console.log('wrote', out, size)
}

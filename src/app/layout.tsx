// src/app/layout.tsx

/**
 * Do not import Sanity or front-end specific code into this
 * file, it will not be tree shaken effectively across routes
 */
import localFont from 'next/font/local'

const overusedGrotesk = localFont({
  src: [
    { path: './fonts/OverusedGrotesk-Light.woff2', weight: '300', style: 'normal' },
    { path: './fonts/OverusedGrotesk-LightItalic.woff2', weight: '300', style: 'italic' },
    { path: './fonts/OverusedGrotesk-Roman.woff2', weight: '400', style: 'normal' },
    { path: './fonts/OverusedGrotesk-Italic.woff2', weight: '400', style: 'italic' },
    { path: './fonts/OverusedGrotesk-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/OverusedGrotesk-MediumItalic.woff2', weight: '500', style: 'italic' },
    { path: './fonts/OverusedGrotesk-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/OverusedGrotesk-SemiBoldItalic.woff2', weight: '600', style: 'italic' },
    { path: './fonts/OverusedGrotesk-Bold.woff2', weight: '700', style: 'normal' },
    { path: './fonts/OverusedGrotesk-BoldItalic.woff2', weight: '700', style: 'italic' },
    { path: './fonts/OverusedGrotesk-ExtraBold.woff2', weight: '800', style: 'normal' },
    { path: './fonts/OverusedGrotesk-ExtraBoldItalic.woff2', weight: '800', style: 'italic' },
    { path: './fonts/OverusedGrotesk-Black.woff2', weight: '900', style: 'normal' },
    { path: './fonts/OverusedGrotesk-BlackItalic.woff2', weight: '900', style: 'italic' },
  ],
  variable: '--font-overused-grotesk',
})

export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <html lang="en" className={overusedGrotesk.variable}>
      <body className='bg-white'>{children}</body>
    </html>
  )
}
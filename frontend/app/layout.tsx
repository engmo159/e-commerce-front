import type { Metadata } from 'next'
import ECommerceLayout from './layout/ECommerceLayout'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'E Commerce App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <ECommerceLayout />

        {children}
      </body>
    </html>
  )
}

'use client'
import { Toaster } from '@/components/ui/toaster'
import '../globals.css'
import { useEffect } from 'react'

// export const metadata = {
//   title: 'ChatGPT AI Tools',
//   description: 'chatgpt ai tools'
// }

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    console.log(1111)
  }, [])
  return (
    <html lang='en'>
      <body>
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
          {children}
        </main>

        <Toaster />
      </body>
    </html>
  )
}

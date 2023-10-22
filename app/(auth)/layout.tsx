import { Toaster } from '@/components/ui/toaster'
import '../globals.css'

export const metadata = {
  title: 'ChatGPT AI Tools',
  description: 'chatgpt ai tools'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
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

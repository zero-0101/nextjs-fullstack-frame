import { Button } from '@/components/ui/button'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      <h1 className='text-center text-4xl m-10'>home page</h1>

      <div className='flex items-center justify-center'>
        <Button className='mr-4' variant='secondary'>
          <Link href='/login'>LOGIN</Link>
        </Button>
        <Button variant='secondary'>
          <Link href='/register'>REGISTER</Link>
        </Button>
      </div>
    </div>
  )
}

export default page

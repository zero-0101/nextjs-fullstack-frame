import Image from 'next/image'

export default function SideBar () {
  return (
    <aside className='w-40 bg-white'>
      <div className='flex justify-center'>
        <Image src='/assets/logo.png' width={80} height={80} alt='logo'></Image>
      </div>
      <hr />

      <nav>
        <ol>
          <li className='text-center py-4 border-b cursor-pointer hover:bg-slate-400 hover:text-white'>
            Dashboard
          </li>
          <li className='text-center py-4 border-b cursor-pointer hover:bg-slate-400 hover:text-white'>
            Users
          </li>
        </ol>
      </nav>
    </aside>
  )
}

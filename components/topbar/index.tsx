'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getStorage, clearStorage } from '@/lib/utils'

export default function Topbar () {
  const [data, setData] = useState({ nickname: '', image: '' })
  useEffect(() => {
    const _data = getStorage('LOGIN')
    setData(_data)
  }, [])

  return (
    <header className='h-20 flex items-center justify-end px-6 bg-white'>
      <Link
        href='/'
        className='text-sky-500 hover:underline'
        onClick={() => {
          clearStorage('LOGIN')
        }}
      >
        Log out
      </Link>

      <h1 className='px-5'>{data?.nickname ?? ''}</h1>

      {data?.image && (
        <Image
          src={data.image}
          alt='account logo'
          width={40}
          height={40}
          className='rounded-full'
        ></Image>
      )}
    </header>
  )
}

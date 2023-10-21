'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Fetch } from '@/lib/fetch'
import Image from 'next/image'
import { USER } from '@/lib/types'

const UserPage = () => {
  const [list, setList] = useState<Array<USER>>([])

  const getList = async () => {
    const list = await Fetch({
      url: '/api/user',
      data: { page: 1, perPage: 20 }
    })
    setList(list || [])
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <div>
      <h4>USER LIST</h4>

      <Table>
        <TableCaption>A list of your recent users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Nickname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Operations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item: USER) => (
            <TableRow key={item._id}>
              <TableCell className='font-medium'>
                <Image src={item?.image ?? ''} alt='' width={60} height={60} />
              </TableCell>
              <TableCell>{item.nickname}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <Button>EDIT</Button>
                <Button>DELETE</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default UserPage

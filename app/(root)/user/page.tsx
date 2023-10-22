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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Fetch } from '@/lib/fetch'
import Image from 'next/image'
import { USER } from '@/lib/types'
import { toast } from '@/components/ui/use-toast'

const UserPage = () => {
  const [dialogDetails, setDialogDetails] = useState({
    open: false,
    id: ''
  })
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 2,
    hasNext: true,
    hasPre: false
  })
  const [list, setList] = useState<Array<USER>>([])

  const handleDelete = async (id: string) => {
    const data = await Fetch({
      url: `/api/user/${id}`,
      type: 'DELETE'
    })
    toast({ description: 'Deleted successfull' })
    if (data) {
      setDialogDetails({ open: false, id: '' })
      getList()
    }
  }

  const getList = async (page?: number) => {
    const list = await Fetch({
      url: '/api/user',
      data: { page: page || 1, perPage: pagination.perPage }
    })
    list && list.length && setList(list)
    if (!list || !list.length) {
      setPagination({ ...pagination, hasNext: false })
    }
  }

  const handlePagination = (type: 'NEXT' | 'PREV') => {
    if (type === 'NEXT' && pagination.hasNext) {
      const page = pagination.page + 1
      setPagination({
        ...pagination,
        page: page,
        hasPre: page > 1 ? true : false
      })
      getList(page)
      return
    }
    const page = pagination.page - 1
    if (page > 0) {
      setPagination({
        ...pagination,
        page: page,
        hasPre: page > 1 ? true : false,
        hasNext: true
      })
      getList(page)
    } else {
      setPagination({ ...pagination, hasPre: false })
    }
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
                {item?.image && (
                  <Image src={item.image} alt='' width={60} height={60} />
                )}
              </TableCell>
              <TableCell>{item.nickname}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <Button>EDIT</Button>
                <Button
                  onClick={() => {
                    setDialogDetails({
                      ...dialogDetails,
                      open: true,
                      id: item._id!
                    })
                  }}
                  variant='secondary'
                >
                  DELETE
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className='flex items-center justify-end'>
        <Button size='sm' variant='link'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 19.5L8.25 12l7.5-7.5'
            />
          </svg>
        </Button>
        <Button
          size='sm'
          disabled={pagination.hasPre ? false : true}
          variant='link'
          onClick={() => handlePagination('PREV')}
        >
          PRE
        </Button>
        <Button
          size='sm'
          disabled={pagination.hasNext ? false : true}
          variant='link'
          onClick={() => handlePagination('NEXT')}
        >
          NEXT
        </Button>
        <Button size='sm' variant='link'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 4.5l7.5 7.5-7.5 7.5'
            />
          </svg>
        </Button>
      </div>

      <Dialog
        open={dialogDetails.open}
        onOpenChange={(open: boolean) => {
          !open && setDialogDetails({ open: open, id: '' })
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              Are you sure delete this user?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type='button'
              variant='secondary'
              onClick={() => {
                handleDelete(dialogDetails.id!)
              }}
            >
              CONFIRM
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UserPage

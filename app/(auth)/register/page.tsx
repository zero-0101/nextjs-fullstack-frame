'use client'

import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { UserValidation } from '@/lib/validations/user'
import { uploadImage } from '@/lib/cloudinary'

const RegisterPage = () => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
      image: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const { nickname, email, password, image = '' } = values
    try {
      // const data = await createUser({ nickname, email, password, image })
      router.push('/login')
    } catch (error: any) {
      toast({
        description: error?.message ?? 'Register error.',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className='container mx-auto w-2/4 rounded-sm p-6 bg-slate-50 text-slate-950'>
      <h4 className='text-slate-600'>REGISTER</h4>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mt-10 flex flex-col justify-start gap-10'
        >
          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile</FormLabel>
                <FormControl>
                  <div className='w-64'>
                    <input
                      type='file'
                      onChange={async (e: any) => {
                        const file = e.target.files[0]
                        const data = await uploadImage(file)
                        if (data.url) {
                          form.setValue('image', data.url)
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='nickname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nickname</FormLabel>
                <FormControl>
                  <Input placeholder='Please enter nickname' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Please enter email'
                    {...field}
                    type='email'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Please enter your password'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Please enter your password again'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='mt-10 w-full'>
            SUBMIT
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default RegisterPage

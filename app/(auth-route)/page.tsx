"use client"

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';


const formSchema = z.object({
  email:z.string({
    required_error: "Email é obrigatorio",
    invalid_type_error: "Email tem que ser do tipo literal",
  }),
  senha:z.string().refine((val) => val.length >= 3, {
    message: "Senha tem que ter no minimo 3 caracteres",
  }),
})

type FormData =z.infer<typeof formSchema>;

export default function Home() {
  const { toast } = useToast()
  const router = useRouter();
  
  const {
    handleSubmit,
    register,
    formState:{errors}
  } = useForm<FormData>({
    mode:"onBlur",
    resolver:zodResolver(formSchema)
  })

  const onSubmit = async (data:FormData) => {

    const result =  await signIn('credentials',{
      email:data.email,
      password:data.senha,
      redirect:false
    })
   
    if(result?.error){
      console.log(result.error)
      toast({
        variant: "destructive",
        title: "Email ou Senha Incorreta",
       
      })
     return
    }

    router.replace('/pessoas')

    

  };

  return (
    <main className="flex  flex-col items-center justify-between p-24">
     <form onSubmit={handleSubmit(onSubmit)} className='md:w-1/4 ' >
      <h2 className='text-center mb-3 font-bold text-2xl'>Login</h2>
        <Input
          type="email" 
          placeholder='Email'  
          {...register('email')}
          className='mb-4  '
        />
        {errors.email?.message && <p>{errors.email?.message}</p> }
        
        <Input
          type="password" 
          placeholder='Senha'  
          {...register('senha')}
          className='mb-5'
        />
        {errors.senha?.message && <p>{errors.senha?.message}</p> }
        <Button >Entrar</Button>
     </form>
    </main>
  )
}


import { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Header from '@/components/header/Header'


interface PrivaceLayoutProps{
    children: ReactNode
}

export default async function PrivacyLayout({children}: PrivaceLayoutProps) {

    const session = await getServerSession(nextAuthOptions)
    if(!session) {
        redirect('/')
    }
  return (
    <>
    <Header usuarioLogado={session}/>
    {children}
    </>
  )
}


import { ReactNode } from 'react'
import { getServerSession } from 'next-auth'

import { redirect } from 'next/navigation'
import { authOptions } from '@/utils/authOptions'


interface PrivaceLayoutProps{
    children: ReactNode
}

export default async function PrivacyLayout({children}: PrivaceLayoutProps) {

    const session = await getServerSession(authOptions)
    if(session) {
        redirect('/pessoas')
    }
  return (
    <>{children}</>
  )
}

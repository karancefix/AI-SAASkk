import LandingNavbar from '@/components/LandingNavbar'
import { cn } from '@/lib/utils'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] })

const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {

    return (
        <>
            <Link href='/' className='flex items-center pl-3 bg-[#192236] text-white' >
                <div className='relative w-12 h-10 mr-4' >
                    <Image fill alt='Logo' src={"/logo.png"} />
                </div>
                <h1 className={cn('text-2xl font-bold', montserrat.className)}>Genius</h1>
            </Link>
            <div className='flex justify-center items-center h-full bg-[#192236]'> {children}</div>
        </>


    )
}

export default AuthLayout
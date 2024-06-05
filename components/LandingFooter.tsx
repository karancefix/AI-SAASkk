// "use client"
import { Montserrat } from 'next/font/google'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const font = Montserrat({
    weight: "600",
    subsets: ["latin"],
})

const LandingFooter = () => {
    return (
        <footer className="bg-[#151d30] rounded-lg shadow dark:bg-gray-900 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className='flex'>
                        <div className="relative h-10 w-12 mr-4">
                            <Image
                                fill
                                alt='Genius Logo'
                                src={"/logo.png"}
                            />
                        </div>
                        <h1 className={cn("text-2xl font-bold text-white mt-2", font.className)}>
                            Genius
                        </h1>
                    </div>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-900 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
            </div>
        </footer>


    )
}

export default LandingFooter

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { getApiLimitCount } from '@/lib/api-limit/api-limit'
import React from 'react'
import { auth } from '@clerk/nextjs/server';
import { checkSubscription } from '@/lib/stripe/subscription';


const dashboardLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {

    const { userId }: any = auth();

    const apiLimitCount = await getApiLimitCount(userId, "conversation");
    const isPro = await checkSubscription();
    // Ensure apiLimitCount is always assigned a number value
    const sidebarApiLimitCount: number = apiLimitCount || 0;

    return (
        <div className='h-full relative'>
            <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0  bg-gray-900'>
                <Sidebar apiLimitCount={sidebarApiLimitCount} isPro={isPro} />
            </div>
            <main className='md:pl-72'>
                <Navbar />
                {children}
            </main>
            {/* <hr className="my-6 border-gray-900 sm:mx-auto dark:border-gray-700 lg:my-8" /> */}
            {/* <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400 mt-1">© 2023 <a href="https://flowbite.com/" className="hover:underline">GENIUS™</a>. All Rights Reserved.</span> */}

        </div>
    )
}

export default dashboardLayout
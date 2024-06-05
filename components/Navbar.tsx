import React from 'react'
import { UserButton } from '@clerk/nextjs';
import Mobilesidebar from './mobile-sidebar';
import { getApiLimitCount } from '@/lib/api-limit/api-limit';
import { auth } from '@clerk/nextjs/server';
import { checkSubscription } from '@/lib/stripe/subscription';

const Navbar = async () => {
    const { userId }: { userId: string | null } = auth();
    const apiLimitCount = await getApiLimitCount(userId || "", "conversation")
    const isPro = await checkSubscription();
    return (
        <div className='flex  items-center p-4'>
            <Mobilesidebar apiLimitCount={apiLimitCount || 0} isPro={isPro} />
            <div className='flex w-full justify-end'>
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>
    )
}

export default Navbar
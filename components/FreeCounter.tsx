"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { MAX_FREE_COUNT } from '@/constants'
import { Progress } from 'antd'
import { Button } from './ui/button'
import { Zap } from 'lucide-react'
import { useProModal } from '@/hooks/use-pro-modal'

type FreeCounterProps = {
    apiLimitCount: number,
    isPro: boolean
}

const FreeCounter = ({ apiLimitCount = 0, isPro = false }: FreeCounterProps) => {
    const proModal = useProModal()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    if (isPro) return null
    return (
        <div className='px-3'>
            <Card className='bg-white/10 border-0'>
                <CardContent className='py-6'>
                    <div className='text-center text-sm text-white  space-y-2'>
                        <p>
                            {apiLimitCount} / {MAX_FREE_COUNT} Free Generations
                        </p>
                        <Progress
                            className='h-3'
                            percent={(apiLimitCount / MAX_FREE_COUNT) * 100}
                            showInfo={false} />
                    </div>
                    <Button className='w-full' variant={"premium"} onClick={proModal.onOpen}>
                        Upgrade
                        <Zap className=' w-4 h-4 ml-2 fill-white' />
                    </Button>
                </CardContent>
            </Card >
        </div>
    )
}

export default FreeCounter
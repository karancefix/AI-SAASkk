"use client";
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';


const testimonials = [
    {
        name: "John Doe",
        avatar: "A",
        title: "Software Engineer",
        description: "This is the AI best tool available that I have used online! "
    },
    {
        name: "Amanda white",
        avatar: "A",
        title: "Full stack Engineer",
        description: "Had a great experience with this tool! "
    },
    {
        name: "Amelia johnson",
        avatar: "A",
        title: "Graphic Designer",
        description: "Genius is the only word that comes to my mind when I think of this tool! "
    },
    {
        name: "Rocky Balboa",
        avatar: "A",
        title: "Music Producer",
        description: "This tool is a game changer!"
    },
]
const LandingContent = () => {
    return (
        <div className='px-10 pb-20'>
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    testimonials.map((item) => (
                        <Card key={item.description} className='bg-[#192339] border-none text-white hover:scale-105 transition-all hover:opacity-80 ease-out'>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-x-2'>
                                    <div>
                                        <p className='text-lg'>
                                            {item.name}
                                        </p>
                                        <p className='text-zinc-400 text-sm'>
                                            {item.title}
                                        </p>
                                    </div>
                                </CardTitle>
                                <CardContent className='pt-4 px-0'>
                                    {item.description}
                                </CardContent>
                            </CardHeader>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}

export default LandingContent
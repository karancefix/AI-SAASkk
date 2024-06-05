"use client";
import * as z from "zod"
// import { useRouter } from "next/navigation";
import { DeleteIcon, Music, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Pusher from "pusher-js";

import Heading from '@/components/Heading';
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/Empty";

import { formSchema } from "./constants";
import { Loader } from "@/components/Loader";
import { Useravatar } from "@/components/Useravatar";
import { BotAvatar } from "@/components/BotAvatar";
import Delete from "@/components/Delete";
import ProgressComponent from "@/components/Progress";
import { useProModal } from "@/hooks/use-pro-modal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



const MusicPage = () => {
    const proModal = useProModal()
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [activities, setActivities] = useState<any>(null)
    const [imageLoading, setImageLoading] = useState<number>(5);
    const [seconds, setSeconds] = useState<number>(0.00);
    const [messages, setMessages] = useState<string>("Generating Music");


    useEffect(() => {
        axios.get("/api/activity/music")
            .then((response) => {
                setActivities(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])

    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || "", {
            cluster: "ap2",
        });

        const channel = pusher.subscribe("load");

        channel.bind("load-event", function (data: any) {
            if (data.loading !== undefined) {
                setImageLoading(data.loading);
                setMessages(data.message)
            }
        });



        return () => {
            pusher.unsubscribe("load");
        };

    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            const secondsCounter = setInterval(() => {
                setSeconds((prev) => prev + 0.01)
            }, 10)

            const userMessage: any = {
                role: "user",
                content: values.prompt,
            }
            const response = await axios.post("/api/music", {
                message: userMessage,
            })

            setMessages("Generating Music")
            clearInterval(secondsCounter)
            setSeconds(0.00)
            // setMessages(response.data)

            form.reset();

        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
            } else {
                toast.error("Something went wrong!")
            }
        }
        finally {
            // router.refresh();
            axios.get("/api/activity/music")
                .then((response) => {
                    setActivities(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
            // console.log(messages)
            // console.log("finally")
            router.refresh();
            setImageLoading(5);
        }
    }

    const toggleISDeleting = () => {
        setIsDeleting((pev) => !pev);
    }

    const handleFetch = () => {
        axios.get("/api/activity/music")
            .then((response) => {
                setActivities(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        // console.log("handle fetch")
    }



    return (
        <div >

            <Heading
                title='Music Generation'
                description='Turn your prompt into music'
                icon={Music}
                iconColor='text-emerald-500'
                bgColor='bg-emerald-500/10'
            />
            <div className='px-4 lg:px-8'>
                <div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="
                            rounded-lg
                             border 
                             w-full 
                             p-4 
                             px-3 
                             md:px-6 
                             focus-within:shadow-sm
                             grid 
                             grid-cols-12
                             gap-2 "
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input className="border-0  outline-none focus-visible:ring-0  focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="funky synth solo ~"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )} />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {
                        isLoading &&
                        (
                            <div className="flex justify-center flex-col">
                                <div className="flex justify-between">
                                    <div className="text-black/50 mb-1">
                                        {messages}
                                        <span className="dot-3 animate-blink font-bold">.</span>
                                        <span className="dot-2 animate-blink font-bold">.</span>
                                        <span className="dot-1 animate-blink font-bold">.</span>
                                    </div>
                                    <div className="flex justify-start items-center w-12 font-mono me-3">
                                        <div className="text-black/50 pe-2">{seconds.toFixed(2)}</div>
                                        <div className="text-black/50">s</div>
                                    </div>
                                </div>

                                <ProgressComponent percentProp={imageLoading} />


                            </div>

                        )
                    }
                    {/* {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )} */}
                    {isDeleting && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}

                    {activities?.length === 0 && !isLoading && (
                        <Empty label="Music Generation not started" />
                    )}

                    <div className="flex flex-col-reverse gap-y-4">



                        {activities &&
                            activities.map((activity: any) => (
                                <div key={activity.date}>
                                    <div className="flex justify-end me-4 text-sm  text-black/50 mb-2">
                                        {new Date(activity.date).toLocaleString()}
                                    </div>
                                    <div
                                        key={String(activity.aiContent)}
                                        className="p-8 w-full flex items-start gap-x-8 rounded-lg bg-muted mb-3"

                                    >
                                        <BotAvatar />
                                        {/* <p className="text-sm">
                                            {String(activity.aiContent)}
                                        </p> */}
                                        <audio controls={true} className="w-full">
                                            <source src={activity.aiContent} type="audio/x-wav" />
                                        </audio>

                                    </div>

                                    <div
                                        key={String(activity.userContent)}
                                        className="p-8 w-full flex justify-start items-center gap-x-8 rounded-lg bg-white border border-black/10 relative" // Added 'relative' class for positioning
                                    >
                                        <Useravatar />
                                        <p className="text-sm flex-grow-1"> {/* Added 'flex-grow-1' class to make the paragraph take remaining space */}
                                            {String(activity.userContent)}
                                        </p>

                                        <Delete id={activity._id} toggleFetch={handleFetch} toggleDelete={toggleISDeleting} />

                                    </div>




                                </div>


                            ))
                        }

                    </div>


                </div>
            </div>
        </div>
    )
}

export default MusicPage;
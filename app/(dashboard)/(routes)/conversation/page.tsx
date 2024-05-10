"use client";
import * as z from "zod"
import { useRouter } from "next/navigation";
import { DeleteIcon, MessageSquare, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

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



const Conversation = () => {
    const router = useRouter();
    const [activities, setActivities] = useState<any>(null)
    useEffect(() => {
        axios.get("/api/activity/conversation")
            .then((response) => {
                setActivities(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])



    const [messages, setMessages] = useState<ChatCompletionMessageParam | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionMessageParam = {
                role: "user",
                content: values.prompt,
            }
            const response = await axios.post("/api/conversation", {
                message: userMessage,
            })

            setMessages(response.data)

            form.reset();

        } catch (error: any) {
            //TODO: open pro modal
            console.log(error)
        }
        finally {
            router.refresh();
        }
    }

    return (
        <div >
            <Heading
                title='Conversation'
                description='Our AI based conversation model.'
                icon={MessageSquare}
                iconColor='text-violet-500'
                bgColor='bg-violet-500/10'
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
                                                placeholder="How can I help you today?"
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
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {activities?.length === 0 && !isLoading && (
                        <Empty label="Conversation not started" />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">

                        {activities &&
                            activities.map((activity: any) => (
                                <div>
                                    <div className="flex justify-end me-4 text-sm  text-black/50 mb-2">
                                        {new Date(activity.date).toLocaleString()}
                                    </div>
                                    <div
                                        key={String(activity.aiContent)}
                                        className="p-8 w-full flex items-start gap-x-8 rounded-lg bg-muted mb-3"

                                    >
                                        <BotAvatar />
                                        <p className="text-sm">
                                            {String(activity.aiContent)}
                                        </p>

                                    </div>

                                    <div
                                        key={String(activity.userContent)}
                                        className="p-8 w-full flex justify-start items-center gap-x-8 rounded-lg bg-white border border-black/10 relative" // Added 'relative' class for positioning
                                    >
                                        <Useravatar />
                                        <p className="text-sm flex-grow-1"> {/* Added 'flex-grow-1' class to make the paragraph take remaining space */}
                                            {String(activity.userContent)}
                                        </p>

                                        <Delete id={activity._id} />

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

export default Conversation;
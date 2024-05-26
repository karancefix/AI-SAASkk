"use client";
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { usePathname } from 'next/navigation'

type DeleteProps = {
    id: string,
    toggleFetch: any
}

const Delete = ({ id, toggleFetch }: DeleteProps) => {
    const pathname = usePathname();

    const handleClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        try {
            const response = await axios.delete(`/api/delete${pathname}/${id}`)
            console.log('Conversation deleted:', response.data);
        }
        catch (error) {
            console.log(error)
        }

        finally {
            toggleFetch();
            console.log("finally")
        }

    }
    return (
        <div className="absolute right-3 top-10  hover:scale-90 hover:opacity-70 transition" onClick={handleClick}>
            <Trash />
        </div>
    )
}

export default Delete;
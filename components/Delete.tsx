"use client";
import axios from 'axios'
import { Trash } from 'lucide-react'
// import { useRouter } from 'next/navigation'
import React from 'react'
import { usePathname } from 'next/navigation'
// import { Loader } from './Loader';

type DeleteProps = {
    id: string,
    toggleFetch: any,
    toggleDelete: any,
}

const Delete = ({ id, toggleFetch, toggleDelete }: DeleteProps) => {
    const pathname = usePathname();

    const handleClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        try {
            toggleDelete()
            const response = await axios.delete(`/api/delete${pathname}/${id}`)
            // console.log('Deleted:', response.data);
        }
        catch (error) {
            console.log(error)
        }

        finally {
            toggleDelete();
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
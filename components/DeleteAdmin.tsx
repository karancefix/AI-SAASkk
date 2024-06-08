"use client";
import axios from 'axios'
import { Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useAuth } from "@clerk/nextjs";
import toast from 'react-hot-toast';

const DeleteAdmin = ({ id, handleDelete }: any) => {
    const { userId } = useAuth()
    const [loading, setLoading] = useState(false);
    const handleFetch = () => {
        try {
            setLoading(true)
            axios.delete(`/api/deleteUser/${userId}`)
            setLoading(false)
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            handleDelete();
            toast.success("User subscription deleted")
        }
    }

    return (
        <Button onClick={handleFetch} disabled={loading}>
            {/* <Trash /> */}
            Delete Subscription
        </Button>
    )
}

export default DeleteAdmin
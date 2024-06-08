"use client"
import React, { useEffect, useState } from 'react'
// import { useAuth } from "@clerk/nextjs";
import axios from 'axios';
import { useAuth } from "@clerk/nextjs";
import TableComponent from '@/components/TableComponent';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import LandingNavbar from '@/components/LandingNavbar';

const AdminDashboard = () => {
    const [data, setData] = useState<any>(null)
    const { userId } = useAuth();

    useEffect(() => {
        axios.get("/api/getUsers").then((response) => {
            setData(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    const handleFetch = () => {
        axios.get("/api/getUsers").then((response) => {
            setData(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    if (userId != "user_2fmBA7gmVHaHtMZusK0BEdRE00r") return null
    return (

        <div>
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Admin Dashboard
            </h2>

            <div>
                <TableComponent data={data} handleDelete={handleFetch} />
            </div>

        </div>


    )
}

export default AdminDashboard
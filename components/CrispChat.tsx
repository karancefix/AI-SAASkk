"use client"

import React, { useEffect } from 'react'
import { Crisp } from "crisp-sdk-web"
const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("e5047bfd-9db8-4e50-9ffd-d8bd967d1a55")
    }, [])

    return null
}

export default CrispChat
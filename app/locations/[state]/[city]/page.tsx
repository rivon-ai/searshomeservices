'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const params = useParams();

    return (
        <div>
            <p>{params.state}</p>
            <p>{params.city}</p>
        </div>
    )
}

export default page
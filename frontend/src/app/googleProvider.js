"use client"

import React from 'react'
import { SessionProvider } from 'next-auth/react'

function GoogleProvider({children}) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default GoogleProvider

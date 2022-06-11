import Link from 'next/link'
import React from 'react'
import Image from "next/image";

const Logo = () => {
    return <div className="text-lg cursor-pointer text-bold flex items-center">
        <Link href="/" passHref>
            <div className="flex flex-row items-center justify-center">
                <span className="text-purple-400 ml-2 text-4xl flex flex-row items-center font-bold leading-loose font-brand">
                    wireshot
                </span>
            </div>
        </Link>
    </div>
}

export default Logo
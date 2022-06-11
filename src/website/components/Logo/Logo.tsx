import Link from 'next/link'
import React from 'react'
import Image from "next/image";

const Logo = () => {
    return <div className="text-lg cursor-pointer text-bold flex items-center">
        <Link href="/src/website/pages" passHref>
            <div className="flex flex-row items-center justify-center">
                <span className="text-wireshot-primary ml-2 text-4xl flex flex-row items-center font-bold leading-loose font-brand">
                    wireshot
                </span>
            </div>
        </Link>
    </div>
}

export default Logo
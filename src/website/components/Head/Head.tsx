import React from "react";
import {HeadProp} from "./Head.types";
import {default as NextHead } from "next/head";
import {useRouter} from "next/router";


const Head = ({children, title, image, updatedAt, description}: HeadProp) => {
    const router = useRouter()
    const currentUrl = `${process.env.NEXT_PUBLIC_DOMAIN}${router.asPath}`
    const currentImage = image ?? '/images/og-image.png'
    return (<NextHead>
        <meta charSet="UTF-8"/>
        <meta property="og:locale" content="en"/>
        <meta name="language" content="en"/>
        <meta name="application-name" content="Thiago Mello"/>
        <meta property="og:site_name" content="Thiago Mello"/>
        <link rel="canonical" href={currentUrl} itemProp="url"/>
        <meta name="url" content={currentUrl}/>
        <meta property="og:type" content="website"/>
        <meta property="og:article:author" content="Thiago Mello"/>
        <meta property="article:author" content="Thiago Mello"/>
        <meta name="author" content="Thiago Mello"/>
        <link rel="icon" href="/src/website/public/favicon.ico"/>

        <meta name="description" content={description}/>
        <title>{title}</title>
        <meta property="og:title" content={title}/>
        <meta name="twitter:title" content={title}/>
        <meta itemProp="name" content={title}/>
        <meta itemProp="description"
              content={description}/>
        <meta property="og:description"
              content={description}/>
        <meta name="description"
              content={description}/>
        <meta property="twitter:domain" content="thizaom.com"/>
        <meta name="twitter:description"
              content={description}/>
        <meta name="twitter:url" content={currentUrl} />
        <meta property="og:url" content={currentUrl} />

        {currentImage && (
            <>
                <meta itemProp="image" content={currentImage}/>
                <meta property="og:image" content={currentImage}/>
                <meta name="twitter:image" content={currentImage}/>
                <meta name="twitter:image:src" content={currentImage}/>
                <meta name="twitter:card" content="summary_large_image"/>
            </>
        )}

        {updatedAt && <meta property="og:updated_time" content={updatedAt}/>}
        {children}
    </NextHead>)
}


export default Head
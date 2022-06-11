import React, {ReactNode, useState} from 'react'
import {TopBarProps} from './TopBarMenu.types'
import Link from "next/link";
import {FiGithub, FiLinkedin, FiMail, FiMenu, FiRss, FiTwitter, FiX} from "react-icons/fi";
import {useRouter} from "next/router";
import { CSSTransition } from 'react-transition-group';


const TopBarMenu = ({menu: menuProp}: TopBarProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)
    const router = useRouter()
    const githubLink = process.env.NEXT_PUBLIC_GITHUB_PROFILE_LINK ?? '#'
    const linkedinLink = process.env.NEXT_PUBLIC_LINKEDIN_PROFILE_LINK ?? '#'
    const twitterlink = process.env.NEXT_PUBLIC_TWITTER_PROFILE_LINK ?? '#'
    const emailLink = process.env.NEXT_PUBLIC_EMAIL_LINK ?? '#'
    const rssLink = process.env.NEXT_PUBLIC_RSS_LINK ?? '#'
    const contacts: ReactNode[] = [
        <Link key="github" href={githubLink} passHref>
            <a target="_blank">
                <FiGithub className="text-gray-500 cursor-pointer hover:scale-125 hover:text-green-500 duration-300"/>
            </a>
        </Link>,
        <Link key="linkedin" href={linkedinLink} passHref>
            <a target="_blank">
                <FiLinkedin className="text-gray-500 cursor-pointer hover:scale-125 hover:text-green-500 duration-300"/>
            </a>
        </Link>,
        <Link key="twitter" href={twitterlink} passHref>
            <a target="_blank">
                <FiTwitter className="text-gray-500 cursor-pointer hover:scale-125 hover:text-green-500 duration-300"/>
            </a>
        </Link>,
        <a key="email" href={emailLink} target="_blank" rel="noreferrer">
            <span>
                <FiMail className="text-gray-500 cursor-pointer hover:scale-125 hover:text-green-500 duration-300"/>
            </span>
        </a>,
        <Link key="rss" href={rssLink} passHref>
            <a target="_blank">
                <FiRss className="text-gray-500 cursor-pointer hover:scale-125 hover:text-green-500 duration-300"/>
            </a>
        </Link>
    ]
    let menu: ReactNode[] = [
        <Link key="1" href='/src/website/pages' passHref>
            <div className="cursor-pointer hover:text-green-500 hover:scale-125  duration-150">Home</div>
        </Link>,
        <Link key="2" href='/src/website/pages' passHref>
            <div className="cursor-pointer hover:text-green-500 hover:scale-125  duration-150">Features</div>
        </Link>,
        <Link key="3" href='/src/website/pages' passHref>
            <div className="cursor-pointer hover:text-green-500 hover:scale-125  duration-150">About</div>
        </Link>
    ]
    if (menuProp) {
        menu = menuProp.override ? menuProp.items : [...menu, ...menuProp.items]
    }

    return <>
        <div className="hidden lg:block">
            <nav className="flex flex-row gap-x-16 items-center">
                <div className='flex flex-row gap-x-16 items-center'>
                    {menu?.map(item => item)}
                </div>
                {router.pathname !== '/' && <div className="flex flex-row gap-x-4 items-center">
                    {contacts?.map(item => item)}
                </div>
                }
            </nav>
        </div>
        <div className="block lg:hidden">
            {!isOpen && <button onClick={handleOpen}><FiMenu className="text-gray-900 text-2xl"/></button>}
            <CSSTransition in={isOpen} timeout={300} classNames="menu-backdrop"
                           unmountOnExit>
                <div className="h-screen w-screen bg-black/50 absolute inset-0 flex flex-col z-20"></div>
            </CSSTransition>

            <CSSTransition in={isOpen} timeout={300} classNames="menu-container"
                           unmountOnExit>
                <menu
                    className="h-screen w-screen absolute inset-0 flex flex-col items-end z-30">
                    <div className="bg-white h-screen w-2/3">
                        <div className="p-5 flex flex-row items-center justify-center border-gray-200 border-b-2">
                            <button onClick={handleClose}
                                    className="flex flex-row items-center justify-center relative">
                                <FiX className="text-gray-500 text-4xl absolute -left-12"/>Close
                            </button>
                        </div>

                        <div
                            className="flex flex-row gap-x-6 gap-y-4 md:gap-y-0 items-center justify-center text-2xl flex-wrap px-5 md:px-0 py-5 border-gray-200 border-b-2">
                            {contacts?.map(item => item)}
                        </div>
                        <div className='flex flex-row gap-x-16 items-center justify-center'>
                            <ul>
                                {menu?.map((item, index) => <li key={index}
                                                                className="w-full p-5 text-2xl">{item}</li>)}
                            </ul>
                        </div>
                    </div>
                </menu>
            </CSSTransition>
        </div>
    </>
}

export default TopBarMenu
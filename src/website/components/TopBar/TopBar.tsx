import React, {ReactNode} from 'react'
import { TopBarProps } from './TopBar.types'
import Logo from "@components/Logo";
import TopBarMenu from "@components/TopBarMenu";


const TopBar = ({ navigation: navigationProp, menu: menuProp }: TopBarProps) => {

    let navigation: ReactNode[] = [<Logo key="0"/>]
    if (navigationProp){
        navigation = navigationProp.override ? navigationProp.items : [...navigation, ...navigationProp.items]
    }
    return <header className='bg-white py-4 fixed w-full z-10'>
        <div className="px-5 md:p-0 md:container md:mx-auto">
            <div className='flex justify-between gap-x-2.5'>
                <nav>
                    {navigation.map(item => item)}
                </nav>
                <TopBarMenu menu={menuProp}/>
            </div>
        </div>
    </header>
}

export default TopBar
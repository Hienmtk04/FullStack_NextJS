import Image from 'next/image'
import React from 'react'
import Logo from '../../../../public/images/AdminLTELogo.png';
import Avatar from '../../../../public/images/user2-160x160.jpg';

const HeaderNav = () => {
    return (
        <div className='head-navbar flex flex-col text-wrap'>
            <div className='content'>
                <div className='logo border-b p-3 justify-center flex items-center gap-5'>
                    <Image src={Logo} width={40} alt='Logo' />
                    <span className='text-xl'>Admin</span>
                </div>
                <div className='user-profile border-b py-2 justify-center flex items-center gap-5'>
                    <Image src={Avatar} width={40} alt='Avatar' className='rounded-3xl' />
                    <span className='text-sm'>Tên tôi là</span>
                </div>
            </div>
        </div>
    )
}

export default HeaderNav

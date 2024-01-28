import React from 'react'
import { TEACHER_DASHBOARD_SIDEBAR_BOTTOM_LINKS, TEACHER_DASHBOARD_SIDEBAR_LINKS } from '../lib/Navigation';
import { SlSettings,SlBookOpen } from "react-icons/sl";
import {HiOutlineLogout } from "react-icons/hi";
import Logout from '../Logout';
import { useLocation, Link } from 'react-router-dom';
import classNames from 'classnames';
const linkClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

function Sidebar() {
  return (
    <div className=' bg-neutral-900 w-60 p-3 flex flex-col  h-screen'>
        <div className='flex items-center gap-2 px-1 py-3'>
            <SlBookOpen />
            <span className='text-neutral-100 text-xl'>EduSpace</span>
        </div>
        <div className='flex-1  py-8 flex flex-col gap-0.5 text-neutral-100'>{
            TEACHER_DASHBOARD_SIDEBAR_LINKS.map((item) => (
                <SidebarLink key={item.key} item={item} />
            ))
        }</div>
        <div>
            {TEACHER_DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item)=>(
                <SidebarLink key={item.key} item={item} />
            ))}
            <div className={`${linkClasses} text-red-700`}>
                <HiOutlineLogout />
                <Logout />
            </div>
        </div>
    </div>
  )
}

function SidebarLink({item}){
    const {pathName} = useLocation()
    return (
        <Link to={item.path} className={ classNames((pathName===item.path)? ' bg-neutral-700 text-white':"text-neutral-400", linkClasses)}>
            <span className='text-xl'>{item.icon}</span>
            {item.label}
        </Link>
    )
}
export default Sidebar
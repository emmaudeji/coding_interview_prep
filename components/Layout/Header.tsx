"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navlinks = [
    {label: 'Country Game', link: '/countrygame'},
    {label: 'Task Manager', link: '/todo_app'},
    {label: 'Fill Boxes', link: '/fill_boxes'},
]

const Header = () => {
    const pathname = usePathname()
  return (
    <div className='max-w-7xl  mx-auto  px-6 py-10 flex gap-x-10 gap-y-4 flex-wrap'>
        <div className="w-full text-center space-y-6 pb-10">
            <h4 className='text-2xl font-semibold'>Gogrene</h4>
            <h4 className='text-4xl font-bold'>Coding Interview Prep</h4>
        </div>

        <nav className="flex gap-x-10 gap-y-4 flex-wrap border rounded-md w-full p-6 ">
            {
                navlinks.map(({label,link},i)=>(
                    <Link key={i} href={link} className={`hover:text-green-600 duration-300 ${link===pathname ? 'text-green-600':''}`}>{label}</Link>
                ))
            }
        </nav>
    </div>
  )
}

export default Header
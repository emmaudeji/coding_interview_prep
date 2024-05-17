import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='py-10 w-full grid gap- justify-center '>
        {/* <Link href={'https://github.com/emmaudeji'} className="text-center w-full">See code on Github</Link> */}
        <div className="">
          <Link href={'https://github.com/emmaudeji/coding_interview_prep'} className="text-center w-full hover:text-green-600 text-green-800   duration-300">emmaudeji@Github</Link>
        </div>
    </div>
  )
}

export default Footer
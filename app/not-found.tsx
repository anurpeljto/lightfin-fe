import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-[60%] gap-2'>
        <Image src="/404.svg" height={100} width={100} alt='404 not found' className='w-full h-full object-contain'/>
        <h2 className='text-4xl text-purple-error font-bold'>404 Page not found</h2>
        <Link className='text-altpurple' href="/">Return to home</Link>
    </div>
  )
}

export default NotFound
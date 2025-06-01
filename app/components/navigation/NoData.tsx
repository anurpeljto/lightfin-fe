import React from 'react'
import ArrowBack from './ArrowBack'
import Image from 'next/image'

const NoData = () => {
  return (
    <div className="w-full h-full grid grid-rows-[0.15fr_0.85fr] md:p-10 p-4">
        <nav className="text-4xl font-bold text-primary p-0 m-0 flex items-center gap-4 pb-10">
          <ArrowBack/>
        </nav>
        <div className='flex flex-col items-center justify-center gap-2'>
          <Image src="/no-data.svg" height={100} width={100} alt='No data found' className='w-full h-full max-h-[350px]'/>
          <h2 className='sm:text-4xl text-2xl font-bold text-cancelled'>No data found for this user</h2>
        </div>
      </div>
  )
}

export default NoData
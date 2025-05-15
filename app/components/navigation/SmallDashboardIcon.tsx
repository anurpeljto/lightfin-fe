import React from 'react'

const SmallDashboardIcon = () => {
  return (
    <div className='h-[30px] w-[30px] grid grid-cols-2 gap-0.5 cursor-pointer'>
        <div className='h-full flex flex-col gap-0.5'>
            <div className='h-full w-full border-2'/>
            <div className='h-[15px] border-2'/>
        </div>
        <div className='h-full flex flex-col gap-0.5'>
            <div className='h-[15px] border-2'/>
            <div className='h-full w-full border-2'/>
        </div>
    </div>
  )
}

export default SmallDashboardIcon
import React from 'react'

const page = () => {
  return (
    <div className="w-full h-full grid grid-rows-[0.15fr_0.85fr] p-10">
        <h1 className="text-4xl font-bold text-primary p-0 m-0">Subsidies</h1>

        <div className="item-wrapper w-full h-full grid grid-cols-4 max-h-[120px] items-center">
            <div className='flex flex-col gap-2 border-r-2 border-gray-500'>
                <h3 className='font-semibold text-lg'>Total subsidies</h3>
                <p>1034</p>
            </div>
            <div className='flex flex-col gap-2 border-r-2 border-gray-500 pl-4'>
                <h3 className='font-semibold text-lg'>Pending subsidies</h3>
                <p>20</p>
            </div>
            <div className='flex flex-col gap-2 border-r-2 border-gray-500 pl-4'>
                <h3 className='font-semibold text-lg'>Average subsidy amount</h3>
                <p>302.30</p>
            </div>
            <div className='flex flex-col gap-2 pl-4'>
                <h3 className='font-semibold text-lg'>New subsidy requests this week</h3>
                <p>3</p>
            </div>
        </div>
    </div>
  )
}

export default page
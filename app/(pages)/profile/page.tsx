'use client';
import InputCard from '@/app/components/InputCard'
import Image from 'next/image'
import React, { useState } from 'react'

const page = () => {
    const [firstName, setFirstName] = useState('test');
    const [email, setEmail] = useState('anurpeljto@gmail.com');
    const [lastName, setLastName] = useState('Peljto')

    const handleSetFirstName = (fullName: string) => {
        setFirstName(fullName);
    }

    const handleSetLastName = (fullName: string) => {
        setLastName(fullName);
    }

    const handleSetEmail = (email: string) => {
        setEmail(email);
    }


  return (
    <div className="w-full h-full grid grid-rows-[0.10fr_0.85fr] md:p-10 p-4">
        <h1 className="text-4xl font-bold text-primary p-0 pb-4 m-0">Your profile</h1>
        <div className='flex flex-col gap-10'>
            <div className='flex flex-row items-end border-dashed border-b-1 border-gray-300 pb-2 gap-4'>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-xl'>Profile picture</h2>
                    <Image src="/avatar.jpg" height={100} width={100} className='h-[125px] w-[125px] rounded-full border-1 object-cover' alt='User avatar'></Image>
                </div>
                <button className='p-4 min-w-[100px] max-h-[50px] bg-gray-100 border-gray-200 border-1 flex items-center justify-center'>Upload your photo</button>
            </div>

            <div className='flex flex-col gap-4'>
                <h2 className='text-xl'>Basic information</h2>
                <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-10'>
                    <InputCard label='First Name' value={firstName} setField={handleSetFirstName}/>
                    <InputCard label='Last Name' value={lastName} setField={handleSetLastName}/>
                    <InputCard label='Email Address' value={email} setField={handleSetEmail}/>
                </div>
            </div>

            <div className='flex flex-col gap-4 justify-start items-start'>
                <h2 className='text-xl'>Security</h2>
                <div className='flex gap-5 items-center'>
                    <button className='p-2 bg-secondary flex items-center justify-center rounded-md text-white cursor-pointer'>Save settings</button>
                    <button className='p-2 bg-red-500 flex items-center justify-center rounded-md text-white cursor-pointer'>Reset password</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page

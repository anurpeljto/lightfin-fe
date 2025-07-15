'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, InputAdornment, TextField } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import LinkButton from '@/app/components/buttons/LinkButton';
import PrimaryButton from '@/app/components/buttons/PrimaryButton';
import Link from 'next/link';
import { logIn } from '@/app/services/authService';

const page = () => {

    const [showPassword, setShowPassword] = useState(false);
    const handleToggle = () => setShowPassword((show) => !show);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSetEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleSetPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
  return (
    <main className='w-[100vw] h-[100vh] flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center p-8 gap-5 shadow-lg min-w-[400px]'>
            <Image src="/logo.png" alt='logo' height={15} width={150}/>
            <h1 className='text-2xl'>Welcome</h1>
            <h3>Log in to continue to Lightfin</h3>
            <TextField required={true} id="outlined-basic" label="Email address" variant="outlined" className='w-full' type='email' onChangeCapture={handleSetEmail}/>
            <TextField
                required={true}
                type={showPassword ? 'text' : 'password'}
                label="Password"
                className='w-full'
                variant="outlined"
                onChangeCapture={handleSetPassword}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleToggle} edge="end" aria-label="toggle password visibility">
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}/>
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
            />

            <PrimaryButton title='Log in' actions={() => logIn(email, password)}/>
            <p className='self-start'>Don't have an account?  <Link href="/register" className='font-bold text-secondary hover:text-[#26806F]'>Sign Up</Link></p>
        </div>
    </main>
  )
}

export default page

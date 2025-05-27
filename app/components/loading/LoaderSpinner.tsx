import React from 'react'
import { CircularProgress } from '@mui/material';

const LoaderSpinner = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
        <CircularProgress/>
    </div>
  )
}

export default LoaderSpinner
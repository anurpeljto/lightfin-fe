import React from 'react'

interface GenerateButtonProps {
    onClick: () => void;
}

const GenerateButton = (props: GenerateButtonProps) => {
    const {onClick} = props;
  return (
    <div className='flex items-center justify-center px-2 py-1 rounded-lg bg-altpurple max-w-[200px] h-full max-h-[200px] mb-2 cursor-pointer' onClick={onClick}>
        <h2 className='text-lg font-bold text-white'>Generate report</h2>
    </div>
  )
}

export default GenerateButton
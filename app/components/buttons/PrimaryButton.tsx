import React from 'react'

interface PrimaryProps {
    actions: () => void,
    title: string,
}

const PrimaryButton = (props: PrimaryProps) => {
    const {title, actions} = props;

  return (
    <div className='w-full p-3 text-white rounded-sm cursor-pointer bg-secondary flex flex-col items-center justify-center hover:bg-[#26806F]' onClick={actions}>
        {title}
    </div>
  )
}

export default PrimaryButton

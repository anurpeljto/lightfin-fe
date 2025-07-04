import React from 'react'

interface InputCardProps {
    label: string,
    value: string,
    setField: (prop: any) => void
}

const InputCard = (props: InputCardProps) => {

    const {label, setField, value} = props;
    return (
        <div className='flex flex-col gap-2'>
            <h2 className='text-lg font-medium'>{label}</h2>
            <input onChangeCapture={setField} placeholder={value ? value : ''} className='text-black bg-gray-200 p-2 rounded-md'/>
        </div>
    )
}

export default InputCard

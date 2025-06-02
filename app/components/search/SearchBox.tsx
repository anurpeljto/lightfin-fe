'use client';
import React, { useEffect, useState } from 'react'

interface SearchBoxProps {
    search: (event: String) => void;
    title: string;
}

const SearchBox = (props: SearchBoxProps) => {
    const [input, setInput] = useState('');
    const {search, title} = props;

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            search(input)
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [input]);

  return (
    <form className='max-w-[200px] max-h-[200px] flex items-start flex-col mb-2'>
        <input onChange={(text) => setInput(text.target.value)} type="text" id="search" name="search" className="flex-1 px-2 py-1 border-2 border-secondary rounded w-full h-full" placeholder={title}/>
    </form>
  )
}

export default SearchBox
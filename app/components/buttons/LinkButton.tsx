import Link from 'next/link';
import React from 'react'

interface ActionProps {
    style: string;
    href: string;
    text: string;
}

const LinkButton = (props: ActionProps) => {
  const {style, text, href} = props;
  return (
    <Link href={href} className={`flex items-center justify-center p-3 rounded-lg border-2 ${style} hover:bg-gray-200`}>
      {text}
    </Link>
  )
}

export default LinkButton
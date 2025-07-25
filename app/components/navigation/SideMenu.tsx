import React from 'react'
import SmallDashboardIcon from './SmallDashboardIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileAlt, faMoneyBillAlt, faUser} from "@fortawesome/free-regular-svg-icons";
import { faCoins, faDonate, faHandHolding, faHandHoldingDollar, faPiggyBank, faReceipt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';

const SideMenu = () => {
  return (
    <div className='m-0 border-r-1 border-primary grid grid-rows-[0.15fr_0.50fr_0.355fr] items-center justify-center h-full w-full'>
        <div className='p-4'>
            <Image src="/logo.png" height={300} width={300} alt='Lightfin logo' className='object-contain'/>
        </div>

        <nav className='flex flex-col gap-10'>
            <Link href="/" className='flex flex-col gap-1 items-center cursor-pointer'>
                <SmallDashboardIcon/>
                <p className='text-sm'>Dashboard</p>
            </Link>
            <Link href="/users" className='flex flex-col gap-1 items-center cursor-pointer'>
                <FontAwesomeIcon icon={faUser} size='xl'/> 
                <p className='text-sm'>Users</p>
            </Link>
            <Link href="/subsidies" className='flex flex-col gap-1 items-center cursor-pointer'>
                <FontAwesomeIcon icon={faMoneyBillAlt} size='xl'/> 
                <p className='text-sm'>Subsidies</p>
            </Link>
            <Link href="/receipts" className='flex flex-col gap-1 items-center cursor-pointer'>
                <FontAwesomeIcon icon={faFileAlt} size='xl'/> 
                <p className='text-sm'>Receipts</p>
            </Link>
            <Link href="/loans" className='flex flex-col gap-1 items-center cursor-pointer'>
                <FontAwesomeIcon icon={faCoins} size='xl'/> 
                <p className='text-sm'>Loans</p>
            </Link>
        </nav>
        
        <Link href="/profile" className='p-4 flex justify-center w-full'>
            <Image src="/avatar.jpg" height={50} width={50} className='h-[50px] w-[50px] rounded-full border-1 object-cover' alt='User avatar'></Image>
        </Link>
    </div>
  )
}

export default SideMenu
'use client';
import ReportTable from '@/app/components/reports/ReportTable'
import { Column } from '@/app/interfaces/column.interface'
import React from 'react'

const page = () => {

    const columns: Column[] = [
        {columnDef: 'id', header: 'id'},
        {columnDef: 'first_name', header: 'First Name'},
        { columnDef: 'status', header: 'status'},
        { columnDef: 'subsidy_actions', header: 'Subsidy actions'},
    ];

    const columnData = [
        {
            id: 1,
            first_name: 'test',
            status: 'PENDING'
        },
        {
            id: 2,
            first_name: 'test',
            status: 'APPROVED'
        }
    ]

  return (
    <div className="w-full h-full grid grid-rows-[0.15fr_0.85fr] md:p-10 p-4">
        <h1 className="text-4xl font-bold text-primary p-0 pb-4 m-0">Loans</h1>

        <div className='flex flex-col w-full h-full gap-10'>

            <div className="item-wrapper w-full grid grid-cols-1 lg:grid-cols-4 lg:max-h-[150px] gap-4">
                <div className="flex flex-col gap-2 border-b sm:border-r-2 sm:border-b-0 border-gray-300 pb-2 sm:pb-0 sm:pr-4">
                    <h3 className="font-semibold text-lg">Total loans</h3>
                    <p>1034</p>
                </div>
                <div className="flex flex-col gap-2 border-b lg:border-r-2 lg:border-b-0 border-gray-300 pb-2 lg:pb-0 lg:pl-4 lg:pr-4">
                    <h3 className="font-semibold text-lg">Loans requested this week</h3>
                    <p>20</p>
                </div>
                <div className="flex flex-col gap-2 border-b lg:border-r-2 lg:border-b-0 border-gray-300 pb-2 lg:pb-0 lg:pl-4 lg:pr-4">
                    <h3 className="font-semibold text-lg">Total pending loans</h3>
                    <p>302.30</p>
                </div>
                <div className="flex flex-col gap-2 lg:pl-4">
                    <h3 className="font-semibold text-lg">Average loan amount</h3>
                    <p>3</p>
                </div>
                </div>

                <div className='flex flex-col gap-2 item-wrapper'>
                    <h2 className='text-xl font-bold'>All reciepts</h2>
                    <ReportTable columns={columns} columnData={columnData}/>
                </div>
            </div>
    </div>
  )
}

export default page
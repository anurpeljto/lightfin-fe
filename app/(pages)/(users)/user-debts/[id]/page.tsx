'use client';
import ArrowBack from '@/app/components/navigation/ArrowBack';
import ReportTable from '@/app/components/reports/ReportTable';
import ReportPage from '@/app/components/reports/ReportTable'
import { Column } from '@/app/interfaces/column.interface';
import { useParams } from 'next/navigation';
import React from 'react'


const page = () => {

  const {id} = useParams();

  const columns: Column[] = [
    { columnDef: 'id', header: 'id'},
    { columnDef: 'debt_id', header: 'debt_id' },
    { columnDef: 'first_name', header: 'First name' },
    { columnDef: 'last_name', header: 'Last name'},
    { columnDef: 'debt_amount', header: 'Debt amount' },
    { columnDef: 'debt_status', header: 'Debt status' },
    { columnDef: 'actions', header: 'actions' }
  ];

  const columnData: any = {
    data: [
      {
        id: id,
        first_name: 'first_name_fetched',
        last_name: 'last_name_fetched',
        debt_id: 2,
        debt_amount: 10000,
        debt_status: 'PENDING'
      }
    ]
  }

  return (
    <div className="w-full h-full grid grid-rows-[0.15fr_0.85fr] md:p-10 p-4">
        <nav className="text-4xl font-bold text-primary p-0 m-0 flex items-center gap-4 pb-10">
          <ArrowBack/>
          <p>Anur Peljto - Debts</p>
        </nav>
        
        <div className="w-full h-full sm:grid sm:grid-cols-3 flex flex-col gap-10 lg:gap-24 sm:gap-20 max-h-[200px]">
          <div className='col-span-3'>
            <ReportTable
              columns={columns}
              columnData={columnData.data}
            />
          </div>
        </div>
    </div>
  )
}

export default page
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
    { columnDef: 'borrower_id', header: 'borrower_id' },
    { columnDef: 'amount', header: 'Loan amount' },
    { columnDef: 'interest_rate', header: 'Interest rate'},
    { columnDef: 'loan_status', header: 'Loan status' },
    { columnDef: 'actions', header: 'actions' }
  ];

  const columnData: any = {
    data: [
      {
        id: 2,
        borrower_id: id,
        amount: 10000,
        loan_status: 'PENDING',
        interest_rate: 0.3,
      }
    ]
  }

  return (
    <div className="w-full h-full grid grid-rows-[0.15fr_0.85fr] md:p-10 p-4">
        <nav className="text-4xl font-bold text-primary p-0 m-0 flex items-center gap-4 pb-10">
          <ArrowBack/>
          <p>Anur Peljto - Loans</p>
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
'use client';
import LoaderSpinner from '@/app/components/loading/LoaderSpinner';
import ArrowBack from '@/app/components/navigation/ArrowBack';
import ReportTable from '@/app/components/reports/ReportTable';
import ReportPage from '@/app/components/reports/ReportTable'
import { GET_LOANS_BY_BORROWER } from '@/app/constants/queries/queries';
import { Column } from '@/app/interfaces/column.interface';
import { ApolloClient, useQuery } from '@apollo/client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react'


const page = () => {

  const {id} = useParams<{id: string}>();

  const columns: Column[] = [
    { columnDef: 'id', header: 'id'},
    { columnDef: 'borrowerId', header: 'borrower_id' },
    { columnDef: 'amount', header: 'Loan amount' },
    { columnDef: 'interestRate', header: 'Interest rate'},
    { columnDef: 'status', header: 'Loan status' },
    { columnDef: 'actions', header: 'actions' }
  ];

  const {data, loading, error} = useQuery(GET_LOANS_BY_BORROWER, {
    variables: {id: id}
  });
  const loanData = data && data.getLoansByUserId.data;

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

  if(loading){
    return (
      <LoaderSpinner/>
    )
  }

  if (error) return <p>Error loading loans: {error.message}</p>;

  if(loanData.length == 0){
    return (
      <div className="w-full h-full grid grid-rows-[0.15fr_0.85fr] md:p-10 p-4">
        <nav className="text-4xl font-bold text-primary p-0 m-0 flex items-center gap-4 pb-10">
          <ArrowBack/>
        </nav>
        <div className='flex flex-col items-center justify-center gap-2'>
          <Image src="/no-data.svg" height={100} width={100} alt='No data found' className='w-full h-full max-h-[350px]'/>
          <h2 className='sm:text-4xl text-2xl font-bold text-cancelled'>No data found for this user</h2>
        </div>
      </div>
    )
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
              columnData={loanData}
            />
          </div>
        </div>
    </div>
  )
}

export default page
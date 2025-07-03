'use client';
import LoaderSpinner from '@/app/components/loading/LoaderSpinner';
import ReportTable from '@/app/components/reports/ReportTable'
import { GET_LOAN_AVG, GET_LOANS, GET_LOANS_THIS_WEEK, GET_PENDING_LOANS, GET_TOTAL_LOAN } from '@/app/constants/queries/queries';
import { Column } from '@/app/interfaces/column.interface'
import { useQuery } from '@apollo/client';
import React, { useState } from 'react'

const page = () => {

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [filterBy, setFilterBy] = useState(undefined);
    const [sortBy, setSortBy] = useState("ASC");
    const columns: Column[] = [
        {columnDef: 'id', header: 'id'},
        {columnDef: 'borrowerId', header: 'Borrower ID'},
        { columnDef: 'status', header: 'status'},
        { columnDef: 'subsidy_actions', header: 'Loan actions'},
    ];

    const {data: loans, loading: loansLoading, error: loansError} = useQuery(GET_LOANS, {
        variables: {
            page: page,
            size: size,
            filterBy: filterBy,
            sortBy: sortBy
        }
    });
    const {data: totalLoans, loading: totalLoansLoading, error: isLoansError} = useQuery(GET_TOTAL_LOAN);
    const {data: loansThisWeek, loading: loansThisWeekLoading, error: loansThisWeekError} = useQuery(GET_LOANS_THIS_WEEK);
    const {data: pendingLoans, loading: pendingLoansLoading, error: pendingLoansError} = useQuery(GET_PENDING_LOANS);
    const {data: loanAvg, loading: loanAvgLoading, error: loanAvgError} = useQuery(GET_LOAN_AVG);

    if(totalLoansLoading || loansThisWeekLoading || pendingLoansLoading || loanAvgLoading || loansLoading){
        return <LoaderSpinner/>
    }

    const total = totalLoans?.getTotalLoans;
    const week = loansThisWeek?.getLoansThisWeek;
    const pending = pendingLoans?.getPendingLoans;
    const loangAvg = pendingLoans?.getLoanAverageAmount;
    const allLoans = loans?.getLoans;
  return (
    <div className="w-full h-full grid grid-rows-[0.15fr_0.85fr] md:p-10 p-4">
        <h1 className="text-4xl font-bold text-primary p-0 pb-4 m-0">Loans</h1>

        <div className='flex flex-col w-full h-full gap-10'>

            <div className="item-wrapper w-full grid grid-cols-1 lg:grid-cols-4 lg:max-h-[150px] gap-4">
                <div className="flex flex-col gap-2 border-b sm:border-r-2 sm:border-b-0 border-gray-300 pb-2 sm:pb-0 sm:pr-4">
                    <h3 className="font-semibold text-lg">Total loans</h3>
                    <p>{total}</p>
                </div>
                <div className="flex flex-col gap-2 border-b lg:border-r-2 lg:border-b-0 border-gray-300 pb-2 lg:pb-0 lg:pl-4 lg:pr-4">
                    <h3 className="font-semibold text-lg">Loans requested this week</h3>
                    <p>{week}</p>
                </div>
                <div className="flex flex-col gap-2 border-b lg:border-r-2 lg:border-b-0 border-gray-300 pb-2 lg:pb-0 lg:pl-4 lg:pr-4">
                    <h3 className="font-semibold text-lg">Total pending loans</h3>
                    <p>{pending}</p>
                </div>
                <div className="flex flex-col gap-2 lg:pl-4">
                    <h3 className="font-semibold text-lg">Average loan amount</h3>
                    <p>{loangAvg}</p>
                </div>
                </div>

                <div className='flex flex-col gap-2 item-wrapper'>
                    <h2 className='text-xl font-bold'>All Loans</h2>
                    <ReportTable
                     columns={columns} 
                     columnData={allLoans.loans} 
                     totalPages={allLoans.totalPages} 
                     setPage={setPage}
                     page={page}
                     size={size}
                    />
                </div>
            </div>
    </div>
  )
}

export default page
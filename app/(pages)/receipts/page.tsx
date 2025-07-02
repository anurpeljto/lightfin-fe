'use client';

import LoaderSpinner from '@/app/components/loading/LoaderSpinner';
import ReportTable from '@/app/components/reports/ReportTable'
import { GET_AVG_RECEIPTS, GET_MONTH_TRANSACTIONS_COUNT, GET_TODAY_TRANSACTIONS_COUNT, GET_WEEK_TRANSACTIONS_COUNT, LIST_RECEIPTS } from '@/app/constants/queries/queries';
import { Column } from '@/app/interfaces/column.interface'
import { useQuery } from '@apollo/client';
import React, { useState } from 'react'

const page = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const columns: Column[] = [
        {columnDef: 'id', header: 'id'},
        {columnDef: 'signature', header: 'Signature'},
        {columnDef: 'paymentType', header: 'Payment Type'},
        {columnDef: 'total', header: 'Total'},
        {columnDef: 'taxAmount', header: 'Tax Amount'},
        {columnDef: 'timestamp', header: 'Timestamp', isTimeStamp: true},
        {columnDef: 'status', header: 'status'},
        {columnDef: 'fiscalCode', header: 'Fiscal Code'},
        {columnDef: 'receiptActions', header: 'Actions'}
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

    const {data: receipts, loading: recieptsLoading, error: receiptsError, refetch: refetchReceipts} = useQuery(LIST_RECEIPTS, {
        variables: {
            page: page,
            size: size,
            sortBy: 'ASC'
        }
    });

    const {data: todayCount, loading: todayLoading, error: todayError, refetch: refetchToday} = useQuery(GET_TODAY_TRANSACTIONS_COUNT, {
            fetchPolicy: 'network-only'
    });
    
    const {data: weekCount, loading: weekLoading, error: weekError, refetch: refetchWeek} = useQuery(GET_WEEK_TRANSACTIONS_COUNT, {
            fetchPolicy: 'network-only'
    });

    const {data: monthCount, loading: monthLoading, error: monthError, refetch: refetchMonth} = useQuery(GET_MONTH_TRANSACTIONS_COUNT, {
            fetchPolicy: 'network-only'
    });

    const {data: average, loading: avgLoading, error: avgError, refetch: refetchAvg} = useQuery(GET_AVG_RECEIPTS);

    if(todayLoading || weekLoading || monthLoading || recieptsLoading || avgLoading){
        return <LoaderSpinner/>
    }

    const todayData = todayCount.getTodaysTransactionsCount;
    const weeklyData = weekCount.getWeeklyTransactionsCount;
    const monthlyData = monthCount.getMonthlyTransactionsCount;
    const avg = average.getAverageReceiptsPerDay;
    const receiptsList = receipts.listReceipts;
  return (
    <div className="w-full h-full grid grid-rows-[0.15fr_0.85fr] md:p-10 p-4">
        <h1 className="text-4xl font-bold text-primary p-0 pb-4 m-0">Receipts</h1>

        <div className='flex flex-col w-full h-full gap-10'>

            <div className="item-wrapper w-full grid grid-cols-1 lg:grid-cols-4 lg:max-h-[150px] gap-4">
                <div className="flex flex-col gap-2 border-b sm:border-r-2 sm:border-b-0 border-gray-300 pb-2 sm:pb-0 sm:pr-4">
                    <h3 className="font-semibold text-lg">Receipts issued today</h3>
                    <p>{todayData}</p>
                </div>
                <div className="flex flex-col gap-2 border-b lg:border-r-2 lg:border-b-0 border-gray-300 pb-2 lg:pb-0 lg:pl-4 lg:pr-4">
                    <h3 className="font-semibold text-lg">Receipts issued this week</h3>
                    <p>{weeklyData}</p>
                </div>
                <div className="flex flex-col gap-2 border-b lg:border-r-2 lg:border-b-0 border-gray-300 pb-2 lg:pb-0 lg:pl-4 lg:pr-4">
                    <h3 className="font-semibold text-lg">Receipts issued this month</h3>
                    <p>{monthlyData}</p>
                </div>
                <div className="flex flex-col gap-2 lg:pl-4">
                    <h3 className="font-semibold text-lg">Average receipts per day</h3>
                    <p>{avg}</p>
                </div>
                </div>

                <div className='flex flex-col gap-2 item-wrapper'>
                    <h2 className='text-xl font-bold'>All reciepts</h2>
                    <ReportTable columns={columns} columnData={receiptsList.content} page={page} totalPages={receiptsList.totalPages} size={size} setPage={setPage}/>
                </div>
            </div>
    </div>
  )
}

export default page
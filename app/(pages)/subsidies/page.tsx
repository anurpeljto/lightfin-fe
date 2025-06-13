'use client';
import LoaderSpinner from '@/app/components/loading/LoaderSpinner';
import ReportTable from '@/app/components/reports/ReportTable'
import { GET_PENDING_SUBSIDIES, GET_SUBSIDIES, GET_WEEKLY_SUBSIDIES } from '@/app/constants/queries/queries';
import { Column } from '@/app/interfaces/column.interface'
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'

const page = () => {

    const columns: Column[] = [
        {columnDef: 'id', header: 'id'},
        {columnDef: 'recipientId', header: 'Recipient Id'},
        { columnDef: 'amount', header: 'amount'},
        { columnDef: 'status', header: 'status' },
        { columnDef: 'grant', header: 'Granting authority'},
        { columnDef: 'subsidy_actions', header: 'Subsidy actions'},
    ];
    const [page, setPage] = useState(0);
    const {data, loading, error, refetch} = useQuery(GET_SUBSIDIES, {
        variables: {page: page, size: 20},
        fetchPolicy: 'network-only'
      });

    const subsidyData = data && data.listSubsidies;

    const fetchPending = useQuery(GET_PENDING_SUBSIDIES, {
        variables: {page: 0, size: 100000}
    });
    const pending = fetchPending.data?.getPendingSubsidies?.totalElements;

    const fetchWeekly = useQuery(GET_WEEKLY_SUBSIDIES);
    const weeklyCount = fetchWeekly.data?.getWeeklySubsidies?.totalElements;

    if(loading || fetchPending.loading || fetchWeekly.loading){
        return <LoaderSpinner/>
    }

    return (
    <div className="w-full h-full grid grid-rows-[0.15fr_0.85fr] md:p-10 p-4">
        <h1 className="text-4xl font-bold text-primary p-0 pb-4 m-0">Subsidies</h1>

        <div className='flex flex-col w-full h-full gap-10'>

            <div className="item-wrapper w-full grid grid-cols-1 lg:grid-cols-3 lg:max-h-[150px] gap-4">
                <div className="flex flex-col gap-2 border-b sm:border-r-2 sm:border-b-0 border-gray-300 pb-2 sm:pb-0 sm:pr-4">
                    <h3 className="font-semibold text-lg">Total subsidies</h3>
                    <p>{subsidyData.totalElements}</p>
                </div>
                <div className="flex flex-col gap-2 border-b lg:border-r-2 lg:border-b-0 border-gray-300 pb-2 lg:pb-0 lg:pl-4 lg:pr-4">
                    <h3 className="font-semibold text-lg">Pending subsidies</h3>
                    <p>{pending}</p>
                </div>
                <div className="flex flex-col gap-2 lg:pl-4">
                    <h3 className="font-semibold text-lg">New subsidy requests this week</h3>
                    <p>{weeklyCount}</p>
                </div>
                </div>

                <div className='flex flex-col gap-2 item-wrapper'>
                    <h2 className='text-xl font-bold'>All subsidies</h2>
                    <ReportTable columns={columns} columnData={subsidyData.content} refetch={refetch}
                        page={page}
                        size={subsidyData.size}
                        totalPages={subsidyData.totalPages}
                        setPage={setPage}
                    />
                </div>
            </div>
    </div>
  )
}

export default page
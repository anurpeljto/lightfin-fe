'use client';
import LoaderSpinner from '@/app/components/loading/LoaderSpinner';
import ArrowBack from '@/app/components/navigation/ArrowBack';
import NoData from '@/app/components/navigation/NoData';
import GenerateButton from '@/app/components/reports/GenerateButton';
import ReportTable from '@/app/components/reports/ReportTable';
import ReportPage from '@/app/components/reports/ReportTable'
import FilterBox from '@/app/components/search/FilterBox';
import { APPROVE_SUBSIDY, GET_SUBSIDIES_USER, GET_USER_BY_ID } from '@/app/constants/queries/queries';
import { Column } from '@/app/interfaces/column.interface';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'


const page = () => {
  const {id} = useParams();
  const [filterBy, setFilterBy] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');

  const columns: Column[] = [
    { columnDef: 'id', header: 'id'},
    { columnDef: 'grant', header: 'Granting Authority' },
    { columnDef: 'amount', header: 'Amount' },
    { columnDef: 'approval_date', header: 'Approval date' },
    { columnDef: 'valid_until', header: 'Valid until' },
    { columnDef: 'status', header: 'Status' },
    { columnDef: 'subsidy_actions', header: 'Actions' }
  ];

  const fetchUser = useQuery(GET_USER_BY_ID, {
      variables: {id: Number(id)}
  });

  const user = fetchUser?.data?.getUserById;

  const {data, loading, error} = useQuery(GET_SUBSIDIES_USER, {
      variables: {id: id, page: 0, size: 20, filterBy, sortBy}
    });
  const subsidyData = data && data.getSubsidiesByUserId.content;

  const handleFilter = (event: string) => {
    setFilterBy(event);
  };

  const handleSort = (event: string) => {
    setSortBy(event);
  }

  const generateReport = async() => {
    const file = await fetch(`${process.env.NEXT_PUBLIC_REST_URL}/api/reports/user-subsidies/${id}/report?first_name=${user.first_name}&last_name=${user.last_name}&email=${user.email}`).then(
      response => {
        if(!response.ok) throw new Error("Network response was not ok");
          return response.blob();
      }
    ).then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `loan_report_${user.first_name}_${user.last_name}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
  }

  if(fetchUser.loading || loading){
    return (
      <LoaderSpinner/>
    )
  }

  if (error || fetchUser.error) return <p>Error loading loans: {error?.message}</p>;

  if(subsidyData.length == 0){
    return <NoData/>
  }

  return (
    <div className="w-full h-full grid grid-rows-[0.15fr_0.05fr_0.90fr] md:p-10 p-4">
        <nav className="text-4xl font-bold text-primary p-0 m-0 flex items-center gap-4 pb-10">
          <ArrowBack/>
          <p>{user.first_name} {user.last_name} - Subsidies</p>
        </nav>
        <div className='flex gap-2 items-center w-full'>
          <FilterBox filter={handleFilter} title='Filter by' options={['Status', 'Amount']} value={filterBy}/>
          <FilterBox filter={handleSort} title='Sort by' options={['ASC', 'DESC']} value={sortBy}/>
          <GenerateButton onClick={generateReport}/>
        </div>
        <div className="w-full h-full sm:grid sm:grid-cols-3 flex flex-col gap-10 lg:gap-24 sm:gap-20 max-h-[200px] mt-2">
          <div className='col-span-3'>
            <ReportTable
              columns={columns}
              columnData={subsidyData}
            />
          </div>
        </div>
    </div>
  )
}

export default page
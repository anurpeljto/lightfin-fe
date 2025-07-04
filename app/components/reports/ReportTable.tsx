'use client';
import { Column } from '@/app/interfaces/column.interface'
import React from 'react'
import LinkButton from '../buttons/LinkButton';
import { useMutation } from '@apollo/client';
import { APPROVE_LOAN, APPROVE_SUBSIDY, GET_LOANS, GET_SUBSIDIES, REJECT_LOAN, REJECT_SUBSIDY } from '@/app/constants/queries/queries';

interface ReportTableProps {
    columns: Column[];
    columnData: any;
    refetch?: () => void;
    page: number;
    size: number;
    totalPages: number;
    setPage: (newPage: number) => void;
}

const ReportTable = (props: ReportTableProps) => {
  const {columns, columnData} = props;
  const [approveSubsidy] = useMutation(APPROVE_SUBSIDY, {
    refetchQueries: [{
      query: GET_SUBSIDIES,
      variables: {page: props.page, size: props.size}
    }]
  });

  const [rejectSubsidy] = useMutation(REJECT_SUBSIDY, {
    refetchQueries: [{
      query: GET_SUBSIDIES,
      variables: {page: props.page, size: props.size}
    }]
  });

  const [approveLoan] = useMutation(APPROVE_LOAN, {
    refetchQueries: [{
      query: GET_LOANS,
      variables: {page: props.page, size: props.page}
    }]
  });

  const [rejectLoan] = useMutation(REJECT_LOAN, {
    refetchQueries: [{
      query: GET_LOANS,
      variables: {page: props.page, size: props.page}
    }]
  });

  const handleApproveSubsidy = async(id: number) => {
    try {
      await approveSubsidy({variables: {id}});
      if(props.refetch){
        await props.refetch();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleRejectSubsidy = async(id: number) => {
    try {
      await rejectSubsidy({variables: {id}});
      if(props.refetch){
        await props.refetch();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleApproveLoan = async(id: number) => {
    try {
      await approveLoan({variables: {id}});
      if(props.refetch){
        await props.refetch();
      }
    } catch (error) {
      throw error;
    }
  }

  const handleRejectLoan = async(id: number) => {
    try {
      await rejectLoan({variables: {id}});
      if(props.refetch){
        await props.refetch();
      }
    } catch (error) {
      throw error;
    }
  }

  const generateReceipt = async(id: number) => {
    const file = await fetch(`${process.env.NEXT_PUBLIC_REST_URL}/api/reports/receipts/${id}/generate`).then(
      response => {
        if(!response.ok) throw new Error("Network response was not ok");
          return response.blob();
      }
    ).then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt_${id}_report.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
  }

  return (
    <div className="min-w-full min-h-full">
      {/* Desktop Table */}
      <table className="hidden sm:table min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            {columns.map((column) => (
              <th key={column.columnDef} className="px-4 py-2">{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {columnData.map((item: any) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              {columns.map((col: Column) => {
                if (col.columnDef === 'subsidy_actions' || col.columnDef === "loan_actions" && item.status !== 'PENDING') {
                  return null;
                }

                if(col.isTimeStamp){
                  return (
                    <td key={col.columnDef} className='px-4 py-2'>
                      {new Date(item[col.columnDef]).toLocaleDateString('sr-LATN-sr')}
                    </td>
                  )
                }

                return (
                  <td key={col.columnDef} className="px-4 py-2">
                    {col.columnDef === 'actions' ? (
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:underline">Generate report</button>
                        <button className="text-red-600 hover:underline">Delete</button>
                      </div>
                    ) : col.columnDef === 'subsidy_actions' ? (
                      <div className="flex gap-2">
                        <button onClick={() => handleApproveSubsidy(item.id)} className="text-blue-600 hover:underline">Approve</button>
                        <button onClick={() => handleRejectSubsidy(item.id)} className="text-red-600 hover:underline">Reject</button>
                      </div>
                    ) : col.columnDef === 'receiptActions' ? (
                      <div className="flex gap-2">
                          <button onClick={() => generateReceipt(item.id)} className="text-blue-600 hover:underline">Generate receipt</button>
                        </div>
                    ): col.columnDef === 'loan_actions' ? (
                      <div className="flex gap-2">
                        <button onClick={() => handleApproveLoan(item.id)} className="text-blue-600 hover:underline">Approve</button>
                        <button onClick={() => handleRejectLoan(item.id)} className="text-red-600 hover:underline">Reject</button>
                      </div>
                    ) :
                    col.columnDef === 'grant' && item.grant ? (
                      item.grant.name
                    ): item[col.columnDef] == null ? (
                      '-'
                    ):
                    (
                      String(item[col.columnDef])
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center items-center gap-4">
        <button
          onClick={() => props.page > 0 && props.setPage(props.page - 1)}
          disabled={props.page === 0}
          className={`px-3 py-1 border rounded ${props.page === 0 ? 'bg-gray-200 text-gray-500' : 'bg-white hover:bg-gray-100'}`}
        >
          Previous
        </button>

        <span className="text-sm">
          Page {props.page + 1} of {props.totalPages}
        </span>

        <button
          onClick={() => props.page < props.totalPages - 1 && props.setPage(props.page + 1)}
          disabled={props.page === props.totalPages - 1}
          className={`px-3 py-1 border rounded ${props.page === props.totalPages - 1 ? 'bg-gray-200 text-gray-500' : 'bg-white hover:bg-gray-100'}`}
        >
          Next
        </button>
      </div>

        <div className="sm:hidden block w-full space-y-4 text-sm">
        {columnData.map((row: any, index: number) => (
            <div
            key={index}
            className="border p-4 rounded-lg shadow-sm bg-gray-50 space-y-2 w-full"
            >
            {columns.map((col: Column) => (
                <div
                key={col.columnDef}
                className="flex justify-between gap-4 items-start"
                >
                <span className="font-semibold whitespace-nowrap">{col.header}:</span>
                {col.columnDef === 'actions' ? (
                    <div className="flex gap-2 flex-wrap justify-end">
                    <button className="text-blue-600 hover:underline">
                        Generate report
                    </button>
                    <button className="text-red-600 hover:underline">Delete</button>
                    </div>
                ) : (
                    <span className="text-right break-all">
                    {String(row[col.columnDef])}
                    </span>
                )}
                </div>
            ))}
            </div>
        ))}
        </div>
    </div>
  )
}

export default ReportTable;
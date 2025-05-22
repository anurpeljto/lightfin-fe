import { Column } from '@/app/interfaces/column.interface'
import React from 'react'
import LinkButton from '../buttons/LinkButton';

interface ReportTableProps {
    columns: Column[];
    columnData: any;
}

const ReportTable = (props: ReportTableProps) => {
  const {columns, columnData} = props;
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
                if (col.columnDef === 'subsidy_actions' && item.status !== 'PENDING') {
                  return null;
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
                        <button className="text-blue-600 hover:underline">Approve</button>
                        <button className="text-red-600 hover:underline">Reject</button>
                      </div>
                    ) : (
                      String(item[col.columnDef])
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

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
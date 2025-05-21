import { Column } from '@/app/interfaces/column.interface'
import React from 'react'

interface ReportTableProps {
    columns: Column[];
    columnData: any;
}

const ReportTable = (props: ReportTableProps) => {
  const {columns, columnData} = props;
  return (
    <div className='min-w-full min-h-full'>
        <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                <tr>
                {
                    columns && columns.map(column => (
                        <th key={column.columnDef} className="px-4 py-2">{column.header}</th>
                    ))
                }
                </tr>
            </thead>
            <tbody>
                {columnData.map((item: any) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                    {columns.map((col: Column) => (
                        <td key={col.columnDef} className='px-4 py-2'>
                            { col.columnDef === 'actions' ? (
                                <div className="flex gap-2">
                                    <button className="text-blue-600 hover:underline">Generate report</button>
                                    <button className="text-red-600 hover:underline">Delete</button>
                                </div>)
                                :
                                String(item[col.columnDef])
                            }
                        </td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ReportTable;
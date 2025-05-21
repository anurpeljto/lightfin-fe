import Link from 'next/link'
import React from 'react'

const page = () => {
    const users = [
        {
            id: 1,
            name: 'test',
            last_name: 'lastname',
            email: 'testmail@test.com',
            role: 'client'
        }
    ]
  return (
    <div className="w-full h-full grid grid-rows-[0.15fr_0.85fr] p-10">
        <h1 className="text-4xl font-bold text-primary p-0 m-0">Users</h1>
        
        <div className="w-full h-full sm:grid sm:grid-cols-3 flex flex-col gap-10 lg:gap-24 sm:gap-20 max-h-[200px]">
            <div className='col-span-3'>
                <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                        <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">First name</th>
                        <th className="px-4 py-2">Last name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Role</th>
                        <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2 font-medium text-gray-800">{user.id}</td>
                            <td className="px-4 py-2">{user.name}</td>
                            <td className="px-4 py-2">{user.last_name}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">{user.role}</td>
                            <td className="px-4 py-2">
                                <div className='flex w-full gap-2'>
                                    <button>Loans</button>
                                    <Link href={`/user-debts/${user.id}`}>Debts</Link>
                                    <button>Subsidies</button>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default page
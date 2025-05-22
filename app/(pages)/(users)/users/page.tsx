import LinkButton from '@/app/components/buttons/LinkButton'
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
        },
        {
            id: 2,
            name: 'test',
            last_name: 'lastname',
            email: 'testmail@test.com',
            role: 'client'
        },
        {
            id: 3,
            name: 'test',
            last_name: 'lastname',
            email: 'testmail@test.com',
            role: 'client'
        },
        {
            id: 4,
            name: 'test',
            last_name: 'lastname',
            email: 'testmail@test.com',
            role: 'client'
        },
        {
            id: 5,
            name: 'test',
            last_name: 'lastname',
            email: 'testmail@test.com',
            role: 'client'
        }
    ]
  return (
    <div className="w-full h-full grid grid-rows-[0.15fr_0.85fr] md:p-10 p-4">
        <h1 className="text-4xl font-bold text-primary sm:p-0 py-6 m-0">Users</h1>
        
        <div className="w-full h-full sm:grid sm:grid-cols-3 flex flex-col gap-10 lg:gap-24 sm:gap-20 max-h-screen overflow-y-scroll">
            <div className='hidden sm:block col-span-3'>
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
                                <LinkButton href={`/user-loans/${user.id}`} style={'border-red-300'} text='Loans'/>
                                <LinkButton href={`/user-debts/${user.id}`} style={'border-green-300'} text='Debts'/>
                                <LinkButton href={`/user-subsidies/${user.id}`} style={'border-yellow-300'} text='Subsidies'/>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="block sm:hidden space-y-4 overflow-y-scroll text-sm m-0">
            {users.map(user => (
              <div key={user.id} className="border p-2 rounded-lg shadow-sm bg-gray-50 border-b-2 border-gray-150 flex flex-col gap-2">
                <div className='flex flex-col'>
                    <p><span className="font-semibold">ID:</span> {user.id}</p>
                    <p><span className="font-semibold">First name:</span> {user.name}</p>
                    <p><span className="font-semibold">Last name:</span> ${user.last_name}</p>
                    <p><span className="font-semibold">Email:</span> ${user.email}</p>
                    <p><span className="font-semibold">Role:</span> {user.role}</p>
                </div>
                <div className='flex w-full items-center justify-between gap-1'>
                    <LinkButton href={`/user-loans/${user.id}`} style={'border-canceled'} text='Loans'/>
                    <LinkButton href={`/user-debts/${user.id}`} style={'border-warning'} text='Debts'/>
                    <LinkButton href={`/user-subsidies/${user.id}`} style={'border-secondary'} text='Subsidies'/>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default page
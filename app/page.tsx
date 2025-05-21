'use client';
import { Bar, ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import Image from "next/image";
import CountUp from "react-countup";

export default function Home() {

  const data = [
    { status: 'PENDING', count: 20 },
    { status: 'CANCELLED', count: 15 },
    { status: 'FISCALIZED', count: 65 },
  ];

  const pieData = [
    {
      "id": "cash",
      "label": "cash",
      "value": 311,
      "color": "hsl(355, 70%, 50%)"
    },
    {
      "id": "credit",
      "label": "credit",
      "value": 401,
      "color": "hsl(295, 70%, 50%)"
    },
    
  ];

  const latestTransactions = [
    {
      id: 'TX12345',
      customer: 'John Doe',
      amount: 49.99,
      status: 'FISCALIZED',
      date: '2025-05-20',
    },
    {
      id: 'TX12346',
      customer: 'Jane Smith',
      amount: 120.00,
      status: 'PENDING',
      date: '2025-05-19',
    },
    {
      id: 'TX12347',
      customer: 'John Doe',
      amount: 49.99,
      status: 'FISCALIZED',
      date: '2025-05-20',
    },
    {
      id: 'TX12348',
      customer: 'Jane Smith',
      amount: 120.00,
      status: 'PENDING',
      date: '2025-05-19',
    },
    {
      id: 'TX12349',
      customer: 'John Doe',
      amount: 49.99,
      status: 'FISCALIZED',
      date: '2025-05-20',
    },
    {
      id: 'TX123410',
      customer: 'Jane Smith',
      amount: 120.00,
      status: 'PENDING',
      date: '2025-05-19',
    },
    {
      id: 'TX123411',
      customer: 'John Doe',
      amount: 49.99,
      status: 'FISCALIZED',
      date: '2025-05-20',
    },
    {
      id: 'TX123412',
      customer: 'Jane Smith',
      amount: 120.00,
      status: 'PENDING',
      date: '2025-05-19',
    }
  ];

  const customColors = {
    PENDING: '#E7C86D',    
    CANCELLED: '#C14B49',
    FISCALIZED: '#2D9783',
  };

  return (
    <div className="w-full h-full grid grid-rows-[0.15fr_0.85fr] p-10">
      <h1 className="text-4xl font-bold text-primary p-0 m-0">Dashboard</h1>

      <div className="w-full h-full sm:grid sm:grid-cols-3 flex flex-col gap-10 lg:gap-24 sm:gap-20 max-h-[200px]">
        <div className="flex flex-col gap-1 bg-white p-4 rounded-lg border-1 border-gray-200">
          <div className="flex flex-row gap-1 items-center">
            <div className="h-[10px] w-[10px] rounded-full bg-secondary"></div>
            <span className="text-normal text-primary">Fiscalized transactions this week</span>
          </div>
          <CountUp
            className="text-3xl font-[900] text-secondary"
            start={0}
            end={2002}
            duration={1.5}
            decimals={0}
          />
        </div>
        
        <div className="flex flex-col gap-1 bg-white p-4 rounded-lg border-1 border-gray-200">
          <div className="flex flex-row gap-1 items-center">
            <div className="h-[10px] w-[10px] rounded-full bg-pending"></div>
            <span className="text-normal text-primary">Pending transactions this week</span>
          </div>
          <CountUp
            className="text-3xl font-[900] font-bold text-pending"
            start={0}
            end={20}
            duration={1.5}
            decimals={0}
           />
        </div>

        <div className="flex flex-col gap-1 bg-white p-4 rounded-lg border-1 border-gray-200">
          <div className="flex flex-row gap-1 items-center">
            <div className="h-[10px] w-[10px] rounded-full bg-cancelled"></div>
            <span className="text-normal text-primary">Cancelled transactions this week</span>
          </div>
          <CountUp
            className="text-3xl font-[900] font-bold text-cancelled"
            start={0}
            end={3}
            duration={1.5}
            decimals={0}
          />
        </div>

        <div className="col-span-2 hidden sm:flex items-center justify-between w-full">
          <div className="min-w-[250px] min-h-[300px] w-full bg-white p-4 bg-white p-4 rounded-lg border-1 border-gray-200">
            <p className="p-0 pb-3 m-0 text-lg text-primary font-bold">Today's transcations</p>
            <ResponsiveBar
              data={data}
              margin={{bottom: 70, left: -100}}
              keys={['count']}
              indexBy="status"
              padding={0.3}
              colors={({ indexValue }) => {
                switch (indexValue) {
                  case 'PENDING':
                    return '#E7C86D'; 
                  case 'CANCELLED':
                    return '#C14B49'; 
                  case 'FISCALIZED':
                    return '#2D9783';
                  default:
                    return '#ccc';
                }
              }}
              enableGridX={false}
              enableGridY={false}
              axisBottom={{ legend: 'Status', legendOffset: 32 }}
              axisLeft={{ legend: 'No. transactions', legendOffset: -40 }}
              labelSkipWidth={12}
              labelSkipHeight={12}
            />
          </div>
        </div>
        <div className="hidden sm:block col-span-1 min-w-[250px] min-h-[300px] w-full bg-white p-4 rounded-lg bg-white border-1 border-gray-200">
            <p className="p-0 pb-3 m-0 text-lg text-primary font-bold">Weekly payments by type</p>
            <ResponsivePie
                data={pieData}
                margin={{ bottom: 50, top: 10, left: 5 }}
                padAngle={0.6}
                cornerRadius={2}
                activeOuterRadiusOffset={8}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            />              
        </div>
        
        <div className="col-span-3 w-full h-full flex flex-col p-4 bg-white rounded-lg border-1 border-gray-200">
          <p className="p-0 pb-3 m-0 text-lg text-primary font-bold">Latest issued receipts</p>
          <div className="max-h-[150px] overflow-y-scroll">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {latestTransactions.map(tx => (
                  <tr key={tx.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-800">{tx.id}</td>
                    <td className="px-4 py-2">{tx.customer}</td>
                    <td className="px-4 py-2">${tx.amount.toFixed(2)}</td>
                    <td className={`px-4 py-2 font-semibold ${
                      tx.status === 'FISCALIZED' ? 'text-green-600' :
                      tx.status === 'PENDING' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {tx.status}
                    </td>
                    <td className="px-4 py-2">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

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

  const customColors = {
    PENDING: '#E7C86D',    
    CANCELLED: '#C14B49',
    FISCALIZED: '#2D9783',
  };

  return (
    <div className="w-full h-full grid grid-rows-[0.15fr_0.75fr] p-10">
      <h1 className="text-4xl font-bold text-primary p-0 m-0">Dashboard</h1>

      <div className="w-full h-full sm:grid sm:grid-cols-3 flex flex-col sm:gap-20 gap-10 max-h-[200px]">
        <div className="flex flex-col gap-1">
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
        
        <div className="flex flex-col gap-1 max-h-[200px]">
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

        <div className="flex flex-col gap-1 max-h-[200px]">
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

        <div className="hidden sm:flex items-center justify-between w-full">
          <div className="min-w-[250px] min-h-[300px] w-full bg-white">
            <p className="p-0 pb-3 m-0 text-lg text-primary font-bold">Today's transcations</p>
            <ResponsiveBar
              data={data}
              margin={{bottom: 20, left: 0}}
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

          <div>

          </div>
        </div>
      </div>
    </div>
  );
}

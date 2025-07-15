'use client';

import { Bar, ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import Image from "next/image";
import CountUp from "react-countup";
import { useQuery } from "@apollo/client";

import {
  cancelledThisWeekQuery,
  fiscalizedThisWeekQuery,
  GET_LATEST_RECEIPTS,
  pendingThisWeekQuery,
  todayTransactionsQuery,
  weeklyByTypeQuery
} from "./constants/queries/queries";

import LoaderSpinner from "./components/loading/LoaderSpinner";

export default function Home() {
  const {
    data: fiscalizedData,
    loading: fiscalizedLoading,
    error: fiscalizedError
  } = useQuery(fiscalizedThisWeekQuery);

  const {
    data: pendingData,
    loading: pendingLoading,
    error: pendingError
  } = useQuery(pendingThisWeekQuery);

  const {
    data: cancelledData,
    loading: cancelledLoading,
    error: cancelledError
  } = useQuery(cancelledThisWeekQuery);

  const {
    data: todaysData,
    loading: todaysLoading,
    error: todaysError
  } = useQuery(todayTransactionsQuery);

  const {
    data: weeklyByTypeData,
    loading: weeklyByTypeLoading,
    error: weeklyByTypeError
  } = useQuery(weeklyByTypeQuery);

  const {
    data: latestReceiptsData,
    loading: latestReceiptsLoading,
    error: latestReceiptsError
  } = useQuery(GET_LATEST_RECEIPTS, {
    pollInterval: 5000
  });

  if (
    fiscalizedLoading ||
    pendingLoading ||
    cancelledLoading ||
    todaysLoading ||
    weeklyByTypeLoading ||
    latestReceiptsLoading
  ) {
    return <LoaderSpinner />;
  }

  if (
    fiscalizedError ||
    pendingError ||
    cancelledError ||
    todaysError ||
    weeklyByTypeError ||
    latestReceiptsError
  ) {
    console.error({
      fiscalizedError,
      pendingError,
      cancelledError,
      todaysError,
      weeklyByTypeError,
      latestReceiptsError,
    });
    return <div>Error loading data. Please try again later.</div>;
  }

  const fiscalizedWeeklyData =
    fiscalizedData?.getFiscalizedThisWeek?.totalElements ?? 0;
  const pendingWeeklyData = pendingData?.getPendingThisWeek?.totalElements ?? 0;
  const cancelledWeeklyData =
    cancelledData?.getCancelledThisWeek?.totalElements ?? 0;
  const todaysTransactions = todaysData?.getTodaysTransactions?.todayDTOList ?? [];
  const weeklyPaymentsByType = weeklyByTypeData?.getWeeklyByType?.weeklyByType ?? [];
  const latestReceipts = latestReceiptsData?.getLatestReceipts ?? [];

  const customColors = {
    PENDING: "#E7C86D",
    CANCELLED: "#C14B49",
    FISCALIZED: "#2D9783",
  };

  return (
    <div className="w-full h-full grid grid-rows-[0.15fr_0.85fr] py-10 px-4 sm:p-10 sm:mx-0 mb-10">
      <h1 className="text-4xl font-bold text-primary sm:p-0 pb-4 m-0">Dashboard</h1>

      <div className="w-full h-full lg:grid lg:grid-cols-3 flex flex-col gap-10 lg:gap-24 sm:gap-20 sm:max-h-[200px]">
        {/* Fiscalized transactions */}
        <div className="flex flex-col gap-1 bg-white p-4 rounded-lg border-1 border-gray-200">
          <div className="flex flex-row gap-1 items-center">
            <div className="h-[10px] w-[10px] rounded-full bg-secondary"></div>
            <span className="text-normal text-primary">
              Fiscalized transactions this week
            </span>
          </div>
          <CountUp
            className="text-3xl font-[900] text-secondary"
            start={0}
            end={fiscalizedWeeklyData}
            duration={1.5}
            decimals={0}
          />
        </div>

        {/* Pending transactions */}
        <div className="flex flex-col gap-1 bg-white p-4 rounded-lg border-1 border-gray-200">
          <div className="flex flex-row gap-1 items-center">
            <div className="h-[10px] w-[10px] rounded-full bg-pending"></div>
            <span className="text-normal text-primary">
              Pending transactions this week
            </span>
          </div>
          <CountUp
            className="text-3xl font-[900] font-bold text-pending"
            start={0}
            end={pendingWeeklyData}
            duration={1.5}
            decimals={0}
          />
        </div>

        {/* Cancelled transactions */}
        <div className="flex flex-col gap-1 bg-white p-4 rounded-lg border-1 border-gray-200">
          <div className="flex flex-row gap-1 items-center">
            <div className="h-[10px] w-[10px] rounded-full bg-cancelled"></div>
            <span className="text-normal text-primary">
              Cancelled transactions this week
            </span>
          </div>
          <CountUp
            className="text-3xl font-[900] font-bold text-cancelled"
            start={0}
            end={cancelledWeeklyData}
            duration={1.5}
            decimals={0}
          />
        </div>

        {/* Today's transactions bar chart */}
        <div className="col-span-2 hidden sm:flex items-center justify-between w-full">
          <div className="md:min-w-[250px] min-h-[300px] w-full bg-white p-4 bg-white p-4 rounded-lg border-1 border-gray-200">
            <p className="p-0 pb-3 m-0 text-lg text-primary font-bold">
              Today's transactions
            </p>
            <ResponsiveBar
              data={todaysTransactions}
              margin={{ bottom: 70, left: -50 }}
              keys={["count"]}
              indexBy="status"
              padding={0.3}
              colors={({ indexValue }) => {
                switch (indexValue) {
                  case "PENDING":
                    return "#E7C86D";
                  case "CANCELLED":
                    return "#C14B49";
                  case "FISCALIZED":
                    return "#2D9783";
                  default:
                    return "#ccc";
                }
              }}
              enableGridX={false}
              enableGridY={false}
              axisBottom={{ legend: "Status", legendOffset: 32 }}
              axisLeft={{ legend: "No. transactions", legendOffset: -40 }}
              labelSkipWidth={12}
              labelSkipHeight={12}
            />
          </div>
        </div>

        {/* Weekly payments by type pie chart */}
        <div className="hidden sm:block col-span-1 lg:min-w-[250px] min-h-[300px] w-full bg-white p-4 rounded-lg bg-white border-1 border-gray-200">
          <p className="p-0 pb-3 m-0 text-lg text-primary font-bold">
            Weekly payments by type
          </p>
          <div className="h-[200px] w-full">
            <ResponsivePie
              data={weeklyPaymentsByType}
              colors={{ datum: "data.color" }}
              margin={{ top: 10, right: 10, bottom: 40, left: 10 }}
              padAngle={0.6}
              cornerRadius={2}
              activeOuterRadiusOffset={8}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
            />
          </div>
        </div>

        {/* Latest issued receipts table */}
        <div className="col-span-3 sm:w-full h-full flex flex-col p-4 bg-white rounded-lg border-1 border-gray-200">
          <p className="p-0 pb-3 m-0 text-lg text-primary font-bold">
            Latest issued receipts
          </p>

          {/* desktop */}
          <div className="hidden sm:block max-h-[150px] overflow-y-scroll">
            <table className="md:min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                <tr>
                  <th className="px-4 py-2">Fiscal code</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Tax amount</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {latestReceipts.map((receipt: any) => (
                  <tr key={receipt.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{receipt.fiscalCode}</td>
                    <td className="px-4 py-2">${receipt.total.toFixed(2)}</td>
                    <td className="px-4 py-2">${receipt.taxAmount.toFixed(2)}</td>
                    <td
                      className={`px-4 py-2 font-semibold ${
                        receipt.status === "FISCALIZED"
                          ? "text-green-600"
                          : receipt.status === "PENDING"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {receipt.status}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(receipt.timestamp).toLocaleString("sr-Latn")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* mobile */}
          <div className="block sm:hidden space-y-4 overflow-y-scroll text-sm max-h-[150px]">
            {latestReceipts.map((tx: any) => (
              <div
                key={tx.id}
                className="border p-3 rounded-lg shadow-sm bg-gray-50 border-b-2 border-gray-150"
              >
                <p>
                  <span className="font-semibold">Fiscal code:</span>{" "}
                  {tx.fiscalCode}
                </p>
                <p>
                  <span className="font-semibold">Tax amount:</span>{" "}
                  {tx.taxAmount.toFixed(2)}
                </p>
                <p>
                  <span className="font-semibold">Total:</span> $
                  {tx.total.toFixed(2)}
                </p>
                <p
                  className={`font-semibold ${
                    tx.status === "FISCALIZED"
                      ? "text-green-600"
                      : tx.status === "PENDING"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {tx.status}
                </p>
                <p>
                  <span className="font-semibold">Date:</span> {tx.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

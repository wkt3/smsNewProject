import CardList from "@/components/dashboard/cards/CardList";
import ToDoList from "@/components/dashboard/cards/ToDoList";
import AppAreaChart from "@/components/dashboard/charts/AppAreaChart";
import AppBarChart from "@/components/dashboard/charts/AppBarChart";
import AppPieChart from "@/components/dashboard/charts/AppPieChart";
import React from "react";

const DashboardPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
        <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
          <AppBarChart />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <CardList title="latestTransactions" />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <AppPieChart />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <ToDoList/>
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
          <AppAreaChart />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <CardList title="popularContent" />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

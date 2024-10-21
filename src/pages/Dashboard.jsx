import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BotStatus from '../components/BotStatus';
import OpenTrades from '../components/OpenTrades';
import { api } from '../App';

const Dashboard = () => {
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: () => api.get('dashboard/').then(res => res.data),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total Profit: ${dashboardData?.totalProfit}</p>
          <p>Active Bots: {dashboardData?.activeBots}</p>
          <p>Open Trades: {dashboardData?.openTrades}</p>
        </CardContent>
      </Card>

      <BotStatus />
      <OpenTrades />

      <style jsx global>{`
        .btn-hover-effect {
          transition: background-color 0.3s ease;
        }
        .btn-hover-effect:hover {
          filter: brightness(110%);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
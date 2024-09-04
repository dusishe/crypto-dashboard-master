import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BotStatus from '../components/BotStatus';
import OpenTrades from '../components/OpenTrades';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      <BotStatus />
      <OpenTrades />
    </div>
  );
};

export default Dashboard;
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // Mock data for open trades
  const openTrades = [
    { id: 1, exchange: 'Binance', entryPrice: 50000, currentPrice: 51000, profit: 100, profitPercentage: 2, position: 1000 },
    { id: 2, exchange: 'Coinbase', entryPrice: 3000, currentPrice: 2950, profit: -50, profitPercentage: -1.67, position: 3000 },
  ];

  const handleCloseTrade = (id) => {
    console.log(`Closing trade with id: ${id}`);
  };

  const handleCloseAllTrades = () => {
    console.log('Closing all trades');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Open Trades</CardTitle>
        </CardHeader>
        <CardContent>
          {openTrades.map((trade) => (
            <div key={trade.id} className="flex justify-between items-center mb-2 p-2 border rounded">
              <div>
                <p>Exchange: {trade.exchange}</p>
                <p>Entry Price: ${trade.entryPrice}</p>
                <p>Current Price: ${trade.currentPrice}</p>
                <p>Profit: ${trade.profit} ({trade.profitPercentage}%)</p>
                <p>Position: ${trade.position}</p>
              </div>
              <Button onClick={() => handleCloseTrade(trade.id)}>Close</Button>
            </div>
          ))}
          <Button onClick={handleCloseAllTrades} className="mt-4">Close All Trades</Button>
        </CardContent>
      </Card>

      {/* Placeholder for other dashboard elements */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Account Balance</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add balance information here */}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-2">
          <Button>Manage API Keys</Button>
          <Button>Configure Telegram Bot</Button>
          <Button>View Statistics</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
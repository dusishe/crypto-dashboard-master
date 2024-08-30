import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayIcon, StopIcon } from 'lucide-react';

const Dashboard = () => {
  // Mock data for open trades
  const [openTrades, setOpenTrades] = useState([
    { id: 1, exchange: 'Binance', pair: 'BTCUSDT', type: 'long', entryPrice: 50000, currentPrice: 51000, profit: 100, profitPercentage: 2, position: 1000 },
    { id: 2, exchange: 'Coinbase', pair: 'ETHUSDT', type: 'short', entryPrice: 3000, currentPrice: 2950, profit: -50, profitPercentage: -1.67, position: 3000 },
  ]);

  // Mock data for bot status
  const [botStatus, setBotStatus] = useState({
    Binance: true,
    Coinbase: false,
  });

  const handleCloseTrade = (id) => {
    console.log(`Closing trade with id: ${id}`);
    setOpenTrades(openTrades.filter(trade => trade.id !== id));
  };

  const handleCloseAllTradesForExchange = (exchange) => {
    console.log(`Closing all trades for ${exchange}`);
    setOpenTrades(openTrades.filter(trade => trade.exchange !== exchange));
  };

  const handleCloseAllTrades = () => {
    console.log('Closing all trades');
    setOpenTrades([]);
  };

  const toggleBotStatus = (exchange) => {
    setBotStatus(prevStatus => ({
      ...prevStatus,
      [exchange]: !prevStatus[exchange]
    }));
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
                <p>Pair: {trade.pair}</p>
                <p className={trade.type === 'long' ? 'text-green-500' : 'text-red-500'}>
                  Type: {trade.type.toUpperCase()}
                </p>
                <p>Entry Price: ${trade.entryPrice}</p>
                <p>Current Price: ${trade.currentPrice}</p>
                <p className={trade.profit >= 0 ? 'text-green-500' : 'text-red-500'}>
                  Profit: ${trade.profit} ({trade.profitPercentage}%)
                </p>
                <p>Position: ${trade.position}</p>
              </div>
              <Button onClick={() => handleCloseTrade(trade.id)} variant="destructive">Close</Button>
            </div>
          ))}
          {Object.keys(botStatus).map(exchange => (
            <Button 
              key={exchange}
              onClick={() => handleCloseAllTradesForExchange(exchange)} 
              className="mt-2 mr-2" 
              variant="destructive"
            >
              Close All Trades on {exchange}
            </Button>
          ))}
          <Button onClick={handleCloseAllTrades} className="mt-2" variant="destructive">Close All Trades</Button>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Bot Status</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(botStatus).map(([exchange, status]) => (
            <div key={exchange} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${status ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>{exchange}: {status ? 'Running' : 'Stopped'}</span>
              </div>
              <Button
                onClick={() => toggleBotStatus(exchange)}
                variant={status ? 'destructive' : 'default'}
                className={status ? 'bg-red-500' : 'bg-green-500'}
              >
                {status ? <StopIcon className="mr-2" /> : <PlayIcon className="mr-2" />}
                {status ? 'Stop' : 'Start'}
              </Button>
            </div>
          ))}
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

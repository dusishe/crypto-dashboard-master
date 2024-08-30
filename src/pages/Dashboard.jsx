import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Square, Moon, Sun } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTheme } from 'next-themes';

const Dashboard = () => {
  const { theme, setTheme } = useTheme();
  const [openTrades, setOpenTrades] = useState([
    { id: 1, exchange: 'Binance', pair: 'BTCUSDT', type: 'long', size: '1.0000', entryPrice: 50000, currentPrice: 51000, profit: 100, profitPercentage: 2, leverage: '10x' },
    { id: 2, exchange: 'Binance', pair: 'BTCUSDT', type: 'short', size: '0.6375', entryPrice: 59052.1, currentPrice: 59049.8, profit: 0.87, profitPercentage: 0.02, leverage: '5x' },
  ]);

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

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={toggleTheme} variant="outline" size="icon">
          {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </div>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Open Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Entry Price</TableHead>
                <TableHead>Market Price</TableHead>
                <TableHead>PNL (USDT)</TableHead>
                <TableHead>PNL (%)</TableHead>
                <TableHead>Leverage</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {openTrades.map((trade) => (
                <TableRow key={trade.id}>
                  <TableCell className={trade.type === 'long' ? 'text-green-500' : 'text-red-500'}>
                    {trade.pair} {trade.type.toUpperCase()}
                  </TableCell>
                  <TableCell>{trade.size}</TableCell>
                  <TableCell>{trade.entryPrice.toFixed(1)}</TableCell>
                  <TableCell>{trade.currentPrice.toFixed(1)}</TableCell>
                  <TableCell className={trade.profit >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {trade.profit.toFixed(2)}
                  </TableCell>
                  <TableCell className={trade.profitPercentage >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {trade.profitPercentage.toFixed(2)}%
                  </TableCell>
                  <TableCell>{trade.leverage}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleCloseTrade(trade.id)} variant="destructive" size="sm">Close</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            {Object.keys(botStatus).map(exchange => (
              <Button 
                key={exchange}
                onClick={() => handleCloseAllTradesForExchange(exchange)} 
                className="mr-2" 
                variant="destructive"
              >
                Close All Trades on {exchange}
              </Button>
            ))}
            <Button onClick={handleCloseAllTrades} variant="destructive">Close All Trades</Button>
          </div>
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
                {status ? <Square className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
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

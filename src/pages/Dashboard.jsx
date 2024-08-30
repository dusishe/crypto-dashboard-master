import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Square } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock API function to fetch open trades
const fetchOpenTrades = async () => {
  // In a real application, this would be an API call
  return [
    { id: 1, exchange: 'Binance', pair: 'BTCUSDT', type: 'long', size: '1.0000', entryPrice: 50000, currentPrice: Math.random() * (52000 - 49000) + 49000, leverage: '10x' },
    { id: 2, exchange: 'Binance', pair: 'ETHUSDT', type: 'short', size: '10.0000', entryPrice: 3000, currentPrice: Math.random() * (3100 - 2900) + 2900, leverage: '5x' },
    { id: 3, exchange: 'Coinbase', pair: 'BTCUSD', type: 'long', size: '0.5000', entryPrice: 51000, currentPrice: Math.random() * (52000 - 49000) + 49000, leverage: '3x' },
  ].map(trade => ({
    ...trade,
    profit: (trade.currentPrice - trade.entryPrice) * (trade.type === 'long' ? 1 : -1) * parseFloat(trade.size),
    profitPercentage: ((trade.currentPrice - trade.entryPrice) / trade.entryPrice) * 100 * (trade.type === 'long' ? 1 : -1),
  }));
};

// Mock API function to fetch trading signals
const fetchTradingSignals = async () => {
  // In a real application, this would be an API call
  return [
    { id: 1, exchange: 'Binance', ticker: 'BTCUSDT', recommendation: 'strong_buy' },
    { id: 2, exchange: 'Binance', ticker: 'ETHUSDT', recommendation: 'sell' },
    { id: 3, exchange: 'Coinbase', ticker: 'BTCUSD', recommendation: 'neutral' },
    { id: 4, exchange: 'Coinbase', ticker: 'ETHUSD', recommendation: 'buy' },
    { id: 5, exchange: 'Binance', ticker: 'ADAUSDT', recommendation: 'strong_sell' },
  ];
};

const Dashboard = () => {
  const { data: openTrades = [], refetch: refetchTrades } = useQuery({
    queryKey: ['openTrades'],
    queryFn: fetchOpenTrades,
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  const { data: tradingSignals = [] } = useQuery({
    queryKey: ['tradingSignals'],
    queryFn: fetchTradingSignals,
    refetchInterval: 60000, // Refetch every minute
  });

  const [botStatus, setBotStatus] = React.useState({
    Binance: true,
    Coinbase: false,
  });

  const handleCloseTrade = async (id) => {
    console.log(`Closing trade with id: ${id}`);
    // In a real application, you would make an API call here
    // After successful API call, refetch the data
    await refetchTrades();
  };

  const handleCloseAllTradesForExchange = async (exchange) => {
    console.log(`Closing all trades for ${exchange}`);
    // In a real application, you would make an API call here
    // After successful API call, refetch the data
    await refetchTrades();
  };

  const handleCloseAllTrades = async () => {
    console.log('Closing all trades');
    // In a real application, you would make an API call here
    // After successful API call, refetch the data
    await refetchTrades();
  };

  const toggleBotStatus = (exchange) => {
    setBotStatus(prevStatus => ({
      ...prevStatus,
      [exchange]: !prevStatus[exchange]
    }));
  };

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'strong_buy': return 'bg-green-500';
      case 'buy': return 'bg-green-300';
      case 'neutral': return 'bg-gray-300';
      case 'sell': return 'bg-red-300';
      case 'strong_sell': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const getRecommendationText = (recommendation) => {
    return recommendation.replace('_', ' ').toUpperCase();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
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
          <CardTitle>Trading Signals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exchange</TableHead>
                <TableHead>Ticker</TableHead>
                <TableHead>Recommendation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tradingSignals.map((signal) => (
                <TableRow key={signal.id}>
                  <TableCell>{signal.exchange}</TableCell>
                  <TableCell>{signal.ticker}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded ${getRecommendationColor(signal.recommendation)} text-white`}>
                      {getRecommendationText(signal.recommendation)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

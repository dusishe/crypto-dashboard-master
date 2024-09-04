import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const fetchOpenTrades = async () => {
  // Simulated API call
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

const OpenTrades = () => {
  const { data: openTrades = [], refetch: refetchTrades } = useQuery({
    queryKey: ['openTrades'],
    queryFn: fetchOpenTrades,
    refetchInterval: 5000, // Refetch every 5 seconds
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

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Open Trades</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Exchange</TableHead>
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
                <TableCell>{trade.exchange}</TableCell>
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
          {['Binance', 'Coinbase'].map(exchange => (
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
  );
};

export default OpenTrades;
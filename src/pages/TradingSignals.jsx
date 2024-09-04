import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const fetchTradingSignals = async () => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, exchange: 'Binance', ticker: 'BTCUSDT', recommendation: 'strong_buy' },
    { id: 2, exchange: 'Binance', ticker: 'ETHUSDT', recommendation: 'sell' },
    { id: 3, exchange: 'Coinbase', ticker: 'BTCUSD', recommendation: 'neutral' },
    { id: 4, exchange: 'Coinbase', ticker: 'ETHUSD', recommendation: 'buy' },
    { id: 5, exchange: 'Binance', ticker: 'ADAUSDT', recommendation: 'strong_sell' },
  ];
};

const TradingSignals = () => {
  const { data: tradingSignals = [], isLoading, error } = useQuery({
    queryKey: ['tradingSignals'],
    queryFn: fetchTradingSignals,
    refetchInterval: 60000, // Refetch every minute
  });

  const getRecommendationStyle = (recommendation) => {
    switch (recommendation) {
      case 'strong_buy': return 'font-bold text-green-600 dark:text-green-400';
      case 'buy': return 'text-green-600 dark:text-green-400';
      case 'neutral': return 'text-black dark:text-white';
      case 'sell': return 'text-red-600 dark:text-red-400';
      case 'strong_sell': return 'font-bold text-red-600 dark:text-red-400';
      default: return 'text-black dark:text-white';
    }
  };

  const getRecommendationText = (recommendation) => {
    return recommendation.replace('_', ' ').toUpperCase();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trading Signals</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Latest Signals</CardTitle>
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
                    <span className={getRecommendationStyle(signal.recommendation)}>
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

export default TradingSignals;
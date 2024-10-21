import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from '../App';

const OpenTrades = () => {
  const queryClient = useQueryClient();

  const { data: openTrades, isLoading, error } = useQuery({
    queryKey: ['openTrades'],
    queryFn: () => api.get('open-trades/').then(res => res.data),
  });

  const closeTradeMutation = useMutation({
    mutationFn: (tradeId) => api.post(`close-trade/${tradeId}/`),
    onSuccess: () => {
      queryClient.invalidateQueries('openTrades');
    },
  });

  const closeAllTradesMutation = useMutation({
    mutationFn: (exchange) => api.post(`close-all-trades/${exchange ? exchange + '/' : ''}`),
    onSuccess: () => {
      queryClient.invalidateQueries('openTrades');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
                  <Button onClick={() => closeTradeMutation.mutate(trade.id)} variant="destructive" size="sm">Close</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          {['Binance', 'Coinbase'].map(exchange => (
            <Button 
              key={exchange}
              onClick={() => closeAllTradesMutation.mutate(exchange)} 
              className="mr-2" 
              variant="destructive"
            >
              Close All Trades on {exchange}
            </Button>
          ))}
          <Button onClick={() => closeAllTradesMutation.mutate()} variant="destructive">Close All Trades</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenTrades;
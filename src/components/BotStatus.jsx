import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Square } from 'lucide-react';
import { api } from '../App';

const BotStatus = () => {
  const queryClient = useQueryClient();

  const { data: botStatus, isLoading, error } = useQuery({
    queryKey: ['botStatus'],
    queryFn: () => api.get('bot-status/').then(res => res.data),
  });

  const toggleBotMutation = useMutation({
    mutationFn: (exchange) => api.post(`bot-toggle/${exchange}/`),
    onSuccess: () => {
      queryClient.invalidateQueries('botStatus');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
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
              onClick={() => toggleBotMutation.mutate(exchange)}
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
  );
};

export default BotStatus;
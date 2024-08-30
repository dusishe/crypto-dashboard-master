import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ApiKeys = () => {
  const [apiKeys, setApiKeys] = useState([
    { id: 1, exchange: 'Binance', key: 'abc123def456', secret: '********', password: '********', mode: 'demo' },
    { id: 2, exchange: 'Coinbase', key: 'xyz789uvw012', secret: '********', password: null, mode: 'live' },
  ]);
  const [newKey, setNewKey] = useState({ exchange: '', key: '', secret: '', password: '', mode: 'demo' });

  const exchanges = ['Binance', 'Coinbase', 'Kraken', 'Bitfinex'];

  const addApiKey = () => {
    setApiKeys([...apiKeys, { ...newKey, id: Date.now() }]);
    setNewKey({ exchange: '', key: '', secret: '', password: '', mode: 'demo' });
  };

  const removeApiKey = (id) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage API Keys</h1>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add New API Key</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select
              value={newKey.exchange}
              onValueChange={(value) => setNewKey({...newKey, exchange: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select exchange" />
              </SelectTrigger>
              <SelectContent>
                {exchanges.map((exchange) => (
                  <SelectItem key={exchange} value={exchange}>{exchange}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="API Key"
              value={newKey.key}
              onChange={(e) => setNewKey({...newKey, key: e.target.value})}
            />
            <Input
              placeholder="API Secret"
              type="password"
              value={newKey.secret}
              onChange={(e) => setNewKey({...newKey, secret: e.target.value})}
            />
            <Input
              placeholder="Password (optional)"
              type="password"
              value={newKey.password}
              onChange={(e) => setNewKey({...newKey, password: e.target.value})}
            />
            <Select
              value={newKey.mode}
              onValueChange={(value) => setNewKey({...newKey, mode: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="demo">Demo</SelectItem>
                <SelectItem value="live">Live</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addApiKey}>Add API Key</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exchange</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>API Secret</TableHead>
                <TableHead>Password</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell>{key.exchange}</TableCell>
                  <TableCell>{key.key.substring(0, 4)}...{key.key.substring(key.key.length - 4)}</TableCell>
                  <TableCell>********</TableCell>
                  <TableCell>{key.password ? '********' : 'N/A'}</TableCell>
                  <TableCell>{key.mode}</TableCell>
                  <TableCell>
                    <Button onClick={() => removeApiKey(key.id)} variant="destructive" size="sm">Remove</Button>
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

export default ApiKeys;

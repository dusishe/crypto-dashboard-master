import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const ApiKeys = () => {
  const [apiKeys, setApiKeys] = useState([
    { id: 1, exchange: 'Binance', key: 'abc123def456', secret: '********', password: '********', status: 'active' },
    { id: 2, exchange: 'Coinbase', key: 'xyz789uvw012', secret: '********', password: null, status: 'inactive' },
  ]);
  const [newKey, setNewKey] = useState({ exchange: '', key: '', secret: '', password: '' });

  const exchanges = ['Binance', 'Coinbase', 'Kraken', 'Bitfinex'];

  const addApiKey = () => {
    const existingActiveKey = apiKeys.find(key => key.exchange === newKey.exchange && key.status === 'active');
    if (existingActiveKey) {
      alert(`There's already an active key for ${newKey.exchange}. Please deactivate it first.`);
      return;
    }
    setApiKeys([...apiKeys, { ...newKey, id: Date.now(), status: 'active' }]);
    setNewKey({ exchange: '', key: '', secret: '', password: '' });
  };

  const toggleKeyStatus = (id) => {
    setApiKeys(apiKeys.map(key => {
      if (key.id === id) {
        const newStatus = key.status === 'active' ? 'inactive' : 'active';
        if (newStatus === 'active') {
          const existingActiveKey = apiKeys.find(k => k.exchange === key.exchange && k.status === 'active');
          if (existingActiveKey) {
            alert(`There's already an active key for ${key.exchange}. Please deactivate it first.`);
            return key;
          }
        }
        return { ...key, status: newStatus };
      }
      return key;
    }));
  };

  const removeApiKey = (id) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-500">Inactive</Badge>;
      case 'error':
        return <Badge className="bg-red-500">Error</Badge>;
      default:
        return null;
    }
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
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell>{key.exchange}</TableCell>
                  <TableCell>{key.key.substring(0, 4)}...{key.key.substring(key.key.length - 4)}</TableCell>
                  <TableCell>********</TableCell>
                  <TableCell>{key.password ? '********' : 'N/A'}</TableCell>
                  <TableCell>{getStatusBadge(key.status)}</TableCell>
                  <TableCell>
                    <Button onClick={() => toggleKeyStatus(key.id)} variant="outline" size="sm" className="mr-2">
                      {key.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
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
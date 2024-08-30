import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ApiKeys = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [newKey, setNewKey] = useState({ exchange: '', key: '', secret: '', mode: 'demo' });

  const addApiKey = () => {
    setApiKeys([...apiKeys, { ...newKey, id: Date.now() }]);
    setNewKey({ exchange: '', key: '', secret: '', mode: 'demo' });
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
            <Input
              placeholder="Exchange"
              value={newKey.exchange}
              onChange={(e) => setNewKey({...newKey, exchange: e.target.value})}
            />
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
          {apiKeys.map((key) => (
            <div key={key.id} className="flex justify-between items-center mb-2 p-2 border rounded">
              <div>
                <p>Exchange: {key.exchange}</p>
                <p>API Key: {key.key.substring(0, 10)}...</p>
                <p>Mode: {key.mode}</p>
              </div>
              <Button onClick={() => removeApiKey(key.id)} variant="destructive">Remove</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeys;
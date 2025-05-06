import React, { useState } from 'react';
import { Box, Paper, Typography, Stack, Divider, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

const COLORS = ['#2ecc40', '#ff4136', '#0074d9', '#b71c1c', '#388e3c', '#8884d8', '#82ca9d'];

interface Trade {
  pl: number;
  entryDate: string;
  symbol: string;
  status: 'WIN' | 'LOSS' | 'OPEN';
  type: 'Buy' | 'Sell';
  platform: string;
}

const getPLData = (trades: Trade[]) => {
  // Sort by date, accumulate P/L
  let pl = 0;
  return trades
    .filter(t => t.pl != null && t.entryDate)
    .sort((a, b) => new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime())
    .map(t => {
      pl += t.pl;
      return { date: t.entryDate, pl, symbol: t.symbol };
    });
};

const getWinLossData = (trades: Trade[]) => [
  { name: 'Win', value: trades.filter(t => t.status === 'WIN').length },
  { name: 'Loss', value: trades.filter(t => t.status === 'LOSS').length },
  { name: 'Open', value: trades.filter(t => t.status === 'OPEN').length },
];

const getTypeData = (trades: Trade[]) => [
  { name: 'Buy', value: trades.filter(t => t.type === 'Buy').length },
  { name: 'Sell', value: trades.filter(t => t.type === 'Sell').length },
];

const getPlatformData = (trades: Trade[]) => {
  const platforms: Record<string, number> = {};
  trades.forEach(t => {
    platforms[t.platform] = (platforms[t.platform] || 0) + 1;
  });
  return Object.entries(platforms).map(([name, value]) => ({ name, value }));
};

const AnalyticsPage: React.FC = () => {
  // Filters
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [platform, setPlatform] = useState('All');
  const [type, setType] = useState('All');

  // Sample trade data
  const trades: Trade[] = [
    {
      pl: 100,
      entryDate: '2024-03-01',
      symbol: 'AAPL',
      status: 'WIN',
      type: 'Buy',
      platform: 'Robinhood'
    },
    {
      pl: -50,
      entryDate: '2024-03-02',
      symbol: 'MSFT',
      status: 'LOSS',
      type: 'Sell',
      platform: 'Fidelity'
    },
    {
      pl: 200,
      entryDate: '2024-03-03',
      symbol: 'GOOGL',
      status: 'WIN',
      type: 'Buy',
      platform: 'Robinhood'
    },
    {
      pl: 75,
      entryDate: '2024-03-04',
      symbol: 'AMZN',
      status: 'WIN',
      type: 'Buy',
      platform: 'Fidelity'
    },
    {
      pl: -25,
      entryDate: '2024-03-05',
      symbol: 'TSLA',
      status: 'LOSS',
      type: 'Sell',
      platform: 'Robinhood'
    }
  ];

  // Filter trades
  const filteredTrades = trades.filter(t => {
    const date = new Date(t.entryDate);
    if (dateFrom && date < dateFrom) return false;
    if (dateTo && date > dateTo) return false;
    if (platform !== 'All' && t.platform !== platform) return false;
    if (type !== 'All' && t.type !== type) return false;
    return true;
  });

  // Chart data
  const plData = getPLData(filteredTrades);
  const winLossData = getWinLossData(filteredTrades);
  const typeData = getTypeData(filteredTrades);
  const platformData = getPlatformData(filteredTrades);

  // Platform/type options
  const platformOptions: string[] = ['All', ...Array.from(new Set(trades.map((t: Trade) => t.platform)))];
  const typeOptions: string[] = ['All', ...Array.from(new Set(trades.map((t: Trade) => t.type)))];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f7fafc 0%, #e3e8ee 100%)', py: 6, display: 'flex', justifyContent: 'center', justifySelf: 'center', width: '100%' }}>
      <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h3" fontWeight={800} sx={{ letterSpacing: '-1px', color: '#222', mb: 2, textAlign: 'center' }}>
          Trade Analytics
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
          Visualize and analyze your trading performance
        </Typography>
        <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4, mb: 4, }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="From"
                value={dateFrom}
                onChange={setDateFrom}
                sx={{ width: 140 }}
              />
              <DatePicker
                label="To"
                value={dateTo}
                onChange={setDateTo}
                sx={{ width: 140 }}
              />
            </LocalizationProvider>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Platform</InputLabel>
              <Select value={platform} label="Platform" onChange={e => setPlatform(e.target.value)}>
                {platformOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Type</InputLabel>
              <Select value={type} label="Type" onChange={e => setType(e.target.value)}>
                {typeOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </Select>
            </FormControl>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center" alignItems="stretch">
            <Paper sx={{ flex: 1, p: 2, borderRadius: 3, minWidth: 320, mb: { xs: 2, md: 0 } }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>P/L Over Time</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={plData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={d => format(new Date(d), 'MMM d')} />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="pl" stroke="#233CB8" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
            <Paper sx={{ flex: 1, p: 2, borderRadius: 3, minWidth: 320, mb: { xs: 2, md: 0 } }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Win/Loss Distribution</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={winLossData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                    {winLossData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center" alignItems="stretch" sx={{ mt: 4 }}>
            <Paper sx={{ flex: 1, p: 2, borderRadius: 3, minWidth: 320, mb: { xs: 2, md: 0 } }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Trade Type Distribution</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={typeData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#388e3c" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
            <Paper sx={{ flex: 1, p: 2, borderRadius: 3, minWidth: 320, mb: { xs: 2, md: 0 } }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Platform Usage</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={platformData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0074d9" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default AnalyticsPage; 
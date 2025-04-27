import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { GridLegacy as Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import SetupTable from './components/SetupTable';
import SetupForm from './components/SetupForm';
import SetupStats from './components/SetupStats';
import SetupInsights from './components/SetupInsights';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1E1E2D',
  color: '#fff',
  padding: theme.spacing(3),
  borderRadius: '12px',
}));

// Mock data for the stats chart
const chartData = [
  { name: 'Consolidation', return: -197 },
  { name: 'Downtrend', return: -197 },
  { name: 'FOMC minutes', return: -197 },
  { name: 'Gap down', return: -197 },
  { name: 'Gap up', return: -197 },
  { name: 'Inflation data', return: -197 },
  { name: 'Jobs data', return: -197 },
  { name: 'Reversal', return: -197 },
  { name: 'Uptrend', return: -197 },
];

// Mock data for insights
const insightsData = {
  title: 'Impact of 28% on your net return with $794 profits at 2PM',
  date: 'Mar 19 - Apr 11, 2025',
  description: 'Trades at 2PM have potential. Those trades have represented a total percentage change of 28% on your overall account. Bringing you an average winning net return of $158.80. Averaging $124.31 more than the rest of your trades. There are 5 trades on this range.',
  stats: {
    avgReturn: '$158.80',
    winRate: '80%',
    trades: 5,
  },
};

interface Setup {
  id: number;
  name: string;
  description: string;
  successRate: string;
  frequency: string;
  lastUsed: string;
}

const Setups = () => {
  const [setups, setSetups] = useState<Setup[]>([
    {
      id: 1,
      name: 'Bull Flag',
      description: 'Price consolidation after an uptrend',
      successRate: '75%',
      frequency: 'High',
      lastUsed: '2024-04-25',
    },
    {
      id: 2,
      name: 'Head and Shoulders',
      description: 'Reversal pattern with three peaks',
      successRate: '68%',
      frequency: 'Medium',
      lastUsed: '2024-04-24',
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSetup, setEditingSetup] = useState<Setup | null>(null);

  const handleEditClick = (id: number) => {
    const setup = setups.find((s) => s.id === id);
    if (setup) {
      setEditingSetup(setup);
      setIsFormOpen(true);
    }
  };

  const handleDeleteClick = (id: number) => {
    setSetups((prev) => prev.filter((setup) => setup.id !== id));
  };

  const handleFormSubmit = (formData: Omit<Setup, 'id' | 'lastUsed'>) => {
    if (editingSetup) {
      setSetups((prev) =>
        prev.map((setup) =>
          setup.id === editingSetup.id
            ? { ...setup, ...formData }
            : setup
        )
      );
    } else {
      const newSetup: Setup = {
        ...formData,
        id: Math.max(...setups.map((s) => s.id), 0) + 1,
        lastUsed: new Date().toISOString().split('T')[0],
      };
      setSetups((prev) => [...prev, newSetup]);
    }
    setIsFormOpen(false);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#121212', minHeight: '100vh' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#fff' }}>
          Trading Setups
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Chart Section */}
        <Grid item xs={12} md={8}>
          <SetupStats data={chartData} />
        </Grid>

        {/* Insights Section */}
        <Grid item xs={12} md={4}>
          <SetupInsights data={insightsData} />
        </Grid>

        {/* Table Section */}
        <Grid item xs={12}>
          <StyledPaper>
            <SetupTable
              setups={setups}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </StyledPaper>
        </Grid>
      </Grid>

      <SetupForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingSetup || undefined}
        isEditing={!!editingSetup}
      />
    </Box>
  );
};

export default Setups; 
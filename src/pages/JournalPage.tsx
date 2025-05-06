import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  TablePagination,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import JournalCalendar from '../components/JournalCalendar';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const baseTrades = [
  {
    status: 'WIN',
    symbol: 'AAPL',
    type: 'Buy',
    entryPrice: 170.52,
    exitPrice: 175.23,
    pl: 47.10,
    platform: 'TradingView',
    entryDate: 'Jul 15, 2023',
  },
  {
    status: 'WIN',
    symbol: 'TSLA',
    type: 'Sell',
    entryPrice: 245.78,
    exitPrice: 230.45,
    pl: 76.65,
    platform: 'ThinkorSwim',
    entryDate: 'Jul 14, 2023',
  },
  {
    status: 'OPEN',
    symbol: 'NVDA',
    type: 'Buy',
    entryPrice: 423.56,
    exitPrice: null,
    pl: null,
    platform: 'MetaTrader',
    entryDate: 'Jul 12, 2023',
  },
  {
    status: 'LOSS',
    symbol: 'AMZN',
    type: 'Buy',
    entryPrice: 132.45,
    exitPrice: 130.25,
    pl: -33.00,
    platform: 'TradingView',
    entryDate: 'Jul 10, 2023',
  },
  {
    status: 'WIN',
    symbol: 'MSFT',
    type: 'Buy',
    entryPrice: 338.12,
    exitPrice: 342.66,
    pl: 36.32,
    platform: 'ThinkorSwim',
    entryDate: 'Jul 8, 2023',
  },
  {
    status: 'WIN',
    symbol: 'META',
    type: 'Sell',
    entryPrice: 293.84,
    exitPrice: 287.22,
    pl: 46.34,
    platform: 'TradingView',
    entryDate: 'Jul 7, 2023',
  },
  {
    status: 'OPEN',
    symbol: 'GOOGL',
    type: 'Buy',
    entryPrice: 122.21,
    exitPrice: null,
    pl: null,
    platform: 'MetaTrader',
    entryDate: 'Jul 5, 2023',
  },
];

const dummyTrades = Array.from({ length: 50 }, (_, i) => ({
  ...baseTrades[i % baseTrades.length],
  id: i + 1,
}));

const statusColor = (status: string) => {
  switch (status) {
    case 'WIN': return 'success';
    case 'LOSS': return 'error';
    case 'OPEN': return 'info';
    default: return 'default';
  }
};

const typeColor = (type: string) => {
  switch (type) {
    case 'Buy': return 'success';
    case 'Sell': return 'error';
    default: return 'default';
  }
};

const JournalPage: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuRow, setMenuRow] = useState<number | null>(null);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [calendarDate, setCalendarDate] = useState<Date | null>(new Date());

  const handleTabChange = (_: any, newValue: number) => setTab(newValue);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setMenuRow(id);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRow(null);
  };
  const handleChangePage = (_: any, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter logic (simple symbol filter)
  const filteredTrades = dummyTrades.filter(trade =>
    trade.symbol.toLowerCase().includes(filter.toLowerCase())
  );
  const paginatedTrades = filteredTrades.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f7fafc 0%, #e3e8ee 100%)', py: { xs: 2, sm: 4, md: 6 }, display: 'flex', justifyContent: 'center', width: 1 }}>
      <Container maxWidth="md" sx={{ px: { xs: 0.5, sm: 2 }, }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 2, sm: 4 } }}>
          <Typography variant="h3" fontWeight={800} sx={{ letterSpacing: '-1px', color: '#222', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
            Trading Journal
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1, fontSize: { xs: '1rem', sm: '1.15rem' } }}>
            Track, analyze, and journal your trading activity
          </Typography>
          <Divider sx={{ width: 80, mx: 'auto', my: 2, bgcolor: 'primary.main', height: 4, borderRadius: 2 }} />
        </Box>
        <Paper
          elevation={6}
          sx={{
            p: { xs: 1, sm: 2, md: 4 },
            borderRadius: 4,
            background: '#f4f6fa',
            boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10)',
            width: 'auto',
            justifySelf: 'center',
            maxWidth: 1400,
          }}
        >
          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant={isMobile ? 'fullWidth' : 'scrollable'}
            scrollButtons={isMobile ? false : 'auto'}
            sx={{
              mb: 3,
              minHeight: 0,
              '& .MuiTab-root': {
                fontWeight: 700,
                fontSize: { xs: '0.9rem', sm: '0.95rem' },
                px: { xs: 0.5, sm: 3 },
                minHeight: 0,
                py: { xs: 0.7, sm: 1 },
              },
              '& .MuiTabs-indicator': { height: 4, borderRadius: 2, bgcolor: 'primary.main' },
            }}
          >
            <Tab label="All Trades" />
            <Tab label="Open Positions" />
            <Tab label="Closed Trades" />
            <Tab label="Calendar View" />
          </Tabs>
          {tab === 3 ? (
            <Box sx={{ mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Jump to date"
                  value={calendarDate}
                  onChange={newDate => setCalendarDate(newDate ?? new Date())}
                  views={["year", "month", "day"]}
                  sx={{ mb: 2, width: 220 }}
                />
              </LocalizationProvider>
              <JournalCalendar trades={dummyTrades} date={calendarDate ?? new Date()} />
            </Box>
          ) : (
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 3 }}
            >
              <TextField
                placeholder="Filter by symbol..."
                value={filter}
                onChange={e => setFilter(e.target.value)}
                size="small"
                sx={{
                  minWidth: { xs: '90%', sm: 180 },
                  maxWidth: { xs: 120, sm: 100 },
                  borderRadius: 2,
                  background: '#f4f6fa',
                  '& .MuiInputBase-root': { borderRadius: 2, fontSize: { xs: '0.9rem', sm: '1rem' }, py: { xs: 0.5, sm: 1 } },
                  width: { xs: '70vw', sm: 'auto' },
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
                InputProps={{
                  startAdornment: (
                    <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>
                      <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="9" stroke="#888" strokeWidth="2"/><path d="M15 15l-3-3" stroke="#888" strokeWidth="2" strokeLinecap="round"/></svg>
                    </Box>
                  ),
                }}
              />
              <Stack direction={{ xs: 'row', sm: 'row' }} spacing={1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                <Button
                  variant="outlined"
                  startIcon={<CloudUploadIcon sx={{ fontSize: { xs: 18, sm: 22 } }} />}
                  size="small"
                  sx={{
                    borderRadius: 2,
                    fontWeight: 700,
                    bgcolor: '#f4f6fa',
                    '&:hover': { bgcolor: '#e3e8ee' },
                    width: { xs: '100%', sm: 'auto' },
                    maxWidth: {  sm: 220 },
                    fontSize: { xs: '0.9rem', sm: '0.9rem' },
                    py: { xs: 0.7, sm: 1 },
                    px: { xs: 2, sm: 2 },
        
                    minHeight: 36,
                    flex: { xs: 1, sm: 'unset' },
                  }}
                >
                  Import CSV
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddIcon sx={{ fontSize: { xs: 18, sm: 22 } }} />}
                  size="small"
                  sx={{
                    borderRadius: 2,
                    fontWeight: 700,
                    bgcolor: '#222',
                    color: '#fff',
                    boxShadow: 2,
                    '&:hover': { bgcolor: '#111', boxShadow: 4 },
                    width: { xs: '100%', sm: 'auto' },
                    maxWidth: { sm: 220 },
                    fontSize: { xs: '0.9rem', sm: '0.9rem' },
                    py: { xs: 0.7, sm: 1 },
                    px: { xs: 2, sm: 2 },
                    minHeight: 36,
                    flex: { xs: 1, sm: 'unset' },
                  }}
                >
                  Log Trade
                </Button>
              </Stack>
            </Stack>
          )}
          {isMobile ? (
            <Stack spacing={2} sx={{ width: '100%' }}>
              {paginatedTrades.map((row) => (
                <Card key={row.id} sx={{ borderRadius: 3, boxShadow: '0 2px 8px 0 rgba(31,38,135,0.06)' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Chip
                        label={row.status}
                        color={statusColor(row.status)}
                        size="small"
                        sx={{ fontWeight: 700, px: 1.5, color: '#fff', fontSize: '0.9rem', letterSpacing: 1, minWidth: 60, textAlign: 'center', bgcolor:
                          row.status === 'WIN' ? '#2ecc40' : row.status === 'LOSS' ? '#ff4136' : row.status === 'OPEN' ? '#0074d9' : undefined }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{row.symbol}</Typography>
                      <Chip
                        label={row.type}
                        color={typeColor(row.type)}
                        size="small"
                        sx={{ fontWeight: 700, px: 1.5, color: '#fff', fontSize: '0.9rem', letterSpacing: 1, bgcolor: row.type === 'Buy' ? '#388e3c' : '#b71c1c' }}
                      />
                      <Box flex={1} />
                      <IconButton size="small" onClick={e => handleMenuOpen(e, row.id)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && menuRow === row.id}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      >
                        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                      </Menu>
                    </Stack>
                    <Divider sx={{ my: 1 }} />
                    <Stack direction="row" spacing={2} flexWrap="wrap">
                      <Typography variant="body2"><strong>Entry:</strong> ${row.entryPrice?.toFixed(2)}</Typography>
                      <Typography variant="body2"><strong>Exit:</strong> {row.exitPrice !== null ? `$${row.exitPrice.toFixed(2)}` : '-'}</Typography>
                      <Typography variant="body2" sx={{ color: row.pl == null ? 'inherit' : row.pl > 0 ? '#2ecc40' : row.pl < 0 ? '#ff4136' : 'text.primary' }}>
                        <strong>P/L:</strong> {row.pl == null ? '-' : row.pl > 0 ? `+$${row.pl.toFixed(2)}` : `-$${Math.abs(row.pl).toFixed(2)}`}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mt: 1 }}>
                      <Typography variant="body2"><strong>Platform:</strong> {row.platform}</Typography>
                      <Typography variant="body2"><strong>Date:</strong> {row.entryDate}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                <TablePagination
                  component="div"
                  count={filteredTrades.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[50]}
                  labelRowsPerPage="Rows per page:"
                />
              </Box>
            </Stack>
          ) : (
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
              <TableContainer sx={{ borderRadius: 3, boxShadow: '0 2px 8px 0 rgba(31,38,135,0.06)', minWidth: { xs: 600, sm: 600, md: 0, lg: 900, xl: 1200 } }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ background: '#f4f6fa' }}>
                      <TableCell sx={{ fontWeight: 700, fontSize: { xs: '0.8rem', sm: '1rem' } }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: { xs: '0.8rem', sm: '1rem' } }}>Symbol</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: { xs: '0.8rem', sm: '1rem' } }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: { xs: '0.8rem', sm: '1rem' } }}>Entry Price</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: { xs: '0.8rem', sm: '1rem' } }}>Exit Price</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: { xs: '0.8rem', sm: '1rem' } }}>P/L</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: { xs: '0.8rem', sm: '1rem' } }}>Platform</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: { xs: '0.8rem', sm: '1rem' } }}>Entry Date</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, fontSize: { xs: '0.8rem', sm: '1rem' } }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedTrades.map((row, idx) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          background: idx % 2 === 0 ? '#fff' : '#f7fafd',
                          transition: 'background 0.2s',
                          '&:hover': { background: '#e3e8ee' },
                        }}
                      >
                        <TableCell>
                          <Chip
                            label={row.status}
                            color={statusColor(row.status)}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              px: 1.5,
                              bgcolor:
                                row.status === 'WIN'
                                  ? '#2ecc40'
                                  : row.status === 'LOSS'
                                  ? '#ff4136'
                                  : row.status === 'OPEN'
                                  ? '#0074d9'
                                  : undefined,
                              color: '#fff',
                              fontSize: '0.9rem',
                              letterSpacing: 1,
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>{row.symbol}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.type}
                            color={typeColor(row.type)}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              px: 1.5,
                              bgcolor: row.type === 'Buy' ? '#388e3c' : '#b71c1c',
                              color: '#fff',
                              fontSize: '0.9rem',
                              letterSpacing: 1,
                            }}
                          />
                        </TableCell>
                        <TableCell>${row.entryPrice?.toFixed(2)}</TableCell>
                        <TableCell>{row.exitPrice !== null ? `$${row.exitPrice.toFixed(2)}` : '-'}</TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            color:
                              row.pl == null
                                ? 'inherit'
                                : row.pl > 0
                                ? '#2ecc40'
                                : row.pl < 0
                                ? '#ff4136'
                                : 'text.primary',
                            bgcolor:
                              row.pl == null
                                ? 'inherit'
                                : row.pl > 0
                                ? 'rgba(46,204,64,0.08)'
                                : row.pl < 0
                                ? 'rgba(255,65,54,0.08)'
                                : 'inherit',
                          }}
                        >
                          {row.pl == null
                            ? '-'
                            : row.pl > 0
                            ? `+$${row.pl.toFixed(2)}`
                            : `-$${Math.abs(row.pl).toFixed(2)}`}
                        </TableCell>
                        <TableCell>{row.platform}</TableCell>
                        <TableCell>{row.entryDate}</TableCell>
                        <TableCell align="right">
                          <IconButton size="small" onClick={e => handleMenuOpen(e, row.id)}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl) && menuRow === row.id}
                            onClose={handleMenuClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            slotProps={{
                             paper:{ elevation: 6,
                              sx: {
                                bgcolor: '#232336',
                                color: '#fff',
                                borderRadius: 2,
                                boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
                                border: '1px solid #292945',
                              },}
                            }}
                          >
                            <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                  <TablePagination
                    component="div"
                    count={filteredTrades.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[50]}
                    labelRowsPerPage="Rows per page:"
                  />
                </Box>
              </TableContainer>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default JournalPage; 
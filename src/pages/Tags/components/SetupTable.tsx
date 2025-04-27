import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TableHeader = styled(TableHead)({
  backgroundColor: '#F8F9FA',
});

const StyledTableCell = styled(TableCell)({
  fontWeight: 600,
  color: '#1E1E2D',
});

const ActionCell = styled(TableCell)({
  width: '120px',
});

interface Setup {
  id: number;
  name: string;
  description: string;
  successRate: string;
  frequency: string;
  lastUsed: string;
}

interface SetupTableProps {
  setups: Setup[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const SetupTable: React.FC<SetupTableProps> = ({ setups, onEdit, onDelete }) => {
  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell align="center">Success Rate</StyledTableCell>
            <StyledTableCell align="center">Frequency</StyledTableCell>
            <StyledTableCell align="center">Last Used</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {setups.map((setup) => (
            <TableRow key={setup.id} hover>
              <TableCell>{setup.name}</TableCell>
              <TableCell>{setup.description}</TableCell>
              <TableCell align="center">{setup.successRate}</TableCell>
              <TableCell align="center">{setup.frequency}</TableCell>
              <TableCell align="center">{setup.lastUsed}</TableCell>
              <ActionCell align="center">
                <Tooltip title="Edit">
                  <IconButton size="small" sx={{ mr: 1 }} onClick={() => onEdit(setup.id)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton size="small" color="error" onClick={() => onDelete(setup.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </ActionCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SetupTable; 
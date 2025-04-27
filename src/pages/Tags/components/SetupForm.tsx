import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
} from '@mui/material';

interface SetupFormData {
  name: string;
  description: string;
  successRate: string;
  frequency: string;
}

interface SetupFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: SetupFormData) => void;
  initialData?: SetupFormData;
  isEditing?: boolean;
}

const frequencies = ['High', 'Medium', 'Low'];

const SetupForm: React.FC<SetupFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  isEditing,
}) => {
  const [formData, setFormData] = React.useState<SetupFormData>(
    initialData || {
      name: '',
      description: '',
      successRate: '',
      frequency: '',
    }
  );

  const handleChange = (field: keyof SetupFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditing ? 'Edit Setup' : 'Add New Setup'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={handleChange('name')}
              required
              fullWidth
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={handleChange('description')}
              multiline
              rows={3}
              required
              fullWidth
            />
            <TextField
              label="Success Rate"
              value={formData.successRate}
              onChange={handleChange('successRate')}
              type="number"
              InputProps={{
                inputProps: { min: 0, max: 100 },
                endAdornment: '%',
              }}
              required
              fullWidth
            />
            <TextField
              label="Frequency"
              value={formData.frequency}
              onChange={handleChange('frequency')}
              select
              required
              fullWidth
            >
              {frequencies.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {isEditing ? 'Save Changes' : 'Add Setup'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SetupForm; 
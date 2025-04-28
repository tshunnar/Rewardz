import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography 
} from '@mui/material';
import { Reward } from '../types';

interface ConfirmationDialogProps {
  open: boolean;
  reward: Reward | null;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ 
  open, 
  reward, 
  onClose, 
  onConfirm 
}) => {
  if (!reward) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Redemption</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to redeem "{reward.title}" for {reward.cost} points?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
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

interface RedemptionSuccessDialogProps {
  open: boolean;
  reward: Reward | null;
  onClose: () => void;
}

const RedemptionSuccessDialog: React.FC<RedemptionSuccessDialogProps> = ({ 
  open, 
  reward, 
  onClose
}) => {
  if (!reward) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Redemption Successful!</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          You have successfully redeemed "{reward.title}" for {reward.cost} points.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RedemptionSuccessDialog;
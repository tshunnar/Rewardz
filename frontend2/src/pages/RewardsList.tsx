import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Typography, 
  Pagination, 
  Box, 
  CircularProgress, 
  Alert 
} from '@mui/material';
import { getRewards, createRedemption, getUserById } from '../api';
import { Reward } from '../types';
import RewardCard from '../components/RewardCard';
import ConfirmationDialog from '../components/ConfirmationDialog';
import RedemptionSuccessDialog from '../components/RedemptionSuccessDialog';
import { useAuth } from '../context/AuthContext';

const RewardsList: React.FC = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const { user, updateUser } = useAuth();

  useEffect(() => {
    fetchRewards();
  }, [page]);

  const fetchRewards = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRewards(page);
      setRewards(data.rewards);
    } catch (err) {
      setError('Failed to load rewards. Please try again.');
      console.error('Error fetching rewards:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleRedeemClick = (rewardId: number) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (reward) {
      setSelectedReward(reward);
      setConfirmDialogOpen(true);
    }
  };

  const handleConfirmRedeem = async () => {
    if (!selectedReward || !user) return;
    
    setConfirmDialogOpen(false);
    
    try {
      // Check if user has enough points
      if (user.points_balance < selectedReward.cost) {
        setError('Not enough points to redeem this reward.');
        return;
      }
      
      await createRedemption(user.id, selectedReward.id);
      
      // Update user's points balance
      const updatedUser = await getUserById(user.id);
      updateUser(updatedUser);
      
      setSuccessDialogOpen(true);
    } catch (err) {
      setError('Failed to redeem reward. Please try again.');
      console.error('Error redeeming reward:', err);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Rewards
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {rewards.map((reward) => (
              <Grid item xs={12} sm={6} md={4} key={reward.id}>
                <RewardCard 
                  reward={reward} 
                  onRedeem={handleRedeemClick} 
                />
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination 
              count={10} // This would typically come from the API
              page={page} 
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
      
      <ConfirmationDialog
        open={confirmDialogOpen}
        reward={selectedReward}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleConfirmRedeem}
      />
      
      <RedemptionSuccessDialog
        open={successDialogOpen}
        reward={selectedReward}
        onClose={() => setSuccessDialogOpen(false)}
      />
    </Box>
  );
};

export default RewardsList;
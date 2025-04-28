import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Divider, 
  CircularProgress, 
  Alert,
  CardMedia
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getRewardById, createRedemption, getUserById } from '../api';
import { Reward } from '../types';
import ConfirmationDialog from '../components/ConfirmationDialog';
import RedemptionSuccessDialog from '../components/RedemptionSuccessDialog';
import { useAuth } from '../context/AuthContext';

const RewardDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [reward, setReward] = useState<Reward | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchReward(parseInt(id));
    }
  }, [id]);

  const fetchReward = async (rewardId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRewardById(rewardId);
      setReward(data);
    } catch (err) {
      setError('Failed to load reward details. Please try again.');
      console.error('Error fetching reward:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeemClick = () => {
    if (reward) {
      setConfirmDialogOpen(true);
    }
  };

  const handleConfirmRedeem = async () => {
    if (!reward || !user) return;
    
    setConfirmDialogOpen(false);
    
    try {
      // Check if user has enough points
      if (user.points_balance < reward.cost) {
        setError('Not enough points to redeem this reward.');
        return;
      }
      
      await createRedemption(user.id, reward.id);
      
      // Update user points balance
      const updatedUser = await getUserById(user.id);
      updateUser(updatedUser);
      
      setSuccessDialogOpen(true);
    } catch (err) {
      setError('Failed to redeem reward. Please try again.');
      console.error('Error redeeming reward:', err);
    }
  };

  const handleSuccessDialogClose = () => {
    setSuccessDialogOpen(false);
    navigate('/');
  };

  // Placeholder image URL when no image is available
  const placeholderImage = 'https://via.placeholder.com/600x300?text=No+Image+Available';

  return (
    <Box>
      <Button 
        variant="outlined" 
        onClick={() => navigate('/')} 
        sx={{ mb: 3 }}
      >
        Back to Rewards
      </Button>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : reward ? (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <CardMedia
            component="img"
            height="300"
            image={placeholderImage}
            alt={reward.title}
            sx={{ borderRadius: 1, mb: 3 }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="h1">
              {reward.title}
            </Typography>
            <Typography variant="h6" component="div" sx={{ 
              backgroundColor: 'primary.main',
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 'medium'
            }}>
              {reward.cost} points
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="body1" paragraph>
            {reward.description}
          </Typography>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              size="large" 
              onClick={handleRedeemClick}
              disabled={user && user.points_balance < reward.cost}
            >
              Redeem Now
            </Button>
          </Box>
          
          {user && user.points_balance < reward.cost && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              You need {reward.cost - user.points_balance} more points to redeem this reward.
            </Alert>
          )}
        </Paper>
      ) : (
        <Alert severity="error">Reward not found</Alert>
      )}
      
      <ConfirmationDialog
        open={confirmDialogOpen}
        reward={reward}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleConfirmRedeem}
      />
      
      <RedemptionSuccessDialog
        open={successDialogOpen}
        reward={reward}
        onClose={handleSuccessDialogClose}
      />
    </Box>
  );
};

export default RewardDetails;
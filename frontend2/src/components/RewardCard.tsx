import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Reward } from '../types';

interface RewardCardProps {
  reward: Reward;
  onRedeem: (rewardId: number) => void;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, onRedeem }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/rewards/${reward.id}`);
  };

  const handleRedeemClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRedeem(reward.id);
  };

  const placeholderImage = 'https://via.placeholder.com/300x200?text=No+Image+Available';

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={placeholderImage}
        alt={reward.title}
        onClick={handleCardClick}
        sx={{ cursor: 'pointer' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h6" component="div">
          {reward.title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
          <Typography variant="body2" color="text.secondary" sx={{ 
            backgroundColor: 'primary.light',
            color: 'primary.contrastText',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            display: 'inline-block'
          }}>
            {reward.cost} points
          </Typography>
          <Button 
            size="small" 
            variant="contained" 
            onClick={handleRedeemClick}
          >
            Redeem
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RewardCard;
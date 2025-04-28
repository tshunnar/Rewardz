import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Divider, 
  CircularProgress, 
  Alert,
  List,
  ListItem,
  ListItemText,
  Pagination
} from '@mui/material';
import { getUserRedemptions } from '../api';
import { useAuth } from '../context/AuthContext';
import { Redemption } from '../types';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (user) {
      fetchRedemptions();
    }
  }, [user, page]);

  const fetchRedemptions = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await getUserRedemptions(user.id, page);
      setRedemptions(data.redemptions);
    } catch (err) {
      setError('Failed to load redemption history. Please try again.');
      console.error('Error fetching redemptions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (!user) return null;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        My Profile
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Box sx={{ display: 'grid', gap: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Name
            </Typography>
            <Typography variant="body1">
              {user.name}
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body1">
              {user.email}
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Points Balance
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                display: 'inline-block',
                backgroundColor: 'primary.main',
                color: 'white',
                px: 2,
                py: 0.5,
                borderRadius: 1,
                mt: 0.5
              }}
            >
              {user.points_balance} points
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Redemption History
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : redemptions.length > 0 ? (
          <>
            <List>
              {redemptions.map((redemption) => (
                <ListItem 
                  key={redemption.id}
                  divider
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    py: 2
                  }}
                >
                  <ListItemText
                    primary={redemption.reward?.title}
                    secondary={new Date(redemption.created_at).toLocaleDateString()}
                  />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      backgroundColor: 'primary.light',
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      ml: 2
                    }}
                  >
                    {redemption.redemption_cost} points
                  </Typography>
                </ListItem>
              ))}
            </List>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination 
                count={10}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            No redemptions yet
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default UserProfile;
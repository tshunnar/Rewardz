import axios from 'axios';
import { User, Reward, Redemption, RegisterFormData } from '../types';

const API_URL = 'http://localhost:5678/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getRewards = async (page = 1) => {
  const response = await api.get<{ rewards: Reward[] }>(`/v1/rewards?page=${page}`);
  return response.data;
};

export const getRewardById = async (id: number) => {
  const response = await api.get<Reward>(`/v1/rewards/${id}`);
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await api.get<User>(`/v1/users/${id}`);
  return response.data;
};

export const getUserByEmail = async (email: string) => {
  const response = await api.get<User>(`/v1/users/byemail?email=${email}`);
  return response.data;
};

export const createUser = async (userData: RegisterFormData) => {
  const response = await api.post<User>('/v1/users', userData);
  return response.data;
};

export const getUserRedemptions = async (userId: number, page = 1) => {
  const response = await api.get<{ redemptions: Redemption[] }>(`/v1/users/${userId}/redemptions?page=${page}`);
  return response.data;
};

export const createRedemption = async (userId: number, rewardId: number) => {
  const response = await api.post<Redemption>('/v1/redemptions', {
    user_id: userId,
    reward_id: rewardId,
  });
  return response.data;
};
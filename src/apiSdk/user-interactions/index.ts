import axios from 'axios';
import queryString from 'query-string';
import { UserInteractionInterface, UserInteractionGetQueryInterface } from 'interfaces/user-interaction';
import { GetQueryInterface } from '../../interfaces';

export const getUserInteractions = async (query?: UserInteractionGetQueryInterface) => {
  const response = await axios.get(`/api/user-interactions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createUserInteraction = async (userInteraction: UserInteractionInterface) => {
  const response = await axios.post('/api/user-interactions', userInteraction);
  return response.data;
};

export const updateUserInteractionById = async (id: string, userInteraction: UserInteractionInterface) => {
  const response = await axios.put(`/api/user-interactions/${id}`, userInteraction);
  return response.data;
};

export const getUserInteractionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/user-interactions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUserInteractionById = async (id: string) => {
  const response = await axios.delete(`/api/user-interactions/${id}`);
  return response.data;
};

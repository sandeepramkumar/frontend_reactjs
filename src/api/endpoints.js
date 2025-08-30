import { API_CONFIG } from './apiConfig';

const { BASE_URL } = API_CONFIG;

export const ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  USERS: `${BASE_URL}/users`,
  USER_BY_ID: (id) => `${BASE_URL}/users/${id}`,
  POSTS: `${BASE_URL}/posts`,
  POST_BY_ID: (id) => `${BASE_URL}/posts/${id}`,
};
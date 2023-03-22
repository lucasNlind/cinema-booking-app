import axios from 'axios';
import jwt_decode from 'jwt-decode';

const register = async (newUser) => {
  const response = await axios.post(`http://localhost:3001/api/auth/register`, newUser);
  return response.data;
};
  
const login = async (user) => {
  const response = await axios.post(`http://localhost:3001/api/auth/login`, user);
  if (response.data) {
    localStorage.setItem('jwt', JSON.stringify(response.data));
    const decodedJwt = jwt_decode(response.data.token);
    localStorage.setItem('user', JSON.stringify(decodedJwt.user));
    return { jwt: response.data, user: decodedJwt.user };
  }
  return { jwt: response.data, user: null };
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('jwt');
};

const changePassword = async (user) => {
  const changePasswordInstance = axios.create({
    baseURL: `http://localhost:3001/api`,
    headers: { 'Authorization': 'Bearer ' + user.jwt }
  });
  const response = await changePasswordInstance.patch('/auth/change-password', { email: user.email, newPassword: user.password });
  return response.data;
}

const resetPassword = async (email) => {
  const response = await axios.patch('http://localhost:3001/api/auth/reset-password', { email });
  return response.data;
}

const updateUserProfile = async (newUserData) => {
  const response = await axios.post('http://localhost:3001/api/auth/update-profile', { newUserData });
  return response.data;
}

const verifyEmail = async (activationCode, email) => {
  const response = await axios.post('http://localhost:3001/api/auth/verify-email', { activationCode, email });
  return response.data;
}

const verifyJwt = async (jwt) => {
  const response = await axios.post(`http://localhost:3001/api/auth/verify-jwt`, { jwt });
  if (response.data) {
    const jwtExpirationMs = response.data.exp * 1000;
    return jwtExpirationMs > Date.now();
  }
  return false;
};

const authService = {
  login,
  logout,
  register,
  verifyEmail,
  verifyJwt,
  changePassword,
  resetPassword,
  updateUserProfile
};

export default authService;

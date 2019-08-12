const host = "http://193.124.114.46:3001";
const apiProtectedPath = "api/protected";

export const registration = () => ([host, 'users'].join('/'));

export const login = () => [host, 'sessions/create'].join('/');

export const transactions = () => [host, apiProtectedPath, 'transactions'].join('/');

export const userInfo = () => [host, apiProtectedPath, 'user-info'].join('/');

export const usersList = () => [host, apiProtectedPath, 'users/list'].join('/')

const host = "http://193.124.114.46:3001";
const apiProtectedPath = "api/protected";

export registration = () => [host, 'users'].join('/');

export login = () => [host, 'sessions/create'].join('/');

export transactions = () => [host, apiProtectedPath, 'transactions'].join('/');

export userInfo = () => [host, apiProtectedPath, 'user-info']

export usersList = () => [host, apiProtectedPath, 'users/list'].join('/')

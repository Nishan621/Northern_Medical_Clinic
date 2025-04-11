import { useEffect, useState } from 'react';
import { getToken } from '../utils/auth';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!getToken());
  }, []);

  return isAuthenticated;
};

export default useAuth;

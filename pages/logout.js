import axios from 'axios';
import Router from 'next/router';
import { useEffect } from 'react';
const Logout = () => {
  useEffect(async () => {
    if (typeof window !== 'undefined') {
      try {
        await axios.post('/api/logout', {}, { withCredentials: true });
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        Router.push('/');
      } catch (error) {
        console.log(error.response);
      }
    }
  }, []);
  return <h1>Logging Out....</h1>;
};

export default Logout;

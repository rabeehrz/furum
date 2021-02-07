import axios from 'axios';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  if (req.method === 'POST') {
    console.log('IN HERE');
    try {
      const { email, password, name, phone } = req.body;
      const register = await axios.post('http://rabeeh.me:9999/auth/register', {
        email,
        password,
        name,
        phone,
      });

      const cookies = new Cookies(req, res);
      cookies.set('token', register.data.token, {
        httpOnly: true,
        sameSite: 'lax',
      });

      cookies.set('user', JSON.stringify(register.data.user), {
        httpOnly: true,
        sameSite: 'lax',
      });

      res.json(register.data);
    } catch (error) {
      console.log('ERRR', error);
      res.status(400).json({ error });
    }
  } else {
    res.status(400).send('OOPS');
  }
};

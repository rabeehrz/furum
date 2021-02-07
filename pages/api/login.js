import axios from 'axios';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  if (req.method === 'POST') {
    console.log('IN HERE');
    try {
      const { email, password } = req.body;
      const login = await axios.post('http://rabeeh.me:9999/auth/login', {
        email,
        password,
      });
      const tokenData = jwt.decode(login.data.token);
      const cookies = new Cookies(req, res);
      cookies.set('token', login.data.token, {
        httpOnly: true,
        sameSite: 'lax',
      });

      cookies.set('user', JSON.stringify(login.data.user), {
        httpOnly: true,
        sameSite: 'lax',
      });

      res.json(login.data);
    } catch (error) {
      console.log(error.data);
      res.status(400).send(error.data);
    }
  } else {
    res.status(400).send('OOPS');
  }
};

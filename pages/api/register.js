import axios from 'axios';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password, name, phone } = req.body;
    const register = await axios.post('http://rabeeh.me:9999/auth/register', {
      email,
      password,
      name,
      phone,
    });
    const tokenData = jwt.decode(register.data.token);
    const cookies = new Cookies(req, res);
    cookies.set('token', register.data.token, {
      httpOnly: true,
      sameSite: 'lax',
    });

    cookies.set('user', JSON.stringify(login.data.user), {
      httpOnly: true,
      sameSite: 'lax',
    });

    res.json(register.data);
    try {
    } catch (error) {
      console.log(error.data);
      res.status(400).send();
    }
  } else {
    res.status(400).send();
  }
};

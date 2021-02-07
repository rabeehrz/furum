import Cookies from 'cookies';
const Logout = (req, res) => {
  const cookies = new Cookies(req, res);
  cookies.set('token', '', {
    expires: Date.now(),
    httpOnly: true,
    sameSite: 'lax',
  });
  cookies.set('user', '', {
    expires: Date.now(),
    httpOnly: true,
    sameSite: 'lax',
  });
  res.send('OK');
};

export default Logout;

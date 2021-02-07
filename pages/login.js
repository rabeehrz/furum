import { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    setError('');
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { email, password });
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
      }
      Router.push('/');
    } catch (error) {
      console.log(error);
      setError('Incorrct username or password');
      return;
    }
  };
  return (
    <Layout>
      <div className="w-full h-full flex items-center justify-center flex-col space-y-4">
        <h1 className="text-3xl text-gray-800 font-bold">Login to Furum</h1>
        {error && (
          <div className="my-2 p-4 border border-red-500 bg-red-100 text-red-500 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-gray-800 font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="bruce@batman.com"
              className="mb-4 p-2 block rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-gray-800 font-bold">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 p-2 block rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <span className="block text-green-500 hover:text-green-600 hover:underline">
              <Link href="/register">
                <a>Create an account</a>
              </Link>
            </span>
            <button className="text-white bg-green-500 hover:bg-green-400 p-2 rounded mt-4 px-4 font-bold">
              Login
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;

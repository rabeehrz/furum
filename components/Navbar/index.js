import Link from 'next/link';
import { useState, useEffect } from 'react';
const Navbar = () => {
  const [user, setUser] = useState({});
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('user')) {
        setUser(JSON.parse(localStorage.getItem('user')));
        setLogged(true);
      }
    }
  }, []);

  return (
    <div className="w-full flex items-center px-4 py-4 justify-between">
      <Link href="/">
        <a>
          <h1 className="font-mono text-2xl font-bold text-green-400">Furum</h1>
        </a>
      </Link>
      {!logged && (
        <div className="flex space-x-4">
          <Link href="/login">
            <a>
              <h1 className="text-md rounded p-1 px-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-white">
                Login
              </h1>
            </a>
          </Link>
          <Link href="/register">
            <a>
              <h1 className="text-md rounded p-1 px-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-white">
                Register
              </h1>
            </a>
          </Link>
        </div>
      )}

      {logged && (
        <div className="flex space-x-4 items-center">
          <span className="font-bold, text-md text-green-500">
            Welcome, {user.name}
          </span>
          <Link href="/logout">
            <a>
              <h1 className="text-md rounded p-1 px-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-white">
                Logout
              </h1>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;

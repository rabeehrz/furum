import axios from 'axios';
import Layout from '../components/Layout';
import UserForms from '../components/Home/UserForms';
import Link from 'next/link';
import cookies from 'next-cookies';

const Home = ({ forms, logged }) => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    console.log(JSON.parse(user));
  }
  if (!logged) {
    return (
      <Layout>
        <div className="flex items-center justify-start flex-col">
          <div className="text-center">
            <h1 className="text-6xl text-green-500 font-bold">
              <span className="text-gray-800">Create</span> and{' '}
              <span className="text-gray-800">share</span> forms with ease!
            </h1>
            <Link href="/login">
              <button className="mt-8 text-xl rounded-md hover:text-white hover:bg-green-500 border-2 border-green-500 text-green-500 font-bold text-center p-3">
                Get Started!
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-green-500">Your Forms</h1>
        <Link href="/create">
          <a className="flex items-center ml-2 text-green-500 hover:text-green-400 hover:underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="h-5 w-5"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Create a form</span>
          </a>
        </Link>
      </div>
      <UserForms forms={forms} />
    </Layout>
  );
};

export async function getServerSideProps({ params, req }) {
  let data,
    logged = false;
  const allCookies = cookies({ req });
  try {
    const response = await axios.get(
      `http://localhost:9999/form/user/${allCookies.user.id}`,
      {
        headers: {
          Authorization: allCookies.token,
        },
      },
    );
    data = response.data;
    logged = true;
  } catch (error) {
    console.log(error);
    return {
      props: {
        forms: {},
        logged,
      },
    };
  }
  console.log(logged);
  return {
    props: { forms: data, logged },
  };
}

export default Home;

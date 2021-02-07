import { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import FormEditor from '../../components/FormEditor';
import CreateFormSuccess from '../../components/CreateFormSuccess';
import cookies from 'next-cookies';

const FormCreate = ({ Component, pageProps }) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');

  if (success) {
    return (
      <Layout>
        <CreateFormSuccess id={success} />
      </Layout>
    );
  }

  const updateForm = (newState) => {
    setForm(newState);
  };
  const validateForm = () => {
    let newErrors = [];
    if (!form.title) {
      console.log('Hereee');
      newErrors.push('Please give a title');
    }

    if (!form.description) {
      newErrors.push('Please give a description');
    }

    if (!form.questions || form.questions.length < 1) {
      newErrors.push('Atleast one question is required.');
    }

    form.questions.forEach((question) => {
      if (!question.content) {
        newErrors.push('Please fill out all the question title.');
      }
      if (
        ['select', 'checkbox', 'radio'].includes(question.type) &&
        (!question.data ||
          !question.data.options ||
          question.data.options.length < 1)
      ) {
        newErrors.push(
          `Provide atleast one option for question ${question.content}`,
        );
      }
    });
    setErrors(newErrors);
  };

  const submitForm = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    validateForm();
    if (errors.length > 0) return;
    try {
      // Get userId from memory.
      const payloadData = {
        ...form,
        graded: false,
        userId: user.id,
      };
      const response = await axios.post(
        'http://localhost:9999/form',
        payloadData,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      console.log(response);
      setSuccess(response.data.id);
    } catch (error) {
      setErrors(['An unknown error occured. Did you fill the form correctly?']);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl text-gray-800 font-bold">Create a Form</h1>

      <FormEditor updateParentState={updateForm} />
      {errors.length > 0 && (
        <div className="w-full my-2 p-4 border border-red-500 bg-red-100 text-red-500 rounded">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={submitForm}
        className="text-white bg-blue-500 hover:bg-blue-400 p-2 rounded mt-4 px-4"
      >
        Create Form
      </button>
    </Layout>
  );
};

export async function getServerSideProps({ params, req, res }) {
  try {
    const allCookies = cookies({ req });
    if (!allCookies.token || !allCookies.user) {
      throw new Error('Not Logged In');
    }
  } catch (error) {
    if (res) {
      res.writeHead(302, { Location: '/login' });
      res.end();
    }
  }

  return {
    props: {},
  };
}

export default FormCreate;

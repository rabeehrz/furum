import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Layout from '../../components/Layout';
import FormEditor from '../../components/FormEditor';
import NotFound from '../../components/NotFound';
import cookies from 'next-cookies';

const FormEdit = ({ editForm, notFound, id }) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  if (notFound) {
    return (
      <Layout>
        <NotFound />
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

    form.questions.forEach((question, index) => {
      if (question.id) {
        delete question.id;
      }
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
      form.questions[index] = question;
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
      let payloadData = {
        ...form,
        graded: false,
        userId: user.id,
      };
      delete payloadData.id;
      console.log(payloadData);
      const response = await axios.patch(
        `http://localhost:9999/form/${id}`,
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
      console.log(error);
      setErrors(['An unknown error occured. Did you fill the form correctly?']);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl mb-4 text-gray-800 font-bold">Edit Form</h1>

      <h3 className="text-md text-green-500">
        Share this form:
        <Link href={`/form/${id}`}>
          <a className="underline"> https://localhost:9999/form/{id}</a>
        </Link>
      </h3>

      <FormEditor form={editForm} updateParentState={updateForm} />
      {errors.length > 0 && (
        <div className="w-full my-2 p-4 border border-red-500 bg-red-100 text-red-500 rounded">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {success && (
        <div className="w-full my-2 p-4 border border-green-500 bg-green-100 text-green-500 rounded">
          <p>Changes has been saved successfully</p>
        </div>
      )}
      <button
        onClick={submitForm}
        className="text-white bg-blue-500 hover:bg-blue-400 p-2 rounded mt-4 px-4"
      >
        Save Changes
      </button>
    </Layout>
  );
};

export async function getServerSideProps({ params, req }) {
  let data;
  try {
    const allCookies = cookies({ req });
    if (!allCookies.token || !allCookies.user) {
      throw new Error('Not Logged In');
    }
    const response = await axios.get(`http://localhost:9999/form/${params.id}`);
    data = response.data;
    if (data.userId !== allCookies.user.id) throw new Error('No permission');
  } catch (error) {
    return {
      props: {
        editForm: {},
        notFound: true,
      },
    };
  }

  return {
    props: { editForm: data, notFound: false, id: params.id },
  };
}

export default FormEdit;

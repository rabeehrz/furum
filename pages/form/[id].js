import { useState, useRef } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import Text from '../../components/Form/Text';
import Radio from '../../components/Form/Radio';
import Checkbox from '../../components/Form/Checkbox';
import Select from '../../components/Form/Select';
import Submit from '../../components/Form/Submit';
import ResponseSuccess from '../../components/Form/ResponseSuccess';
import NotFound from '../../components/NotFound';

const Form = ({ form, notFound }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const responses = useRef([]);
  if (notFound) {
    return (
      <Layout>
        <NotFound />
      </Layout>
    );
  }

  if (success) {
    return (
      <Layout>
        <ResponseSuccess />
      </Layout>
    );
  }

  const updateResponse = (responseData) => {
    const alreadyExists = responses.current.findIndex(
      (element) => element.questionId === responseData.questionId,
    );
    if (alreadyExists === -1) {
      responses.current.push(responseData);
    } else {
      responses.current[alreadyExists] = responseData;
    }
    console.log(responses.current);
  };

  const handleSubmit = async (event) => {
    // If user exists, add userId
    event.preventDefault();
    try {
      const respond = await axios.post('http://rabeeh.me:9999/response', {
        formId: form.id,
        responses: responses.current,
      });
      console.log(respond);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl">{form.title}</h1>
        <p className="mt-2">{form.description}</p>
      </div>
      <form id={form.id} onSubmit={handleSubmit}>
        {form.questions.map((question) => {
          if (['text', 'number', 'email'].includes(question.type)) {
            return (
              <Text
                key={question.id}
                question={question}
                update={updateResponse}
              />
            );
          }

          if (question.type === 'radio') {
            return (
              <Radio
                key={question.id}
                question={question}
                update={updateResponse}
              />
            );
          }

          if (question.type === 'checkbox') {
            return (
              <Checkbox
                key={question.id}
                question={question}
                update={updateResponse}
              />
            );
          }

          if (question.type === 'select') {
            return (
              <Select
                key={question.id}
                question={question}
                update={updateResponse}
              />
            );
          }
        })}
        {error && (
          <p className="text-red-500 mt-2">
            An error has occured. Did you fill the form correctly?
          </p>
        )}
        <Submit />
      </form>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  let data;
  try {
    const response = await axios.get(`http://rabeeh.me:9999/form/${params.id}`);
    data = response.data;
  } catch (error) {
    return {
      props: {
        form: {},
        notFound: true,
      },
    };
  }
  return {
    props: { form: data, notFound: false },
  };
}

export default Form;

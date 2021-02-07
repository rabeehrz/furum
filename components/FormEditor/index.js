import { useState, useReducer, useEffect } from 'react';
import FormElement from './FormElement';

const questionReducer = (questions, action) => {
  switch (action.type) {
    case 'add':
      return [
        ...questions,
        {
          type: 'text',
          required: true,
          content: 'Question',
        },
      ];
    case 'delete':
      const newQuestions = questions.filter(
        (value, currentIndex) => currentIndex !== action.payload.index,
      );
      return newQuestions;
    case 'update':
      const updateQuestions = [...questions];
      updateQuestions[action.payload.index] = action.payload.data;
      return updateQuestions;
    case 'force':
      return action.payload.data;
    default:
      return questions;
  }
};

const FormEditor = ({ form, updateParentState }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, dispatchQuestions] = useReducer(questionReducer, [
    {
      type: 'text',
      required: true,
      content: 'What is your Name?',
    },
  ]);

  useEffect(() => {
    if (form) {
      dispatchQuestions({ type: 'force', payload: { data: form.questions } });
      setTitle(form.title);
      setDescription(form.description);
    }
  }, []);

  useEffect(() => {
    updateParentState({ title, description, questions });
  }, [title, description, questions]);

  return (
    <div className="mt-4 flex flex-col space-y-4">
      <div>
        <span className="text-lg text-gray-800 font-bold">Title</span>
        <input
          type="text"
          maxLength="500"
          defaultValue={form ? form.title : ''}
          onChange={(event) => setTitle(event.target.value)}
          className="p-2 block rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <span className="text-lg text-gray-800 font-bold">Description</span>
        <textarea
          maxLength="500"
          defaultValue={form ? form.description : ''}
          onChange={(event) => setDescription(event.target.value)}
          className="mt-1 block w-3/5 rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
        ></textarea>
      </div>

      <span className="text-lg text-gray-800 font-bold">Form Elements</span>

      {questions.map((question, index) => (
        <FormElement
          key={index}
          question={question}
          dispatch={dispatchQuestions}
          elementIndex={index}
        />
      ))}

      <button className="w-1/5 flex items-center justify-center cursor-pointer bg-green-500 hover:bg-green-400 p-2 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 text-white"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clipRule="evenodd"
          />
        </svg>
        <span
          className="text-white"
          onClick={() => dispatchQuestions({ type: 'add' })}
        >
          Add an Element
        </span>
      </button>
    </div>
  );
};

export default FormEditor;

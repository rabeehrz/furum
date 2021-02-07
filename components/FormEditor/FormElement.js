import { useState, useEffect } from 'react';

const FormElement = ({ question, dispatch, elementIndex }) => {
  const [type, setType] = useState(question.type);
  const [options, setOptions] = useState(['Option 1']);
  const [optionValue, setOptionValue] = useState('');

  useEffect(() => {
    if (question.data && question.data.options) {
      setOptions(question.data.options);
    }
  }, []);

  useEffect(() => {
    const data = {
      ...question,
      type,
    };
    if (!['select', 'radio', 'checkbox'].includes(type) && data.options) {
      delete data.data.options;
    }
    dispatch({ type: 'update', payload: { index: elementIndex, data } });
  }, [type]);

  useEffect(() => {
    if (['select', 'radio', 'checkbox'].includes(type)) {
      const data = {
        ...question,
        data: { options },
      };

      dispatch({ type: 'update', payload: { index: elementIndex, data } });
    } else {
      const data = {
        type: question.type,
        required: question.required,
        content: question.content,
      };

      dispatch({ type: 'update', payload: { index: elementIndex, data } });
    }
  }, [options]);

  const handleQuestion = (event) => {
    const data = {
      ...question,
      content: event.target.value,
    };
    dispatch({ type: 'update', payload: { index: elementIndex, data } });
  };

  const handleRequired = (event) => {
    const data = {
      ...question,
      required: event.target.checked,
    };
    dispatch({ type: 'update', payload: { index: elementIndex, data } });
  };

  return (
    <div className="w-full p-4 shadow-md mb-4 rounded border-l-2 border-green-500">
      <div className="flex flex-row justify-between items-center ">
        <input
          type="text"
          name="content"
          placeholder="Question"
          defaultValue={question.content}
          onChange={handleQuestion}
          className="mt-0 w-3/5 block px-0.5 border-0 border-b-2 border-green-200 focus:ring-0 focus:border-green-500"
        />

        <select
          onChange={(event) => setType(event.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="email">Email</option>
          <option value="select">Dropdown</option>
          <option value="radio">Multiple Choice</option>
          <option value="checkbox">Checkboxes</option>
        </select>

        <div className="flex items-center space-x-1">
          <input
            type="checkbox"
            name="required"
            defaultChecked={question.required}
            onChange={handleRequired}
            className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
          <span>Required</span>
        </div>
      </div>
      {['select', 'radio', 'checkbox'].includes(type) && (
        <div className="mt-4">
          <ul className="flex flex-col space-y-3">
            {options.map((option, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span>
                  {index + 1}. {option}
                </span>
                <button
                  className="cursor-pointer rounded hover:bg-gray-200"
                  onClick={() => {
                    setOptions((prevOptions) =>
                      prevOptions.filter(
                        (value, currentIndex) => index !== currentIndex,
                      ),
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-8 h-8 text-red-500 p-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex space-x-2">
            <input
              type="text"
              name="content"
              placeholder="Add Option"
              className="mt-0 w-1/5 block px-0.5 border-0 border-b-2 border-green-200 focus:ring-0 focus:border-green-500"
              onChange={(event) => setOptionValue(event.target.value)}
            />
            <span
              className="text-green-500 mt-4 flex cursor-pointer hover:bg-gray-200 w-1/8 p-2 rounded"
              onClick={() => {
                if (optionValue)
                  setOptions((prevOptions) => prevOptions.concat(optionValue));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Add</span>
            </span>
          </div>
        </div>
      )}
      <div className="flex justify-end items-center mt-4">
        <span
          className="ml-auto cursor-pointer rounded hover:bg-gray-200"
          onClick={() => {
            dispatch({ type: 'delete', payload: { index: elementIndex } });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8 text-red-500 p-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default FormElement;

import { useState } from 'react';
import FormCard from './FormCard';

const Radio = ({ question, update }) => {
  const [selection, setSelection] = useState('');

  const handleChange = (event) => {
    setSelection(event.target.value);
    update({
      questionId: question.id,
      data: {
        text: event.target.value,
      },
    });
  };

  return (
    <FormCard content={question.content} required={question.required}>
      {question.data.options.map((option) => {
        return (
          <div className="flex items-center" key={option}>
            <input
              name={question.id}
              value={option}
              type={question.type}
              required={question.required}
              checked={selection === option}
              onChange={handleChange}
              className="border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            />
            <span className="ml-2">{option}</span>
          </div>
        );
      })}
      {!question.required && (
        <button
          type="button"
          className="mt-4 rounded bg-green-500 font-bold text-white p-2 text-sm"
          onClick={() => {
            setSelection('');
          }}
        >
          CLEAR SELECTION
        </button>
      )}
    </FormCard>
  );
};

export default Radio;

import { useState, useEffect } from 'react';
import FormCard from './FormCard';

const Select = ({ question, formId, update }) => {
  const handleChange = (event) => {
    update({
      questionId: question.id,
      data: {
        text: event.target.value,
      },
    });
  };

  useEffect(() => {
    update({
      questionId: question.id,
      data: {
        text: question.data.options[0],
      },
    });
  }, []);

  return (
    <FormCard content={question.content} required={question.required}>
      <select
        htmlFor={formId}
        name={question.id}
        className="rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
        required={question.required}
        onChange={handleChange}
      >
        {question.data.options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </FormCard>
  );
};

export default Select;

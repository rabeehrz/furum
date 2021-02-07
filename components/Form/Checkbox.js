import { useState, useEffect, useRef } from 'react';
import FormCard from './FormCard';

const Checkbox = ({ question, update }) => {
  const [selection, setSelection] = useState({});
  const choices = useRef(new Set());
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    setSelection((prevSelection) => ({
      ...prevSelection,
      [value]: checked,
    }));

    if (checked) {
      choices.current.add(value);
    } else {
      choices.current.delete(value);
    }
    update({
      questionId: question.id,
      data: {
        choices: [...choices.current],
      },
    });
  };

  useEffect(() => {
    const displayError = true;
    if (question.required) {
      const values = Object.values(selection);
      if (values.length > 0 && !values.includes(true)) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }, [selection]);

  return (
    <FormCard content={question.content} required={question.required}>
      {question.data.options.map((option) => {
        return (
          <div className="flex items-center" key={option}>
            <input
              name={question.id}
              value={option}
              type={question.type}
              onChange={handleChange}
              className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            />
            <span className="ml-2">{option}</span>
          </div>
        );
      })}
      {error && (
        <p className="text-red-500 mt-2">Please select atleast on option</p>
      )}
    </FormCard>
  );
};

export default Checkbox;

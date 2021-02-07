import FormCard from './FormCard';

const Text = ({ question, update }) => {
  const handleChange = (event) => {
    console.log('HEree');
    update({
      questionId: question.id,
      data: {
        text: event.target.value,
      },
    });
  };

  return (
    <FormCard content={question.content} required={question.required}>
      <input
        name={question.id}
        type={question.type}
        required={question.required}
        placeholder={
          question.type.charAt(0).toUpperCase() + question.type.slice(1)
        }
        onChange={handleChange}
        className="p-2 block rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
      />
    </FormCard>
  );
};

export default Text;

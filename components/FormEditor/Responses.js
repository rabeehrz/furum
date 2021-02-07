const ResponseCard = ({ item, index }) => {
  return (
    <div className="mt-2">
      <h1 className="text-lg font-bold text-gray-800">Question {index + 1}</h1>
      {item.data.text && (
        <p className="text-md font-gray-800">Answer: {item.data.text}</p>
      )}
      {item.data.choices && (
        <p className="text-md font-gray-800">
          Answer: {item.data.choices.join(', ')}
        </p>
      )}
    </div>
  );
};

const Responses = ({ items }) => {
  console.log('ITMES', items);
  return (
    <div className="mt-2">
      <p className="font-bold text-lg">Total responses: {items.length}</p>
      {items.map((item, index) => (
        <div key={index} className="shadow-md p-4 mt-4">
          <h1 className="text-xl font-bold text-gray-800">
            Response #{index + 1}
          </h1>
          {item.responses.map((response, index) => {
            return <ResponseCard item={response} index={index} />;
          })}
        </div>
      ))}
    </div>
  );
};

export default Responses;

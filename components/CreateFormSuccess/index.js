const CreateFormSuccess = ({ id }) => {
  // TODO: CHANGE
  return (
    <div className="flex justify-center w-full">
      <h1 className="text-green-500 text-2xl">
        Your form has been created successfully. You can share the form using
        the following link:
        <a href={`/form/${id}`}>{`http://rabeeh.me:3000/form/${id}`}</a>
      </h1>
    </div>
  );
};

export default CreateFormSuccess;

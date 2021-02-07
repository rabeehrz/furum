const FormCard = ({ content, required, children }) => {
  return (
    <div className="w-full p-4 shadow-md mb-4">
      <h1 className="text-xl mb-4">
        {content} {required ? <span className="text-red-500">*</span> : ''}
      </h1>
      {children}
    </div>
  );
};

export default FormCard;

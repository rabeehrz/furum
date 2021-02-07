import Link from 'next/link';
const FormCard = ({ text }) => {
  return (
    <div className="float-left mt-4 w-3/12 h-48 flex flex-col rounded shadow-md mx-4">
      <div className="flex-grow bg-green-500 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-white w-28 h-28"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <p className="block p-4 text-center font-bold">{text}</p>
    </div>
  );
};

const UserForms = ({ forms }) => {
  // console.log(forms);
  return (
    <div>
      {forms.map((form, index) => (
        <Link href={`/edit/${form.id}`}>
          <a>
            <FormCard text={form.title} />
          </a>
        </Link>
      ))}
    </div>
  );
};

export default UserForms;

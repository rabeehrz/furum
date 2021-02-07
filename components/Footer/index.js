const Footer = () => {
  return (
    <div className="w-full flex items-center justify-center px-4 py-4">
      <a href="https://github.com/rabeehrz" target="_blank">
        <h1 className="text-green-400 flex items-center">
          <span>Created with</span>
          <span className="inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 mx-1 text-green-500"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span>by rabeehrz</span>
        </h1>
      </a>
    </div>
  );
};

export default Footer;

import Navbar from '../Navbar';
import Footer from '../Footer';

const Layout = ({ children }) => {
  return (
    <div className="w-3/5 min-h-screen mx-auto flex flex-col">
      <Navbar />
      <div className="flex-grow p-8">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

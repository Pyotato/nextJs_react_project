import Navbar from "components/Navbar";
import Footer from "components/Footer";
import ActiveResource from "./ActiveResource";

const Layout = ({ children }) => (
  <>
    <Navbar />
    <ActiveResource />
    {children}
    <Footer />
  </>
);
export default Layout;

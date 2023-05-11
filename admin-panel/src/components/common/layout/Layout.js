import Panel from "../../pages/home/Panel/Panel";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {/* <Panel children={children}/> */}
      {children}
      <Footer />
    </>
  );
};

export default Layout;

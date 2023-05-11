import Theme from "./components/UI/Theme";
import ProductGrid from "./components/pages/home/ProductGrid/ProductGrid";
import UpdateProduct from "./components/pages/home/ProductGrid/UpdateProduct/UpdateProduct";
import Routes from "./routes/Routes";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
const App = () => {
  return (
    <Theme>
   <Routes />
    {/* <Routes> */}
      {/* <Route exact path='/' element={<ProductGrid/>} />
      <Route path='/update-product' element={<UpdateProduct />} /> */}
    {/* </Routes> */}
    </Theme>
  );
};

export default App;

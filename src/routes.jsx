import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/home";
import Product from "./Pages/product";
import Auth from "./Pages/auth";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/products"} element={<Product />} />
        <Route path={"/auth"} element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

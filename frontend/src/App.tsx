import { Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import Header from "./components/Header";
import Register from "./pages/Register";


function App() {
  return (
    <>
      <Header />
  
      <Routes>
        <Route
          path="/"
          element={<ProductList />}
        />
  
        <Route
          path="/products/:productId"
          element={<ProductDetail />}
        />
  
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>
    </>
  );
}

export default App;
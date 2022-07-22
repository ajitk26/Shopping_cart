import { BrowserRouter, Routes,Route} from 'react-router-dom';
import './App.css';
import Header from "./components/Header.js";
import Home from "./components/Home.js";
import Cart from "./components/Cart.js";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} exact/>
        <Route path="/Cart" element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

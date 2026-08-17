import './App.css';
import Navigation from './Components/Navigation/Navigation';
import HomePage from './Components/Pages/HomePage';
import Footer from './Components/Footer/Footer';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import MenPage from './Components/Pages/MenPage';
import WomenPage from './Components/Pages/WomenPage';
import DropPage from './Components/Pages/DropPage';
import AboutPage from './Components/Pages/AboutPage';
import LacePage from './Components/Pages/LacePage';
import PersonPage from './Components/Pages/PersonPage';
import CartPage from './Components/Pages/CartPages';
import ProductDetail from './Components/Pages/ProductDetail'
function App() {
  return (
    <div className="" >
      <Navigation/>
        <div>
          <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/men" element={<MenPage/>}/>
          <Route path="/menShoes" element={<MenPage/>}/>
          <Route path="/women" element={<WomenPage/>}/>
          <Route path="/womenSneakers" element={<WomenPage/>}/>
          <Route path="/womenRunning" element={<WomenPage/>}/>
          <Route path="/drop" element={<DropPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/lace" element={<LacePage/>}/>
          <Route path="/person" element={<PersonPage/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/product/:id" element={<ProductDetail/>}/>
          </Routes>
        </div>
        <Footer/>  
    </div>
  );
}

export default App;

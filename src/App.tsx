import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter as Router, Routes,Route,Link } from 'react-router-dom';
import Login from './pages/users/Login';
import Register from './pages/users/Register';
import Top from './pages/Top';
import Cart from './pages/products/Cart';
import MembersInfoEdit from './pages/users/MembersInfoEdit';
import Favorite from './pages/products/Favorite';
import Histry from './pages/products/Histry';
import ProductDetail from './pages/products/ProductDetail';
import ProductRegistration from './pages/products/ProductRegistration';
import PurchaseConfirmation from './pages/products/PurchaseConfirmation';
import ErrPage from './pages/404';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Top />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/membersinfoedit' element={<MembersInfoEdit />}></Route>
        <Route path='/favorite' element={<Favorite />}></Route>
        <Route path='/histry' element={<Histry />}></Route>
        <Route path='productdetail/:id' element={<ProductDetail />}></Route>
        <Route path='/productregistration' element={<ProductRegistration />}></Route>
        <Route path='/purchaseconfirmation' element={<PurchaseConfirmation />}></Route>
        <Route path='*' element={<ErrPage />}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App

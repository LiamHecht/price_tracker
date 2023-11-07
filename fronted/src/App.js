import { BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';
import Home from './pages/home'
import About from './pages/about'
import Products from './pages/prodcuts'
import ProductPage from './components/test'
export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/products' element={<Products />}></Route>


      </Routes>
      </BrowserRouter>
    </div>
  )
}
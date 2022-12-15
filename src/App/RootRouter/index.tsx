import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../Components/header';
import Main from '../../Pages/Main';
import Product from '../../Pages/Product';
import ShoppingCart from '../../Pages/ShoppingCart';

// Компонент который осуществляет роутинг по страницам SPA,
// header вынесен из роутов,то он будет постоянным
// Можно сдеать каждому компоненту к которому мы роутим свой хедер внутри компонента,
// если нам нужен индивидуальный хедер на каждой страницы или убрать где-то хедер

export default function RootRouter() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
    </div>
  );
}

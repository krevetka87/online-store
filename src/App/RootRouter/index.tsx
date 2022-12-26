import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../Components/header';
import Main from '../../Pages/Main';
import Product from '../../Pages/Product';
import Error from '../../Pages/Error';
import ShoppingCart from '../../Pages/ShoppingCart';
import Modal from '../../Components/Modal/Modal';
import { ICartItem } from '../../types';
import Footer from '../../Components/Footer/Footer';

export default function RootRouter() {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const [headerCartCount, setHeaderCartCount] = useState<number>(0);
  const [headerCartSum, setHeaderCartSum] = useState<number>(0);

  function renderHeaderInfo(): void {
    const json: string | null = localStorage.getItem('cart_@vFKSQ');
    if (json) {
      const array: ICartItem[] = JSON.parse(json);
      const count: number = array
        .map((item: ICartItem) => item.count)
        .reduce((a: number, b: number) => a + b, 0);
      setHeaderCartCount(count);
      const sum: number = array.reduce((a: number, b: ICartItem) => a + b.count * b.price, 0);
      setHeaderCartSum(sum);
    }
  }

  useEffect(() => {
    renderHeaderInfo();
  }, []);

  return (
    <><>
      <Header headerCartCount={headerCartCount} headerCartSum={headerCartSum} />
      <Routes>
        <Route path="/" element={<Main headerRender={() => renderHeaderInfo()} />} />
        <Route path="/product/:id" element={<Product headerRender={() => renderHeaderInfo()} setModalVisible={setModalVisible} />} />
        <Route path="/shopping-cart" element={<ShoppingCart headerRender={() => renderHeaderInfo()} setModalVisible={setModalVisible} />} />
      </Routes>
      <Modal className={isModalVisible ? 'modal visible' : 'modal'} setModalVisible={setModalVisible} />
    </><main className="main">
        <Routes>
          <Route path="/" element={<Main headerRender={() => renderHeaderInfo()} />} />
          <Route path="/product/:id" element={<Product headerRender={() => renderHeaderInfo()} />} />
          <Route path="/shopping-cart" element={<ShoppingCart headerRender={() => renderHeaderInfo()} />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main><Footer /></>
    </>
  );
}

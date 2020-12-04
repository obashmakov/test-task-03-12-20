import React, { useState } from 'react';
import { Header } from './components/Header';
import { Photos } from './components/Photos';
import { Modal } from './components/Modal';
import { Footer } from './components/Footer';
import './App.scss';

export const App = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [imgId, setImgId] = useState(null);

  return (
    <div className="content">
      <div className="content__container">
        <Header />
        <Photos
          setIsModalActive={setIsModalActive}
          setImgId={setImgId}
        />
        <Modal
          isModalActive={isModalActive}
          imgId={imgId}
          setIsModalActive={setIsModalActive}
        />
        <Footer />
      </div>
    </div>
  );
};

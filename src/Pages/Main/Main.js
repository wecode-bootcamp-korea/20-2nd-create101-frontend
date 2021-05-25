import React, { Component } from 'react';
import ClassCardList from '../../Components/ClassCard/ClassCardList';
import Nav from '../../Components/Nav/Nav';
import MainCarousel from './Components/MainCarousel/MainCarousel';

function Main() {
  return (
    <div>
      <MainCarousel />
      <ClassCardList />
    </div>
  );
}

export default Main;

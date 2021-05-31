import React, { Component } from 'react';
import ClassCardList from '../../Components/ClassCard/ClassCardList';
import ClassCard from '../../Components/ClassCard/ClassCard';

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

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ClassCard from '../../../Components/ClassCard/ClassCard';

function CategoryCards(props) {
  return (
    <div>
      <Cards>
        {props.currentPosts.map((componentData, index) => {
          return <ClassCard key={index} componentData={componentData} />;
        })}
      </Cards>
    </div>
  );
}

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default CategoryCards;

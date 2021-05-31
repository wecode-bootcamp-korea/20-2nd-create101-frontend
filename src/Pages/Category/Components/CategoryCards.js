import React from 'react';
import styled from 'styled-components';
import ClassCard from '../../../Components/ClassCard/ClassCard';

function CategoryCards(props) {
  return (
    <div>
      <Cards>
        {props.currentPosts.map((componentData, index) => {
          return <ClassCard key={index} componentData={componentData} left />;
        })}
      </Cards>
    </div>
  );
}

const Cards = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px;
`;

export default CategoryCards;

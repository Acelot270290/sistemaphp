import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  margin: 10px;
  text-align: center;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.div`
  font-size: 1em;
  color: #333;
`;

const CardValue = styled.div`
  font-size: 2em;
  margin: 20px 0;
`;

const CardTimeFrame = styled.div`
  font-size: 0.8em;
  color: #666;
`;

function Card({ title, value, timeFrame }) {
    return (
        <CardContainer>
            <CardTitle>{title}</CardTitle>
            <CardValue>{value}</CardValue>
            <CardTimeFrame>{timeFrame}</CardTimeFrame>
        </CardContainer>
    );
}

export default Card;

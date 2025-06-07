import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  overflow: hidden;
`;

const Title = styled.h1`
  color: white;
`;

const Gallery = () => {
  return (
    <Container>
      <Title>Gallery Page</Title>
    </Container>
  );
};

export default Gallery;

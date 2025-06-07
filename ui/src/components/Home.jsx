import React from "react";
import styled from "styled-components";
import FileUploader from './FileUploader';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
`;

const Home = () => {
  return (
    <>
    <Container>
      {/* <Title>Welcome to the Home Page</Title> */}
    </Container>
    <div className="file-upload">
      <FileUploader />
    </div>
    </>
  );
};

export default Home;

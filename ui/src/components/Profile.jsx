// import React from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { auth } from "./firebase"; // Import Firebase auth
// import { signOut } from "firebase/auth"; // Import signOut method

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   height: 90vh;
//   background-color: #1b1b1c; /* Dark theme background */
//   color: white;
// `;

// const Title = styled.h1`
//   color: white;
//   margin-bottom: 20px;
// `;

// const UserInfo = styled.div`
//   background: #1e1e1e; /* Dark gray box */
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 6px 5px 20px rgb(56, 55, 55);
//   text-align: center;
//   width: 300px;
// `;

// const UserDetail = styled.p`
//   font-size: 16px;
//   margin: 10px 0;
// `;

// const LogoutButton = styled.button`
//   width: 100%;
//   padding: 10px;
//   margin-top: 20px;
//   border: none;
//   background: #ff4d4d; /* Red color for logout button */
//   color: white;
//   font-size: 16px;
//   cursor: pointer;
//   border-radius: 5px;
//   transition: 0.3s;

//   &:hover {
//     background: #ff1a1a; /* Darker red on hover */
//   }
// `;

// const Profile = ({ user, setUser }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       navigate("/auth"); // Redirect to login if not authenticated
//     }
//   }, [user, navigate]);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth); // Sign out the user
//       setUser(null); // Clear the user state
//       navigate("/auth"); // Redirect to the login page
//       console.log("User logged out successfully");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return user ? (
//     <Container>
//       <Title>Profile</Title>
//       <UserInfo>
//         <UserDetail>Welcome, {user.email}!</UserDetail>
        
//         <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
//       </UserInfo>
//     </Container>
//   ) : null;
// };

// export default Profile;

// import React from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { auth } from "./firebase";
// import { signOut } from "firebase/auth";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
//   background: linear-gradient(135deg, #1b1b1c 0%, #2d2d2f 100%);
//   color: white;
//   padding: 20px;
// `;

// const Title = styled.h1`
//   color: white;
//   margin-bottom: 30px;
//   font-size: 2.5rem;
//   text-shadow: 0 2px 4px rgba(0,0,0,0.3);
// `;

// const UserInfo = styled.div`
//   background: rgba(30, 30, 30, 0.6);
//   backdrop-filter: blur(12px);
//   -webkit-backdrop-filter: blur(12px);
//   padding: 30px;
//   border-radius: 16px;
//   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
//   text-align: center;
//   width: 100%;
//   max-width: 400px;
//   border: 1px solid rgba(255, 255, 255, 0.1);
// `;

// const UserDetail = styled.p`
//   font-size: 1.1rem;
//   margin: 15px 0;
//   color: rgba(255, 255, 255, 0.9);
// `;

// const LogoutButton = styled.button`
//   width: 100%;
//   padding: 12px;
//   margin-top: 25px;
//   border: none;
//   background: linear-gradient(135deg, #ff4d4d 0%, #cc0000 100%);
//   color: white;
//   font-size: 1rem;
//   font-weight: 500;
//   cursor: pointer;
//   border-radius: 8px;
//   transition: all 0.3s ease;
//   box-shadow: 0 4px 15px rgba(255, 77, 77, 0.3);
  
//   &:hover {
//     background: linear-gradient(135deg, #ff3333 0%, #b30000 100%);
//     transform: translateY(-2px);
//     box-shadow: 0 6px 20px rgba(255, 77, 77, 0.4);
//   }

//   &:active {
//     transform: translateY(0);
//   }
// `;

// const Profile = ({ user, setUser }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       navigate("/auth");
//     }
//   }, [user, navigate]);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//       navigate("/auth");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

  
//   return user ? (
//     <Container>
//       <Title>Your Profile</Title>
//       <UserInfo>
//         <UserDetail>Welcome back,</UserDetail>
//         <UserDetail style={{ fontSize: "1.4rem", fontWeight: "bold", margin: "20px 0" }}>
//           {user.email}
//         </UserDetail>
//         <UserDetail>Thanks for being part of our community!</UserDetail>
//         <LogoutButton onClick={handleLogout}>Sign Out</LogoutButton>
//       </UserInfo>
//     </Container>
//   ) : null;
// };

// export default Profile;

// import React from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { auth } from "./firebase";
// import { signOut } from "firebase/auth";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
//   background: linear-gradient(135deg, #1b1b1c 0%, #2d2d2f 100%);
//   color: white;
//   padding: 20px;
//   position: relative;
//   overflow: hidden;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: -50%;
//     left: -50%;
//     width: 200%;
//     height: 200%;
//     background: radial-gradient(circle, rgba(58,123,213,0.1) 0%, transparent 70%);
//     z-index: 0;
//     animation: rotate 20s linear infinite;
    
//     @keyframes rotate {
//       0% { transform: rotate(0deg); }
//       100% { transform: rotate(360deg); }
//     }
//   }
// `;

// const ContentWrapper = styled.div`
//   position: relative;
//   z-index: 1;
//   width: 100%;
//   max-width: 500px;
// `;

// const Title = styled.h1`
//   color: white;
//   margin-bottom: 30px;
//   font-size: 2.5rem;
//   text-shadow: 0 2px 10px rgba(0,0,0,0.5);
//   text-align: center;
//   background: linear-gradient(to right, #fff, #aaa);
//   -webkit-background-clip: text;
//   background-clip: text;
//   color: transparent;
// `;

// const UserInfo = styled.div`
//   background: rgba(30, 30, 30, 0.7);
//   backdrop-filter: blur(16px);
//   -webkit-backdrop-filter: blur(16px);
//   padding: 40px 30px;
//   border-radius: 20px;
//   box-shadow: 
//     0 10px 25px rgba(0, 0, 0, 0.3),
//     inset 0 1px 1px rgba(255, 255, 255, 0.1);
//   text-align: center;
//   width: 100%;
//   border: 1px solid rgba(255, 255, 255, 0.08);
//   transition: transform 0.3s ease, box-shadow 0.3s ease;
  
//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 
//       0 15px 30px rgba(0, 0, 0, 0.4),
//       inset 0 1px 1px rgba(255, 255, 255, 0.1);
//   }
// `;

// const UserDetail = styled.p`
//   font-size: 1.1rem;
//   margin: 15px 0;
//   color: rgba(255, 255, 255, 0.9);
//   line-height: 1.6;
// `;

// const HighlightText = styled(UserDetail)`
//   font-size: 1.4rem;
//   font-weight: 600;
//   margin: 20px 0;
//   color: white;
//   text-shadow: 0 2px 5px rgba(0,0,0,0.3);
//   position: relative;
  
//   &::after {
//     content: '';
//     position: absolute;
//     bottom: -10px;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 50px;
//     height: 2px;
//     background: linear-gradient(to right, #ff4d4d, #cc0000);
//     border-radius: 2px;
//   }
// `;

// const LogoutButton = styled.button`
//   width: 100%;
//   padding: 14px;
//   margin-top: 30px;
//   border: none;
//   background: linear-gradient(135deg, #ff4d4d 0%, #cc0000 100%);
//   color: white;
//   font-size: 1rem;
//   font-weight: 500;
//   cursor: pointer;
//   border-radius: 10px;
//   transition: all 0.3s ease;
//   box-shadow: 
//     0 4px 15px rgba(255, 77, 77, 0.3),
//     inset 0 1px 1px rgba(255, 255, 255, 0.1);
//   position: relative;
//   overflow: hidden;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: -100%;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
//     transition: 0.5s;
//   }
  
//   &:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 6px 20px rgba(255, 77, 77, 0.4);
    
//     &::before {
//       left: 100%;
//     }
//   }

//   &:active {
//     transform: translateY(0);
//   }
// `;

// const Profile = ({ user, setUser }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       navigate("/auth");
//     }
//   }, [user, navigate]);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//       navigate("/auth");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return user ? (
//     <Container>
//       <ContentWrapper>
//         <Title>Your Profile</Title>
//         <UserInfo>
//           <UserDetail>Welcome back,</UserDetail>
//           <HighlightText>
//             {user.email}
//           </HighlightText>
//           <UserDetail>Thanks for being part of our community! We're glad to have you here.</UserDetail>
//           <LogoutButton onClick={handleLogout}>
//             Sign Out
//           </LogoutButton>
//         </UserInfo>
//       </ContentWrapper>
//     </Container>
//   ) : null;
// };

// export default Profile;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import styled from 'styled-components';

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/auth");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return user ? (
    <Container>
      <ContentWrapper>
        <Title>Your Profile</Title>
        <UserInfo>
          <UserDetail>Welcome ,</UserDetail>
          <HighlightText>
            {user.displayName || user.email}
          </HighlightText>
          <UserDetail>Thanks for being part of our community! We're glad to have you here.</UserDetail>
          <ButtonGroup>
            <LogoutButton onClick={handleLogout}>
              Sign Out
            </LogoutButton>
          </ButtonGroup>
        </UserInfo>
      </ContentWrapper>
    </Container>
  ) : null;
};

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
  background: linear-gradient(135deg, #9f9f9f 0%, #3a3a3b 100%);
  border-radius: 10px;
`;

const ContentWrapper = styled.div`
  wwidth: 100%;
  max-width: 1000px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 2px solid rgba(19, 19, 19, 0.377);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: white;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UserDetail = styled.p`
  font-size: 1.1rem;
  color: white;
  text-align: center;
  margin: 0.5rem 0;
`;

const HighlightText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color:rgb(251, 190, 83);
  text-align: center;
  display: block;
  margin: 0.5rem 0;
  word-break: break-all;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const EditButton = styled(Button)`
  background-color: #3498db;
  color: white;

  &:hover {
    background-color: #2980b9;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #e74c3c;
  color: white;

  &:hover {
    background-color: #c0392b;
  }
`;

export default Profile;
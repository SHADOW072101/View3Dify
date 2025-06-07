// import React, { useState } from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import { auth, googleProvider } from "./firebase"; // Import googleProvider
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { FcGoogle } from "react-icons/fc"; // Google icon

// const AuthContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 80vh; /* Full screen height */
//   width: 80vh; /* Full screen width */
//   background-color: #1b1b1c; /* Dark theme background */
//   overflow: hidden;
// `;

// const LoginBox = styled.div`
//   background: #1e1e1e; /* Dark gray box */
//   padding: 30px;
//   border-radius: 10px;
//   box-shadow: 6px 5px 20px rgb(56, 55, 55);
//   text-align: center;
//   width: 300px;
// `;

// const Title = styled.h2`
//   color: white;
//   margin-bottom: 20px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin: 10px 0;
//   border-radius: 5px;
//   border: 1px solid #282727;
//   background: #222;
//   color: white;
//   font-size: 16px;
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   margin-top: 10px;
//   border: 1px solid #28272;
//   background: #222;
//   color: #ffffff;
//   font-size: 16px;
//   cursor: pointer;
//   border-radius: 5px;
//   transition: 0.3s;

//   &:hover {
//     background: rgb(48, 50, 50);
//   }
// `;

// const GoogleButton = styled.button`
//   width: 100%;
//   padding: 10px;
//   margin-top: 10px;
//   border: 1px solid #28272;
//   background: #ffffff;
//   color: #000000;
//   font-size: 16px;
//   cursor: pointer;
//   border-radius: 5px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 10px;
//   transition: 0.3s;

//   &:hover {
//     background: #f1f1f1;
//   }
// `;

// const SignUpText = styled.p`
//   color: white;
//   margin-top: 10px;
//   cursor: pointer;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const ErrorText = styled.p`
//   color: red;
//   font-size: 14px;
// `;

// const Auth = ({ setUser }) => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (isSignup && password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       if (isSignup) {
//         // Sign up with Firebase
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         setUser(userCredential.user);
//         console.log("User signed up:", userCredential.user);
//       } else {
//         // Log in with Firebase
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         setUser(userCredential.user);
//         console.log("User logged in:", userCredential.user);
//       }
//       navigate("/"); // Redirect to home page after successful auth
//     } catch (error) {
//       setError(error.message);
//       console.error("Authentication error:", error);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       setUser(result.user);
//       console.log("User signed in with Google:", result.user);
//       navigate("/"); // Redirect to home page after successful auth
//     } catch (error) {
//       setError(error.message);
//       console.error("Google sign-in error:", error);
//     }
//   };

//   return (
//     <AuthContainer>
//       <LoginBox>
//         <Title>{isSignup ? "Sign Up" : "Log In"}</Title>
//         <form onSubmit={handleAuth}>
//           <Input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <Input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {isSignup && (
//             <Input
//               type="password"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           )}

//           {error && <ErrorText>{error}</ErrorText>}
//           <Button type="submit">{isSignup ? "Sign Up" : "Log In"}</Button>
//         </form>

//         <GoogleButton onClick={handleGoogleSignIn}>
//           <FcGoogle size={20} /> Continue with Google
//         </GoogleButton>

//         <SignUpText onClick={() => setIsSignup(!isSignup)}>
//           {isSignup ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
//         </SignUpText>
//       </LoginBox>
//     </AuthContainer>
//   );
// };

// export default Auth;

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";


const LoginBox = styled.div`
  background: rgba(30, 30, 30, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 30px;
  font-size: 2rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  border: none;
  background: linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%);
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(58, 123, 213, 0.3);

  &:hover {
    background: linear-gradient(135deg, #3366cc 0%, #00b7eb 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(58, 123, 213, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  border: none;
  background: white;
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);

  &:hover {
    background: #f1f1f1;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SignUpText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const ErrorText = styled.p`
  color: #ff6b6b;
  font-size: 14px;
  margin: 10px 0;
  text-align: left;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: rgba(255, 255, 255, 0.5);

  &::before, &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
`;

const Auth = ({ setUser }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const userCredential = isSignup 
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);
      
      setUser(userCredential.user); // Update user state
      navigate("/profile"); // Navigate to profile after auth
      
    } catch (error) {
      setError(error.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user); // Update user state
      navigate("/profile"); // Navigate to profile after auth
    } catch (error) {
      setError(error.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <LoginBox>
        <Title>{isSignup ? "Create Account" : "Welcome Back"}</Title>
        <form onSubmit={handleAuth}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          {isSignup && (
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          )}

          {error && <ErrorText>{error}</ErrorText>}
          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Log In"}
          </Button>
        </form>

        <Divider>or</Divider>

        <GoogleButton onClick={handleGoogleSignIn} disabled={loading}>
          <FcGoogle size={20} /> Continue with Google
        </GoogleButton>

        <SignUpText onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
        </SignUpText>
      </LoginBox>
    </>
  );
};

export default Auth;
import { Paper, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../FirebaseConfig/firebase";
import { useNavigate } from "react-router-dom";

function SignUp({ setLogin }) {
  const navigate = useNavigate();
  const [uniqueLink, setUniqueLink] = useState("");

  const signUpHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((res) => {
        const user = res.user;
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userName", user.displayName);
        setLogin(true);
        // Generate unique link after successful login
        const encodedUserId = btoa(user.uid);
        const link = `https://falentine.netlify.app/main/user=${encodedUserId}`;
        localStorage.setItem("uniqueLink", link);
        setUniqueLink(link);

        navigate("/unique");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Paper sx={{ padding: "30px" }} elevation={8}>
        <Button variant="contained" onClick={signUpHandler}>
          Login with Google
        </Button>
      </Paper>
    </Box>
  );
}

export default SignUp;

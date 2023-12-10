import React, { useState, useEffect } from "react";
import {
  Container,
  Link,
  Box,
  Button,
  Grid,
  FormControl,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpasswordError, setCPasswordError] = useState("");
  const [msg, showMsg] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (
      validateUsername() &&
      validateEmail() &&
      validatePassword() &&
      validateCPassword()
    ) {
      const data = { username, email, password };

      try {
        const response = await axios.post(
          "https://accredian-backend-task-ad956.vercel.app/api/signup",
          data
        );

        if (response.status === 201) {
          setUsernameError("");
          setEmailError("");
          setPasswordError("");
          setCPasswordError("");

          showMsg(true);

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } catch (error) {
        console.error("Error during signup:", error);
        if (error.response) {
          if (error.response.status === 409) {
            setUsernameError("Username or email already exists");
          } else {
            console.log("Other server error:", error.response.data);
          }
        } else {
          console.error("Error during signup:", error);
        }
      }
    }
  };

  const validateUsername = () => {
    const usernameRegex = /^[a-zA-Z0-9_]{5,}$/;

    if (!usernameRegex.test(username)) {
      setUsernameError(
        "Username must be at least 5 characters long and can only contain alphanumeric characters and underscores."
      );
      return false;
    } else {
      setUsernameError("");
      return true;
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number"
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const validateCPassword = () => {
    if (validatePassword() && password === confirmPassword) {
      setCPasswordError("");
      return true;
    } else {
      setCPasswordError("Passwords do not match or password is invalid");
      return false;
    }
  };

  useEffect(() => {}, [msg]);

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flex: "1 1 auto",
      }}
    >
      <Grid container sx={{ flex: "1 1 auto" }}>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            backgroundColor: "background.paper",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: "fixed",
              top: 0,
              width: "100%",
            }}
          >
            <Box
              component="a"
              href="/"
              sx={{
                display: "inline-flex",
                height: 32,
                width: 32,
              }}
            >
              <img
                src="https://cdn.freebiesupply.com/logos/thumbs/2x/auth0-logo.png"
                alt="logo"
              />
            </Box>
          </Box>
          <FormControl
            sx={{
              width: "100%",
              marginTop: "100px",
            }}
          >
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h2" sx={{ marginBottom: "10px" }}>
                Sign Up
              </Typography>
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                sx={{ marginBottom: "10px" }}
                onBlur={validateUsername}
                error={usernameError !== ""}
                helperText={usernameError}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ marginBottom: "10px" }}
                onBlur={validateEmail}
                error={emailError !== ""}
                helperText={emailError}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ marginBottom: "10px" }}
                onBlur={validatePassword}
                error={passwordError !== ""}
                helperText={passwordError}
              />
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                sx={{ marginBottom: "20px" }}
                onBlur={validateCPassword}
                error={cpasswordError !== ""}
                helperText={cpasswordError}
              />
              <Button variant="contained" onClick={handleSignUp}>
                Sign Up
              </Button>

              {msg && (
                <Alert sx={{ margin: "10px" }}>
                  Signup Successful. Redirecting to login page
                </Alert>
              )}
              <Typography sx={{ margin: "10px" }}>
                Already have an account?{" "}
                <Link href="/login" underline="hover">
                  Log in
                </Link>
              </Typography>
            </Container>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            alignItems: "center",
            background:
              "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            "& img": {
              maxWidth: "100%",
            },
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography
              align="center"
              color="inherit"
              sx={{
                fontSize: "24px",
                lineHeight: "32px",
                mb: 1,
              }}
              variant="h1"
            >
              Full Stack Developer Intern Task -{" "}
              <Box
                component="a"
                sx={{ color: "#15B79E" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Accredian
              </Box>
            </Typography>
            <img
              alt=""
              src="https://cdni.iconscout.com/illustration/premium/thumb/voice-authentication-security-4120630-3427364.png"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUpPage;

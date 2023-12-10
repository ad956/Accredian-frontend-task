import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // This code will run when authError state changes
    if (authError) {
      // Display your alert or perform any other action
      console.log("Unauthorized. Displaying alert.");
    }
  }, [authError]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if ((validateUsername() || validateEmail()) && validatePassword()) {
      const data = { usernameOrEmail, password };

      try {
        const response = await axios.post(
          "https://accredian-backend-task-ad956.vercel.app/api/login",
          data
        );

        if (response.status === 201) {
          setAuthError(false);
          navigate("/success");
        }
      } catch (error) {
        console.error("Error during login:", error);
        if (error.response) {
          if (error.response.status === 401) {
            console.log("Unauthorized:", error.response.data.error);
            setAuthError(true);
          } else {
            console.log("Other server error:", error.response.data);
          }
        } else {
          setAuthError(true);
        }
      }
    }
  };

  const validateUsername = () => {
    const usernameRegex = /^[a-zA-Z0-9_]{5,}$/;

    if (!usernameRegex.test(usernameOrEmail)) {
      setEmailError(
        "Username must be at least 5 characters long and can only contain alphanumeric characters and underscores."
      );
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usernameOrEmail)) {
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
              <img src="https://cdn.freebiesupply.com/logos/thumbs/2x/auth0-logo.png " />
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: "background.paper",
              flex: "1 1 auto",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                maxWidth: 550,
                px: 3,
                py: "100px",
                width: "100%",
              }}
            >
              <div>
                <Stack spacing={1} sx={{ mb: 3 }}>
                  <Typography variant="h4">Login</Typography>
                  <Typography color="text.secondary" variant="body2">
                    Don&apos;t have an account? &nbsp;
                    <Link href="/signup" underline="hover" variant="subtitle2">
                      Register
                    </Link>
                  </Typography>
                </Stack>
                <Typography sx={{ mb: 3, color: "#15b79a" }}>
                  Enter Your Credentials to Continue
                </Typography>
                <form noValidate onSubmit={handleLogin}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Username or Email"
                      name="email"
                      onChange={(e) => setUsernameOrEmail(e.target.value)}
                      type="email"
                      value={usernameOrEmail}
                      error={emailError !== ""}
                      helperText={emailError}
                      onBlur={() => {
                        validateUsername() || validateEmail();
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      value={password}
                      error={passwordError !== ""}
                      helperText={passwordError}
                      onBlur={validatePassword}
                    />
                  </Stack>
                  <Button
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                    type="submit"
                    variant="contained"
                  >
                    Continue
                  </Button>

                  {authError && (
                    <Alert color="error" severity="error" sx={{ mt: 3 }}>
                      <div>
                        Unable to verify your credentials. Please ensure your
                        username, email or password is correct.
                      </div>
                    </Alert>
                  )}
                </form>
              </div>
            </Box>
          </Box>
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

export default LoginPage;

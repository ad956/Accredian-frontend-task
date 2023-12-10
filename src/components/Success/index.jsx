import { Box, Grid, Link, Stack, Typography } from "@mui/material";

const SuccessPage = () => {
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
                  <Typography variant="h4">Login Successful</Typography>
                  <Typography color="text.secondary" variant="body2">
                    Logout from your account &nbsp;
                    <Link href="/login" underline="hover" variant="subtitle2">
                      Logout
                    </Link>
                  </Typography>
                </Stack>
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
            height: "100vh",
            justifyContent: "center",
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

export default SuccessPage;

import React from "react";
import { Button, Grid, Typography, Box } from "@mui/material";

import instagrem from "../../assets/Media/instagrem.png";
import facebookk from "../../assets/Media/facebookk.png";
import x from "../../assets/Media/x.png";

export const Footer = () => {
  return (
    <Box sx={{ mt: 10 }}>
      <Grid
        container
        spacing={3}
        sx={{
          bgcolor: "beige",
          color: "brown",
          py: 3,
          textAlign: "center",
        }}
      >
        {/* Company */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography variant="h6" gutterBottom>
            Company
          </Typography>

          {["About Us", "Careers", "Press", "Blog"].map((text) => (
            <Box key={text}>
              <Button className="pb-5" sx={{ color: "brown" }}>
                {text}
              </Button>
            </Box>
          ))}
        </Grid>

        {/* Social */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography variant="h6" gutterBottom>
            Social
          </Typography>

          {[
            { name: "Instagram", image: instagrem },
            { name: "Facebook", image: facebookk },
            { name: "X", image: x },
          ].map((social) => (
            <Box key={social.name}>
              <Button
                className="pb-5"
                sx={{ color: "brown" }}
                startIcon={
                  <img
                    src={social.image}
                    alt=""
                    height={20}
                    width={20}
                  />
                }
              >
                {social.name}
              </Button>
            </Box>
          ))}
        </Grid>

        {/* Stores */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography variant="h6" gutterBottom>
            Stores
          </Typography>

          {["Mumbai", "Pune", "Bangalore", "Delhi"].map((city) => (
            <Box key={city}>
              <Button className="pb-5" sx={{ color: "brown" }}>
                {city}
              </Button>
            </Box>
          ))}
        </Grid>

        {/* More Info */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography variant="h6" gutterBottom>
            More Info
          </Typography>

          {[
            "Contact Us",
            "FAQ",
            "Terms & Conditions",
            "Privacy Policy",
          ].map((text) => (
            <Box key={text}>
              <Button className="pb-5" sx={{ color: "brown" }}>
                {text}
              </Button>
            </Box>
          ))}
        </Grid>
      </Grid>

      {/* Copyright */}
      <Typography
        variant="body2"
        align="center"
        sx={{
          bgcolor: "beige",
          color: "brown",
          py: 2,
          borderTop: "1px solid #c9b98a",
        }}
      >
        &copy; {new Date().getFullYear()} SM0K3. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

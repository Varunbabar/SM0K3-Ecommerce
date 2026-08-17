import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import instagrem from "../../assets/Media/instagrem.png";
import facebookk from "../../assets/Media/facebookk.png";
import x from "../../assets/Media/x.png";
export const Footer = () => {
  return (
    <div>
      <Grid

        container justifyContent="space-evenly"  columnSpacing={30}
        sx={{ bgcolor: "beige", color: "brown", py: 3,  textAlign: "center" , mt:10}}
      >
        <Grid item xs={12} sm={6} md={3}  >
          <Typography className="pb-3" variant="h6">
            {" "}
            Company
            </Typography>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              About Us
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Careers
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Press
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Blog
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}  >
          <Typography className="pb-5" variant="h6">
            {" "}
            Social
          </Typography>
          <div>
            <Button
              className="pb-5"
              variant="h6"
              gutterBottom
              startIcon={
                <img src={instagrem} alt="Instagram" height={20} width={20} />
              }
            >
              Instagram
            </Button>
          </div>
          <div>
            <Button
              className="pb-5"
              variant="h6"
              gutterBottom
              startIcon={
                <img src={facebookk} alt="Facebook" height={20} width={20} />
              }
            >
              Facebook
            </Button>
          </div>
          <div>
            <Button
              className="pb-5"
              variant="h6"
              gutterBottom
              startIcon={<img src={x} alt="X" height={20} width={20} />}
            >
              X
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={3} >
          <Typography className="pb-3" variant="h6">
            {" "}
            Store's
          </Typography>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Mumbai
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Pune
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Banglore
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Delhi
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={3} >
          <Typography className="pb-3" variant="h6">
            {" "}
            More Info
          </Typography>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Contact Us
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              FAQ
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Terms & Conditions
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6" gutterBottom>
              Privacy Policy
            </Button>
          </div>
        </Grid>
      </Grid>
        <Typography
  variant="body2"
  align="center"
  sx={{
    bgcolor: "beige",
    color: "brown",
    py: 2,
    borderTop: "1px solid #c9b98a"
  }}
>
  &copy; {new Date().getFullYear()} Your Company. All rights reserved.
</Typography>
      

    </div>
  );
};
export default Footer;

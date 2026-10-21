import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  InputBase,
  Box,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { allProduct } from "../../Data/Shoes/allProduct";

const Navigation = () => {
  const navigate = useNavigate();

  const [menAnchorEl, setMenAnchorEl] = useState(null);
  const [womenAnchorEl, setWomenAnchorEl] = useState(null);
  const [dropsAnchorEl, setDropsAnchorEl] = useState(null);
  const [aboutAnchorEl, setAboutAnchorEl] = useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isLoggedIn =
    Boolean(localStorage.getItem("token")) &&
    Boolean(localStorage.getItem("userId"));

  const closeAllMenus = () => {
    setMenAnchorEl(null);
    setWomenAnchorEl(null);
    setDropsAnchorEl(null);
    setAboutAnchorEl(null);
    setAccountAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    closeAllMenus();
    navigate("/login");
  };

  const filteredProducts = allProduct.filter((product) =>
    (product.name || product.title || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const openProduct = (product) => {
    setSearchOpen(false);
    setSearchTerm("");

    if (product.path) {
      navigate(product.path);
    } else if (product.id != null) {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "beige", color: "brown" }}
    >
      <Toolbar sx={{ gap: 1, flexWrap: "wrap" }}>
        {/* Logo */}
        <Typography
          component={Link}
          to="/"
          variant="h4"
          sx={{
            fontWeight: "bold",
            flexGrow: 1,
            color: "brown",
            textDecoration: "none",
          }}
        >
          SM0K3
        </Typography>

        {/* Men */}
        <Button
          color="inherit"
          component={Link}
          to="/men"
          onClick={(event) => setMenAnchorEl(event.currentTarget)}
        >
          Men
        </Button>

        <Menu
          anchorEl={menAnchorEl}
          open={Boolean(menAnchorEl)}
          onClose={() => setMenAnchorEl(null)}
        >
          <MenuItem
            component={Link}
            to="/menShoes"
            onClick={() => setMenAnchorEl(null)}
          >
            Sneakers
          </MenuItem>

          <MenuItem
            component={Link}
            to="/men"
            onClick={() => setMenAnchorEl(null)}
          >
            Running
          </MenuItem>
        </Menu>

        {/* Women */}
        <Button
          color="inherit"
          component={Link}
          to="/women"
          onClick={(event) => setWomenAnchorEl(event.currentTarget)}
        >
          Women
        </Button>

        <Menu
          anchorEl={womenAnchorEl}
          open={Boolean(womenAnchorEl)}
          onClose={() => setWomenAnchorEl(null)}
        >
          <MenuItem
            component={Link}
            to="/womenSneakers"
            onClick={() => setWomenAnchorEl(null)}
          >
            Sneakers
          </MenuItem>

          <MenuItem
            component={Link}
            to="/womenRunning"
            onClick={() => setWomenAnchorEl(null)}
          >
            Running
          </MenuItem>
        </Menu>

        {/* Drops */}
        <Button
          color="inherit"
          component={Link}
          to="/drop"
          onClick={(event) => setDropsAnchorEl(event.currentTarget)}
        >
          Drops
        </Button>

        <Menu
          anchorEl={dropsAnchorEl}
          open={Boolean(dropsAnchorEl)}
          onClose={() => setDropsAnchorEl(null)}
        >
          <MenuItem
            component={Link}
            to="/drop"
            onClick={() => setDropsAnchorEl(null)}
          >
            Latest Drops
          </MenuItem>
        </Menu>

        {/* About */}
        <Button
          color="inherit"
          component={Link}
          to="/about"
          onClick={(event) => setAboutAnchorEl(event.currentTarget)}
        >
          About Us
        </Button>

        <Menu
          anchorEl={aboutAnchorEl}
          open={Boolean(aboutAnchorEl)}
          onClose={() => setAboutAnchorEl(null)}
        >
          <MenuItem
            component={Link}
            to="/about"
            onClick={() => setAboutAnchorEl(null)}
          >
            Our Story
          </MenuItem>

          <MenuItem
            component={Link}
            to="/about"
            onClick={() => setAboutAnchorEl(null)}
          >
            Careers
          </MenuItem>
        </Menu>

        {/* Product Search */}
        <IconButton
          color="inherit"
          aria-label="Search products"
          onClick={() => {
            setSearchOpen((previous) => !previous);
            setSearchTerm("");
          }}
        >
          <SearchIcon />
        </IconButton>

        {searchOpen && (
          <Box sx={{ position: "relative" }}>
            <InputBase
              placeholder="Search sneakers..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setSearchOpen(false);
                  setSearchTerm("");
                }
              }}
              autoFocus
              inputProps={{ "aria-label": "Search sneakers" }}
              sx={{
                bgcolor: "white",
                color: "black",
                px: 2,
                py: 0.5,
                borderRadius: 2,
                width: { xs: 160, sm: 220 },
              }}
            />

            {searchTerm.trim() !== "" && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  mt: 1,
                  width: 280,
                  maxHeight: 300,
                  overflowY: "auto",
                  bgcolor: "white",
                  color: "black",
                  borderRadius: 2,
                  boxShadow: 3,
                  zIndex: 1300,
                }}
              >
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <MenuItem
                      key={product.id ?? product.path ?? index}
                      onClick={() => openProduct(product)}
                    >
                      {product.name || product.title}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>
                    No products found
                  </MenuItem>
                )}
              </Box>
            )}
          </Box>
        )}

        {/* Account Menu */}
        <IconButton
          color="inherit"
          aria-label="Account menu"
          onClick={(event) =>
            setAccountAnchorEl(event.currentTarget)
          }
        >
          <PersonIcon />
        </IconButton>

        <Menu
          anchorEl={accountAnchorEl}
          open={Boolean(accountAnchorEl)}
          onClose={() => setAccountAnchorEl(null)}
        >
          {isLoggedIn ? (
            [
              {
                label: "My Profile",
                path: "/person",
              },
              {
                label: "My Orders",
                path: "/orders",
              },
            ].map((item) => (
              <MenuItem
                key={item.path}
                component={Link}
                to={item.path}
                onClick={() => setAccountAnchorEl(null)}
              >
                {item.label}
              </MenuItem>
            )).concat(
              <MenuItem key="logout" onClick={handleLogout}>
                Logout
              </MenuItem>
            )
          ) : (
            <>
              <MenuItem
                component={Link}
                to="/login"
                onClick={() => setAccountAnchorEl(null)}
              >
                Login
              </MenuItem>

              <MenuItem
                component={Link}
                to="/register"
                onClick={() => setAccountAnchorEl(null)}
              >
                Register
              </MenuItem>
            </>
          )}
        </Menu>

        {/* Cart */}
        <IconButton
          color="inherit"
          aria-label="Shopping cart"
          onClick={() => navigate("/cart")}
        >
          <Badge badgeContent={0} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link }from "react-router-dom";
import { useState } from "react";
import InputBase from "@mui/material/InputBase";
import {allProduct} from "../../Data/Shoes/allProduct";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [menAnchorEl, setMenAnchorEl] = useState(null);
  const [womenAnchorEl, setWomenAnchorEl] = useState(null);
  const [dropsAnchorEl, setDropsAnchorEl] = useState(null);
  const [aboutAnchorEl, setAboutAnchorEl] = useState(null);

  const openMenu = (event) => {
    setMenAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setMenAnchorEl(null);
  };
  const openWomenMenu = (event) => {
    setWomenAnchorEl(event.currentTarget);
  };
  const closeWomenMenu = () => {
    setWomenAnchorEl(null);
  };
  const openDropsMenu = (event) => {
    setDropsAnchorEl(event.currentTarget);
  };
  const closeDropsMenu = () => {
    setDropsAnchorEl(null);
  };
  const openAboutMenu = (event) => {
    setAboutAnchorEl(event.currentTarget);
  };
  const closeAboutMenu = () => {
    setAboutAnchorEl(null);
  } ;
  const[searchOpen , setSearchOpen] = useState(false);
  const[searchTerm,setSearchTerm] = useState("")
  const filterProducts = allProduct.filter((product)=> 
  (product.name || product.title || "")
  .toLowerCase()
  .includes(searchTerm.toLowerCase())
);
const navigate = useNavigate();

  
  return (
    <AppBar position="static" sx={{ bgcolor: "beige", color: "brown" }}>
      <Toolbar>
        <Typography component={Link} to="/" variant="h3" sx={{ fontWeight: "bold", flexGrow: 1 }}>
          SM0K3
        </Typography>
        <Button color="inherit" component={Link} onClick={openMenu} to="/men">
          Men
        </Button>
        <Menu
          anchorEl={menAnchorEl}
          open={Boolean(menAnchorEl)}
          onClose={closeMenu}
        >
          <MenuItem onClick={closeMenu}>Sneaker</MenuItem>
          <MenuItem onClick={closeMenu}>Running</MenuItem>

      
        </Menu>
        <Button color="inherit"component={Link} onClick={openWomenMenu} to="/women">
          Women
        </Button>
        <Menu
          anchorEl={womenAnchorEl}
          open={Boolean(womenAnchorEl)}
          onClose={closeWomenMenu}
        >
          <MenuItem onClick={closeWomenMenu} to="/womenSneakers">
            Sneakers
          </MenuItem>
          <MenuItem onClick={closeWomenMenu} to="/womenRunning">
            Running
          </MenuItem>
        </Menu>
        <Button color="inherit" component={Link} onClick={openDropsMenu} to="/drop">
          Drops
        </Button>
        <Menu
          anchorEl={dropsAnchorEl}
          open={Boolean(dropsAnchorEl)}
          onClose={closeDropsMenu}
        >
          <MenuItem onClick={closeDropsMenu}>Drops</MenuItem>
        </Menu>
        <Button color="inherit" component={Link} onClick={openAboutMenu} to="/about">
          About Us
        </Button>
        <Menu 
          anchorEl={aboutAnchorEl}
          open={Boolean(aboutAnchorEl)}
          onClose={closeAboutMenu}
        >
          <MenuItem onClick={closeAboutMenu} to="/about">Our Story</MenuItem>
          <MenuItem onClick={closeAboutMenu} to="/about">Careers</MenuItem>
        </Menu>
        <IconButton color="inherit" onClick={()=>setSearchOpen(!searchOpen)}>
          <SearchIcon />
        </IconButton>
        {searchOpen && (
  <InputBase
    placeholder="Search Sneakers..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    sx={{
      bgcolor: "white",
      px: 2,
      py: 0.5,
      borderRadius: 2,
      width: 250,
      ml: 2,
    }}
  />
)}
{searchOpen && searchTerm && (
  <div
    style={{
      position: "absolute",
      top: "70px",
      right: "120px",
      width: "300px",
      background: "white",
      color: "black",
      borderRadius: "8px",
      padding: "10px",
      zIndex: 1000,
    }}
  >
    {filterProducts.length > 0 ? (
      filterProducts.map((product, index) => (
        <div
          key={index}
          onClick = {() => navigate(product.path)}
          style={{
            padding: "8px",
            borderBottom: "1px solid #ddd",
            cursor: "pointer",
          }}
        >
          {product.name || product.title}
        </div>
      ))
    ) : (
      <p>No products found.</p>
    )}
  </div>
)}
        <IconButton color="inherit" onClick={() => navigate("/person")}>
          <PersonIcon />
        </IconButton>
        <IconButton color="inherit" onClick={() => navigate("/cart")}>
          <Badge badgeContent={0} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
export default Navigation;

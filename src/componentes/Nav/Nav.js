import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListaCart from '../ListaCart/ListaCart'
import MoreIcon from '@mui/icons-material/MoreVert';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function NavAppBar(props) {

  const  productos  = props.itemCart;
  const updateCart = props.updateCart; 

  console.log("nav productos", productos)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorElCart, setAnchorElCart] = React.useState(null);
  const [mobileMoreAnchorElCart, setMobileMoreAnchorElCart] = React.useState(null);


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const isMenuOpenCart = Boolean(anchorElCart);
  const isMobileMenuOpenCart = Boolean(mobileMoreAnchorElCart);

  const [auth, setAuth] = React.useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuCartClose = () => {
    setMobileMoreAnchorElCart(null);
  };

  const handleMenuCartClose = () => {
    setAnchorElCart(null);
    handleMobileMenuCartClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuCartOpen = (event) => {
    setMobileMoreAnchorElCart(event.currentTarget);
  };
  const handleMenuCartOpen = (event) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleProfileMenuOpenLogin = (event) =>{
    setMobileMoreAnchorEl(event.currentTarget);
  }

  // const productos = [{"id":1,"title":"iPhone 9","price":549,"quantity":1,"brand":"Apple","thumbnail":"https://dummyjson.com/image/i/products/1/thumbnail.jpg"}, 
  // {"id":2,"title":"iPhone X","price":899,"quantity":2,"thumbnail":"https://dummyjson.com/image/i/products/2/thumbnail.jpg"}];

  const menuCartId = 'primary-search-cart-menu';
  const renderMenuCart = (
    
    <Menu
      anchorEl={anchorElCart}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuCartId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpenCart}
      onClose={handleMenuCartClose}
    >
      {productos.length > 0 && <ListaCart productos={productos} updateCart={updateCart}></ListaCart>}
      
      {/* <MenuItem onClick={handleMenuCartClose}>Cart</MenuItem>
      <MenuItem onClick={handleMenuCartClose}>Cart 1</MenuItem> */}
    </Menu>
    
    
  );

  const mobileMenuCartId = 'primary-search-cart-menu-mobile';
  const renderMobileMenuCart = (
    <Menu
      anchorEl={mobileMoreAnchorElCart}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuCartId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpenCart}
      onClose={handleMobileMenuCartClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        <AddShoppingCartIcon sx={{mr: "4px"}} />
              {productos.length >0 &&<Badge sx={{mb: "20px"}} badgeContent={ productos.length} color="error">
              </Badge>}
        </IconButton>
        {productos.length > 0 && <ListaCart productos={productos} updateCart={updateCart}></ListaCart>}
      </MenuItem>
    </Menu>
  );


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    auth && (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
    )
    
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        <AddShoppingCartIcon sx={{mr: "4px"}} />
              {productos.length >0 &&<Badge sx={{mb: "20px"}} badgeContent={ productos.length} color="error">
              </Badge>}
        </IconButton>
        <p>Compras</p>
      </MenuItem>
      {auth ? (
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      ) : ( 
        <MenuItem onClick={handleProfileMenuOpenLogin}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Login</p>
      </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            E-commerce
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
            {/* Manejo de carrito en pantalla grande */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton size="large" 
           aria-label="show more"
           aria-controls={menuCartId}
           aria-haspopup="true"
           onClick={handleMenuCartOpen}
           color="inherit"> <AddShoppingCartIcon sx={{mr: "4px"}} />
              {productos.length >0 &&<Badge sx={{mb: "20px"}} badgeContent={ productos.length} color="error">
              </Badge>}
            </IconButton>
            </Box>
          {/* Manejo de carrito en pantalla mobiles */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton size="large" 
           aria-label="show more"
           aria-controls={mobileMenuCartId}
           aria-haspopup="true"
           onClick={handleMobileMenuCartOpen}
           color="inherit"> <AddShoppingCartIcon sx={{mr: "4px"}} />
           {productos.length >0 &&<Badge sx={{mb: "20px"}} badgeContent={ productos.length} color="error">
           </Badge>}
            </IconButton>
            </Box>
          
            {auth ? ( 
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}> 
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>):(
             <Box sx={{ display: { xs: 'none', md: 'flex' } }}> 
             <IconButton
               size="large"
               edge="end"
               aria-label="account of current user"
               aria-controls={menuId}
               aria-haspopup="true"
               onClick={handleProfileMenuOpen}
               color="inherit"
             >
              Login
             </IconButton>
           </Box>
          )}

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderMobileMenuCart}
      {renderMenuCart}
    </Box>
  );
}

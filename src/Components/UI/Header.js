import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import {logout} from "../../store/action/userActions";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
const Header =(props)=> {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const history = useHistory();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = ()=>{
    props.logout().then((result)=>{
      if(result){
        alert("logout successfully")
        history.push("/")
      }else{
        alert("something happened wrong")
      }
    })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Demo
          </Typography>
       
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {/* <AccountCircle /> */}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
                {
                   props.isLoggedIn &&( <IconButton onClick={handleLogout}>
                   <LogoutIcon />
                    </IconButton>)
                }  
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn : state.user.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
           logout,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);

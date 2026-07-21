import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Avatar from "@mui/material/Avatar";
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = "640438909208-e6tih9juu6j6n5579nhimik1nbs7jnj0.apps.googleusercontent.com";


export default function ProfileMenu({ handleLogin, handleLogout, userId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <div>

      <Avatar sx={{ height: '1.75em', width: '1.75em' }} onClick={handleClick} id="profile"></Avatar>
      <Menu
        id="profile-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      // sx={{width:"50px"}}
      >

        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          {userId ? (
            <>
              {/* <MenuItem onClick={() => {
                    handleClose();
                }} sx={{width:"8em"}}>
                    Profile
                </MenuItem> */}
              <MenuItem onClick={() => {
                handleClose();
                navigate("/projset/stats")
              }} sx={{ width: "8em" }}>
                Stats
              </MenuItem>
              <MenuItem
                className="NavBar-link NavBar-login"
                onClick={() => {
                  handleClose();
                  googleLogout();
                  handleLogout();
                  navigate("/projset/");
                }}
              >
                Logout
              </MenuItem>
            </>
          ) : (
            <MenuItem sx={{ width: "16em" }}>
              <GoogleLogin onSuccess={(c) => { handleClose(); handleLogin(c); }} onError={(err) => console.log(err)} />
            </MenuItem>
          )}
        </GoogleOAuthProvider>
      </Menu>
    </div>
  );
}
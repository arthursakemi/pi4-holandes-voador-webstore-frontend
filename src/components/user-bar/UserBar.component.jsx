import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './userBar.styles.scss';

import { Button, Menu, MenuItem } from '@material-ui/core';

const UserBar = ({ user, handleLogOut }) => {
  const [anchor, setAnchor] = useState(null);
  const history = useHistory();

  const handleNameClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleLoginClick = () => {
    history.push('/backoffice/login');
  };

  const redirectToUserList = () => {
    history.push('/backoffice/funcionarios');
  };

  const redirectToPasswordChange = () => {
    history.push('/backoffice/senha');
  };

  return (
    <div className="user-bar">
      {user.nome ? (
        <>
          <div className="right-container">
            <Button type="button" onClick={handleLogOut} color="inherit" size="small">
              Logout
            </Button>
            <span onClick={handleNameClick}>{user.nome}</span>
          </div>

          {user.cargo !== 'cliente' ? (
            <Button
              className="backoffice-button"
              type="button"
              onClick={redirectToUserList}
              variant="outlined"
              color="inherit"
              size="small"
            >
              BackOffice
            </Button>
          ) : (
            ''
          )}
        </>
      ) : (
        <Button type="button" onClick={handleLoginClick} variant="outlined" color="inherit" size="small">
          Login
        </Button>
      )}
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleClose} keepMounted>
        <MenuItem onClick={redirectToPasswordChange}>Alterar Senha</MenuItem>
      </Menu>
    </div>
  );
};

export default UserBar;

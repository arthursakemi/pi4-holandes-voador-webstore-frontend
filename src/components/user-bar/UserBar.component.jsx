import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

import './userBar.styles.scss';

const UserBar = ({ user, handleLogOut }) => {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push('/backoffice/login');
  };

  const redirectToUserList = () => {
    history.push('/backoffice');
  };

  return (
    <div className="user-bar">
      {user.nome ? (
        <>
          <div className="right-container">
            <Button type="button" onClick={handleLogOut} color="inherit" size="small">
              Logout
            </Button>
            <span>{user.nome}</span>
          </div>

          <Button className="backoffice-button" type="button" onClick={redirectToUserList} variant="outlined" color="inherit" size="small">
            BackOffice
          </Button>
        </>
      ) : (
        <Button type="button" onClick={handleLoginClick} variant="outlined" color="inherit" size="small">
          Login
        </Button>
      )}
    </div>
  );
};

export default UserBar;

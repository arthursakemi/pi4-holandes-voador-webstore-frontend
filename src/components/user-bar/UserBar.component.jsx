import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

import './userBar.styles.scss';

const UserBar = ({ user, handleLogOut }) => {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push('/backofice/login');
  };

  return (
    <div className="user-bar">
      {user.nome ? (
        <>
          <Button type="button" onClick={handleLogOut} color="inherit" size="small">
            Logout
          </Button>
          <span>{user.nome}</span>
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

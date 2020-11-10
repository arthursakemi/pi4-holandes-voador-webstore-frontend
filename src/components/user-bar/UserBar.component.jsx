import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './userBar.styles.scss';

import { Button, Menu, MenuItem, Badge, Popover, IconButton } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';

const UserBar = ({ user, handleLogOut, cart, setCart }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [cartAnchor, setCartAnchor] = useState(null);
  const history = useHistory();

  const handleNameClick = (e) => {
    setMenuAnchor(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleCartClick = (e) => {
    setCartAnchor(e.currentTarget);
  };

  const handleCloseCart = (e) => {
    setCartAnchor(null);
  };

  const handleLoginClick = () => {
    history.push('/login');
  };

  const redirectToUserList = () => {
    history.push('/backoffice/funcionarios');
  };

  const redirectToPasswordChange = () => {
    history.push('/backoffice/senha');
  };

  function redirectToEditUser() {
    history.push(`/cliente/editar/${user.id}`);
  }

  const isEmployee = user.cargo === 'admin' || user.cargo === 'estoquista';

  const getName = () => {
    if (!user.nome) return;
    const name = user.nome.split(' ');
    return `${name[0]} ${name[name.length - 1]}`;
  };

  return (
    <>
      <div className="user-bar">
        {isEmployee ? (
          <Button className="backoffice-button" type="button" onClick={redirectToUserList} variant="outlined" color="inherit" size="small">
            BackOffice
          </Button>
        ) : (
          <div />
        )}
        <div />
        <Badge className="cart-icon" badgeContent={cart.length} color="secondary">
          <ShoppingCartOutlined onClick={handleCartClick} />
        </Badge>
        {user.nome ? (
          <>
            <Button type="button" onClick={handleLogOut} color="inherit" size="small">
              Logout
            </Button>
            <span onClick={handleNameClick}>{getName()}</span>
          </>
        ) : (
          <Button type="button" onClick={handleLoginClick} variant="outlined" color="inherit" size="small">
            Login
          </Button>
        )}
      </div>
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleCloseMenu} keepMounted>
        <MenuItem onClick={redirectToPasswordChange}>Alterar Senha</MenuItem>
        {user.cargo === 'cliente' ? <MenuItem onClick={redirectToEditUser}>Alterar Dados</MenuItem> : ''}
      </Menu>
      <Popover
        open={Boolean(cartAnchor)}
        anchorEl={cartAnchor}
        onClose={handleCloseCart}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        The content of the Popover.
      </Popover>
    </>
  );
};

export default UserBar;

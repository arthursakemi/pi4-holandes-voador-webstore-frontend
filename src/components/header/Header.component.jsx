import React from 'react';
import { useHistory } from 'react-router-dom';

import './header.styles.scss';

import logo from '../../icons/logo.svg';

const Header = () => {
  const history = useHistory();
  const handleClick = (e) => {
    history.push('/');
  };

  return (
    <header className="header">
      <img className="logo" onClick={handleClick} src={logo} alt="" />
      <h1 className="title">Flying Dutchman</h1>
    </header>
  );
};

export default Header;

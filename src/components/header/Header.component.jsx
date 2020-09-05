import React from 'react';

import './header.styles.scss';

import logo from '../../icons/logo.svg';

const Header = () => {
  return (
    <header className='header'>
      <img className='logo' src={logo} alt='' />
      <h1 className='title'>Flying Dutchman</h1>
    </header>
  );
};

export default Header;

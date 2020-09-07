import React from 'react';

import './home.styles.scss';

import MenuItem from '../../components/menu-item/MenuItem.component';

import sections from './sections';

const HomePage = () => (
  <main className="home-page">
    <div className="home-container">
      {sections.map(({ id, ...otherProps }) => (
        <MenuItem key={id} {...otherProps} />
      ))}
    </div>
  </main>
);

export default HomePage;

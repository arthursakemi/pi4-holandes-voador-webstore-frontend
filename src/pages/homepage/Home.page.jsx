import React from 'react';

import './home.styles.scss';

import MenuItem from '../../components/menu-item/MenuItem.component';

import sections from './sections';

const HomePage = () => {
  return (
    <main className='home-page'>
      <div className='home-container'>
        {sections.map(({ id, ...props }) => (
          <MenuItem key={id} {...props} />
        ))}
      </div>
    </main>
  );
};

export default HomePage;

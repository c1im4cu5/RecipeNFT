import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import header from './images/header.png'

const Header = () => {
  return (
      <header className="header" style={{
                backgroundImage: `url(${header})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '100%',
                backgroundSize: 'cover',
                color: '#FFFFFF',
                margin: '16px 0 0'}}>
        <div className="header-overlay"></div>
        <div className="header-content" style={{ color: '#FFFFFF', paddingLeft: '15px', paddingRight: '15px' }}>
          <h1 style={{ color: '#FFFFFF', paddingLeft: '15px', paddingRight: '15px' }} >Welcome to RecipeNFT</h1>
          <p style={{ color: '#FFFFFF', paddingLeft: '15px', paddingRight: '15px' }} >Create a Lasting Legacy for your Family Recipes </p>
        </div>
      </header>
    );
};

export default Header;

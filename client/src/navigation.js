import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Logo from './images/logo.png';

class NavbarScroll extends Component {
  state = {
    isSmallScreen: false,
    isNavOpen: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const isSmallScreen = window.innerWidth < 1000;
    this.setState({ isSmallScreen });
  };

  toggleNav = () => {
    this.setState((prevState) => ({
      isNavOpen: !prevState.isNavOpen,
    }));
  };

  closeNav = () => {
    this.setState({
      isNavOpen: false,
    });
  };

  render() {
    const { isSmallScreen, isNavOpen } = this.state;

    return (
      <nav className="navbar fixed-top navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="/" style={{ color: 'white' }}>
            <img src={Logo} width={50} height={50} alt="Logo" />
            RecipeNFT
          </a>
          {isSmallScreen ? (
            <button
              className="navbar-toggler"
              type="button"
              onClick={this.toggleNav}
            >
              <span className="navbar-toggler-icon" />
            </button>
          ) : (
            <div className="collapse navbar-collapse justify-content-end">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link nav-link-shrink"
                    href="/"
                    style={{ color: 'white' }}
                    onClick={this.closeNav}
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link nav-link-shrink"
                    href="/vision"
                    style={{ color: 'white' }}
                    onClick={this.closeNav}
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link nav-link-shrink"
                    href="/login"
                    style={{ color: 'white' }}
                    onClick={this.closeNav}
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link nav-link-shrink"
                    href="/search"
                    style={{ color: 'white' }}
                    onClick={this.closeNav}
                  >
                    Search
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link nav-link-shrink"
                    href="/contact"
                    style={{ color: 'white' }}
                    onClick={this.closeNav}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          )}
          {isSmallScreen && isNavOpen && (
            <div className="navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/"
                    style={{ color: 'white' }}
                    onClick={this.closeNav}
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/vision"
                    style={{ color: 'white' }}
                    onClick={this.closeNav}
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/login"
                    style={{ color: 'white' }}
                    onClick={this.closeNav}
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/search"
                    style={{ color: 'white' }}
                    onClick={this.closeNav}
                  >
                    Search
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/contact"
                    style={{ color: 'white' }}
                    onClick={this.closeNav}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

export default NavbarScroll;

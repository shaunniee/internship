import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearall } from '../../actions/restaurants';
const Layout = ({ clearall,children, match, history }) => {
  const isActive = (path) => {
    if (match.path === path) {
      return { backgroundColor: '#145374' };
    }
    // } else {
    //   return { backgroundColor: '#10375c' };
    // }
  };

  function openNav() {
    document.getElementById('mySidenav').style.width = '250px';
    document.getElementById('overlay').style.width = '100%';
  }

  function closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('overlay').style.width = '0';
    document.body.style.backgroundColor = 'white';
  }

  const clear = () => {
    localStorage.removeItem('user');
    clearall();
    history.push('/signup');
  };

  const nav = () => (
    <ul className='nav'>
      <div className='nav-cont'>
        <li className='brand'>
          <Link to='/'>Fastor</Link>
        </li>
        <div className='right-nav'>
         {localStorage.getItem("user") && <li style={isActive('/')}>
            <Link to='/'>
              <i className='fas fa-home'></i>{' '}
            </Link>
          </li>}

        { localStorage.getItem('user') &&<li>
            <i onClick={openNav} className='fas fa-bars'></i>
          </li>}
        </div>
      </div>
    </ul>
  );

  return (
    <Fragment>
      {nav()}
{localStorage.getItem("user") &&
      <Fragment>
        <div id='mySidenav' className='sidenav'>
          <Link to='' className='closebtn' onClick={closeNav}>
            &times;
          </Link>
          <span onClick={clear}>
            <i className='fas fa-sign-out-alt'></i>Logout
          </span>
        </div>
        <div className='overlay' id='overlay' onClick={closeNav}></div>
        </Fragment>}
        <div className='container'>{children}</div>
      
    </Fragment>
  );
};

export default withRouter(connect(null, { clearall })(Layout));

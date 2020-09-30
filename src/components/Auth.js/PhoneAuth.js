import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRestaurants, register } from '../../actions/restaurants';
import Layout from '../Layout/Navbar';
const PhoneAuth = ({
  getRestaurants,
  register,
  history,
  restaurants: { restaurants },
}) => {
  const [reg, setReg] = useState({
    phone: '',
    dial_code: '+91',
  });
  const { phone, dial_code } = reg;
  useEffect(() => {}, []);

  const handleChange = (e) => {
    setReg({ ...reg, [e.target.name]: e.target.value.toString() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone !== '' && dial_code !== '') {
      register(reg, history);
    }
  };
  return (
    <Layout>
      <div className='container1'>
        {localStorage.getItem('user') && <Redirect to='/' />}
        <form onSubmit={handleSubmit} className='form'>
          <i class='far fa-user'></i>
          <h1>SignIn</h1>
          <div className='inp'>
            <input
              name='dial_code'
              onChange={handleChange}
              type='text'
              value={dial_code}
              placeholder='Country code'
              required
              style={{ width: '40px' }}
            ></input>
            <input
              name='phone'
              onChange={handleChange}
              type='number'
              value={phone}
              placeholder='Phone number'
              required
            ></input>
          </div>
          <input type='submit' value='submit' />
        </form>
      </div>
    </Layout>
  );
};

PhoneAuth.propTypes = {
  getRestaurants: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  restaurants: state.restaurants,
});
export default connect(mapStateToProps, {
  getRestaurants,
  register,
})(PhoneAuth);

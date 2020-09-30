import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRestaurants, register, log } from '../../actions/restaurants';
import Navbar from '../Layout/Navbar';
const PhoneVerify = ({
  getRestaurants,
  register,
  log,
  history,
  restaurants: { restaurants, regg },
}) => {
  const [reg, setReg] = useState({
    otp: '',
    phone: regg && regg.phone,
    dial_code: regg && regg.dial_code,
  });
  const { phone, dial_code, otp } = reg;
  useEffect(() => {}, []);

  const handleChange = (e) => {
    setReg({ ...reg, [e.target.name]: e.target.value.toString() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    log(reg, history);
  };
  return (
    <Navbar>
      <div className='container1'>
        {localStorage.getItem('user') && <Redirect to='/' />}
        <form onSubmit={handleSubmit} className='form'>
          <h1>SignIn</h1>
          <div className='inp'>
            <input
              name='otp'
              onChange={handleChange}
              type='text'
              value={otp}
              placeholder='Otp'
              required
            ></input>
          </div>
          <input type='submit' value='submit' />
        </form>
      </div>
    </Navbar>
  );
};

PhoneVerify.propTypes = {
  getRestaurants: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  restaurants: state.restaurants,
});
export default connect(mapStateToProps, {
  getRestaurants,
  register,
  log,
})(PhoneVerify);

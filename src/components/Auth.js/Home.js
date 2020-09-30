import React, { useEffect, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRestaurants } from '../../actions/restaurants';
import Navbar from '../Layout/Navbar';
const Home = ({ getRestaurants, restaurants: { restaurants } }) => {
  useEffect(() => {
    getRestaurants();
  }, []);
  return (
    <Navbar>
      <Fragment>
        <div>{!localStorage.getItem('user') && <Redirect to='/signup' />}</div>

        {restaurants &&
          restaurants.map((p) => (
            <Link to={`/restaurant/${p.restaurant_id}`}>
              <div className='rest-cont'>
                <div className='image'>
                  <img
                    style={{ height: '200px' }}
                    src={p.thumbnail_image}
                    alt='image'
                  />
                </div>
                <div className='details'>
                  <h3>{p.restaurant_name}</h3>
                  <p className='loc'>
                    <span>{p.location.location_locality},</span>
                    <span>{p.location.city_name},</span>
                    <span>{p.location.state_name},</span>
                  </p>
                  <p className='rating'>
                    <span><i class="fas fa-star"></i> {p.rating.restaurant_avg_rating}</span>
                    <span>${p.avg_cost_for_two}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </Fragment>
    </Navbar>
  );
};

Home.propTypes = {
  getRestaurants: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  restaurants: state.restaurants,
});
export default connect(mapStateToProps, {
  getRestaurants,
})(Home);

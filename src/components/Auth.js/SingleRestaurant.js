import React, { useEffect, Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRestaurants } from '../../actions/restaurants';
import Navbar from '../Layout/Navbar';
import Overlay from 'react-image-overlay';
import watermark from 'watermarkjs';

const SingleRestaurant = ({
  getRestaurants,
  match,
  restaurants: { restaurants },
}) => {
  useEffect(() => {
    if (!restaurants) {
      getRestaurants();
    }

    restaurants && restau();
  }, [restaurants]);

  const [res, setRes] = useState('');
  const restau = () => {
    const sing = restaurants.filter((p) => p.restaurant_id === match.params.id);

    setRes(sing);
  };

  const share = (img, name) => {
    if (navigator.share) {
      navigator
        .share({
          title: `${name}`,
          text: 'Explore',
          url: `${img}`,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      console.log('Web Share API is not supported in your browser.');
    }
  };
  return (
    <Navbar>
      <Fragment>
        <div>{!localStorage.getItem('user') && <Redirect to='/signup' />}</div>
        {res && (
          <div className='lolo' style={{ marginTop: '2rem' }}>
            <div id='col'>
              <Overlay
                url={`${res[0].image}`} // required
                overlayUrl='https://res.cloudinary.com/shaunniee/image/upload/v1601470137/Fastor_Logo_slpbxx.png' // required
                imageHeight={200}
                position={'bottomRight'}
                overlayWidth={50}
                overlayHeight={50}
                overlayPadding={10}
                watermark={false}
              />
            </div>
            <p style={{ marginTop: '1rem', fontSize: '1.5rem' }}>
              {res[0].restaurant_name}
            </p>
            {navigator.share && (
              <button
                onClick={() => share(res[0].image, res[0].restaurant_name)}
              >
                Share
              </button>
            )}
          </div>
        )}
      </Fragment>
    </Navbar>
  );
};

SingleRestaurant.propTypes = {
  getRestaurants: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  restaurants: state.restaurants,
});
export default connect(mapStateToProps, {
  getRestaurants,
})(SingleRestaurant);

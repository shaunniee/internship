import { REGISTER, REST, CLEAR } from './types';
import axios from 'axios';
import qs from 'qs';
const token = JSON.parse(localStorage.getItem('user'));
export const getRestaurants = () => async (dispatch) => {
  try {
    const res = await axios.get(
      'https://staging.fastor.in:8090/v1/m/restaurant?city_id=118&&',
      {
        headers: {
          Authorization: `Bearer ${token.data.token}`,
        },
      }
    );
    dispatch({ type: REST, payload: res.data });
    // history.push('/signin');
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const register = (formData, history) => async (dispatch) => {
  try {
    console.log(formData.phone, formData.dial_code);
    const data = qs.stringify({
      phone: `${formData.phone}`,
      dial_code: `${formData.dial_code}`,
    });

    const res = await axios.post(
      'https://staging.fastor.in:8090/v1/pwa/user/register',
      data,
      { headers: { 'Content-type': 'application/x-www-form-urlencoded' } }
    );
    dispatch({ type: REGISTER, payload: formData });
    history.push('/signin');
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const log = (formData, history) => async (dispatch) => {
  try {
    console.log(formData.phone, formData.dial_code);
    const data = qs.stringify({
      phone: `${formData.phone}`,
      dial_code: `${formData.dial_code}`,
      otp: `${formData.otp}`,
    });

    const res = await axios.post(
      'https://staging.fastor.in:8090/v1/pwa/user/login',
      data,
      { headers: { 'Content-type': 'application/x-www-form-urlencoded' } }
    );
    dispatch({ type: REGISTER, payload: formData });
    localStorage.setItem('user', JSON.stringify(res.data));
    history.push('/');
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const clearall = () => async (dispatch) => {
  dispatch({ type: CLEAR });
};

import React, { useState, useEffect, Fragment } from 'react';
import { Switch, Route, withRouter, BrowserRouter } from 'react-router-dom';
import PhoneAuth from './components/Auth.js/PhoneAuth';
import PhoneVerify from './components/Auth.js/PhoneVerify';
import Home from './components/Auth.js/Home';
import SingleRestaurant from './components/Auth.js/SingleRestaurant';
import PrivateRoute from './components/Auth.js/PrivateRoute';
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/signup' component={PhoneAuth} />
          <Route exact path='/signin' component={PhoneVerify} />
          <PrivateRoute exact path='/' component={Home} />
          <Route exact path='/restaurant/:id' component={SingleRestaurant} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

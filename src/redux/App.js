// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import CartScreen from '../navigation/TabNavigator/Cart/Cart';


export default function App() {
  return (
    <Provider store={store}>
      <CartScreen />
    </Provider>
  );
}

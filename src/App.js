import { useDispatch } from 'react-redux';
import { Home } from './routes/home/home';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './routes/navigation/navigation';
import { Authentication } from './routes/authentication/authentication';
import { Shop } from './routes/shop/shop';
import { Checkout } from './routes/checkout/checkout';
import { useEffect } from 'react';
import {
  createUserDocFromAuth,
  onAuthStateChangedListener,
} from './utils/firebase/firebase.utils';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocFromAuth(user);
      }
      dispatch({
        type: 'user/SET_CURRENT_USER',
        payload: user,
      });
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;

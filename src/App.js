import { Route, Routes } from 'react-router-dom';
import Authentication from './pages/Authentication/Authentication';
import HomePage from './HomePage/HomePage';
import Message from './Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfileAction } from './Redux/Auth/auth.action';
import { ThemeProvider } from '@mui/material';
import { darkTheme } from './Theme/DarkTheme';

function App() {
  
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector(store=>store);

  useEffect(()=>{
    dispatch(getProfileAction(jwt));
},[jwt,dispatch])

  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route path='/*' element={auth.user? <HomePage />:<Authentication /> } />
        <Route path='/message' element={ <Message /> } />
        <Route path='/*' element={ <Authentication /> } />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

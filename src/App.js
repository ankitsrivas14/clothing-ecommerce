//REACT
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

//REDUX
import { useDispatch } from 'react-redux'
import {checkUserSession } from './store/user/user.action'

//COMPONENTS
import Home from './routes/Home/Home'
import Navigation from './components/navigation/Navigation'
import Auth from './components/auth/Auth'
import Shop from './routes/Shop/Shop.jsx'
import Checkout from './routes/Checkout/Checkout'



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/shop/*' element={<Shop />} />
        <Route path='sign-in' element={<Auth />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App
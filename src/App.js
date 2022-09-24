//REACT
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

//REDUX
import { setCurrentUser } from './store/user/user.action'
import { useDispatch } from 'react-redux'

//COMPONENTS
import Home from './routes/Home/Home'
import Navigation from './components/navigation/Navigation'
import Auth from './components/auth/Auth'
import Shop from './routes/Shop/Shop.jsx'
import Checkout from './routes/Checkout/Checkout'

//FIREBASE
import { onAuthStateChangedListener, createUserDocumentFromAuth, signOutUser } from "./utils/firebase/firebase";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if(user){
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    })

    return unsubscribe;
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
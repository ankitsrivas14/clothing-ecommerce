//REACT
import { Routes, Route } from 'react-router-dom'

//COMPONENTS
import Home from './routes/Home/Home'
import Navigation from './components/navigation/Navigation'
import Auth from './components/auth/Auth'
import Shop from './routes/Shop/Shop.jsx'
import Checkout from './routes/Checkout/Checkout'

//CSS
import './categories.styles.scss'

function App() {
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
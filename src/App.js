//REACT
import { Routes, Route } from 'react-router-dom'

//COMPONENTS
import Home from './routes/Home/Home'
import Navigation from './components/navigation/Navigation'
import Auth from './components/auth/Auth'

//CSS
import './categories.styles.scss'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='sign-in' element={<Auth />} />
      </Route>
    </Routes>
  )
}

export default App
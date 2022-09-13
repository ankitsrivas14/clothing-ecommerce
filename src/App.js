//REACT
import { Routes, Route } from 'react-router-dom'

//COMPONENTS
import Home from './routes/Home/Home'
import Navigation from './components/navigation/Navigation'
import SignIn from './components/sign-in/SignIn'

//CSS
import './categories.styles.scss'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  )
}

export default App
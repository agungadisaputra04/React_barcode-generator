import { Routes, Route } from 'react-router-dom'

import NavbarComponent from './components/NavbarComponent'
// import FaqComponent from './components/FaqComponent'
import FooterComponent from './components/FooterComponent'

import HomePage from './pages/HomePage'
import ThanksPage from './pages/ThanksPage'


function App() {
  return <div>

  <NavbarComponent/>

    <Routes>
      <Route path='/' Component={HomePage}></Route>
      <Route path='/thanks' Component={ThanksPage}></Route>
    </Routes>

    <FooterComponent/>
  </div>
  }

export default App

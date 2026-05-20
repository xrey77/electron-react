import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Header from './components/Header';
import Aboutus from './components/Aboutus';
import Contactus from './components/Contactus'
import './App.css'

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<Contactus />} />
      </Routes>
    </HashRouter>
  )
}

export default App

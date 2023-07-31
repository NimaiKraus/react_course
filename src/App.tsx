import { BrowserRouter } from 'react-router-dom';

import './App.css'

import Router from './Router/Router';
import { Footer, Navbar } from './components';

function App() {

  return (
    <BrowserRouter>
      <div className='page'>
        <Navbar />
        <Router />
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;

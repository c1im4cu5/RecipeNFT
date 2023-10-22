import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavScroll from './navigation';
import Header from './header';
import Footer from './footer';
import Home from './home';
import Vision from './vision';
import Login from './login';
import HowItWorks from './works';
import TokenDetails from './TokenDetails';
import ContactPage from './contact';
import Terms from './terms';
import Search from './search';
import Press from './press';
import './App.css';

class App extends Component {
state = {
    data: null
  };

  render() {
    return (

      <Router>
        <NavScroll />
        <Header />
        <Routes>
            <Route exact path='/' exact element={<Home/>} />
            <Route path='/vision' element={<Vision/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/search' element={<Search/>} />
            <Route path='/contact' element={<ContactPage/>} />
            <Route path='/press' element={<Press/>} />
            <Route path='/works' element={<HowItWorks/>} />
            <Route path='/terms' element={<Terms/>} />
            <Route path='/token/:contract/:tokenId' element={<TokenDetails />} />
        </Routes>
        <Footer />
      </Router>
    );
  }

}
export default App;

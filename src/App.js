import './App.css';
import Home from './components/Home'
import Aboutus from './components/Aboutus'
import Myorders from './components/Myorders'
import Hotelpage from './components/Hotelpage'
import Terms from './components/Terms'
import Privacy from './components/Privacy'
import Guest from './components/Guest'
import Cancellation from './components/Cancellation'
import Contactus from './components/Contactus'
import Reviews from './components/Reviews'
import Adminpanel from './components/Adminpanel';
import Payment from './components/Payment';
import { Route, Routes } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";
import LoggedIn from './components/LoggedIn';
function App() {
  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/logged/:code' element={<LoggedIn />} />
          <Route exact path='/aboutus' element={<Aboutus/>} />
          <Route exact path='/myorders' element={<Myorders/>} />
          <Route exact path='/terms' element={<Terms/>} />
          <Route exact path='/privacy' element={<Privacy/>} />
          <Route exact path='/guest' element={<Guest/>} />
          <Route exact path='/cancellation' element={<Cancellation/>} />
          <Route exact path='/contactus' element={<Contactus/>} />
          <Route exact path='/reviews/:id' element={<Reviews/>} />
          <Route path='/hotelpage/:id' element={<Hotelpage />} />
          <Route path='/adminpanel/:code' element={<Adminpanel />} />
          <Route path='/payment/:id' element={<Payment />} />
        </Routes>
      </ScrollToTop>
    </>
  );
}

export default App;

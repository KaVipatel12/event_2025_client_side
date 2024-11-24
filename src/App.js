import './App.css';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TechnicalEvents from './components/TechnicalEvents';
import NonTechnicalEvents from './components/NonTechnicalEvents';
import TechEventPage from './components/TechEventPage';
import NonTechEventPage from './components/NonTechEventPage';
import CartPage from './components/CartPage';
import Login from './components/Login';
import Registration from './components/Registration';
import Logout from './components/Logout';
import Profile from './components/Profile';
import TechOwner from './components/TechOwner';
import NonTechOwner from "./components/NonTechnicalOwner"
import EmailAuth from './components/EmailAuth';
import OtpAuth from './components/OtpAuth';
import ChangePassword from './components/ChangePassword';
import ParticipantList from './components/ParticipantList';
import CardInfoEdit from './components/CardInfoEdit';

function App() {
  return (
    <>
    <BrowserRouter >
      <Routes>
        < Route path='/' element={< Home/>}/>
        < Route path='/home' element={< Home/>}/>
        < Route path='/technicalevents' element={< TechnicalEvents/>}/>
        < Route path='/nontechnicalevents' element={< NonTechnicalEvents/>}/>
        < Route path='/technicalevents/:technicalevent' element={< TechEventPage/>}/>
        < Route path='/nontechnicalevents/:nontechnicalevent' element={< NonTechEventPage/>}/>
        < Route path='/cart' element={< CartPage/>}/>
        < Route path='/login' element={< Login/>}/>
        < Route path='/logout' element={< Logout/>}/>
        < Route path='/register' element={< Registration/>}/>
        < Route path='/profile' element={< Profile/>}/>
        < Route path='/addtechevent' element={< TechOwner/>}/>
        < Route path='/addnontechevent' element={< NonTechOwner/>}/>
        < Route path='/verifyemail' element={< EmailAuth />}/>
        < Route path='/verifyotp' element={< OtpAuth />}/>
        < Route path='/user/update/updatepassword' element={< ChangePassword />}/>
        < Route path='/participantlist' element={< ParticipantList />}/>
        < Route path='/event/updateinfo/:eventId' element={< CardInfoEdit />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

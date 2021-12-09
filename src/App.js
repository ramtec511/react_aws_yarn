import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import Login from './components/Login';
//import Inicio from './components/Inicio';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nomatch from './components/Nomatch';
import Privadas from './routes/Privadas';
import {getIsLoggedIn} from './utils'
//import {getIsLoggedIn} from './utils'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Inicio" element={<Privadas isAuthenticated={getIsLoggedIn()}/>} />
        <Route path="/este" element={<Navigate to="/" />} />
        <Route path="/acas" element={<Privadas isAuthenticated={getIsLoggedIn()}/>} />
        <Route path="*" element={< Nomatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

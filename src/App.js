import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import Login from './components/Login';
import Inicio from './components/Inicio';
import Nomatch from './components/Nomatch';
//import {getIsLoggedIn} from './utils'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/este" element={<Navigate to="/" />} />
        <Route path="*" element={< Nomatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

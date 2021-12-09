import { Navigate } from 'react-router-dom';
import Inicio from '../components/Inicio';
//import Nomatch from '../components/Nomatch';
function Rutasprivadas({ isAuthenticated }) {
    if (isAuthenticated) {
        return (
            <Inicio/>
        )
    } else {
        return (
            <Navigate to='/'/>
        )
    }

}
export default Rutasprivadas;
import React from 'react';
import {Link} from 'react-router-dom';

class Nomatch extends React.Component {
    render() { 
        return (
            <div className="container text-center">
                <h1 className="text-warning">
                   404 
                </h1>
                <h3>Pagina no encontrada</h3>
                <br/>
                <Link to={'/'}>volver a inicio</Link>
            </div>
        );
    }
}
 
export default Nomatch;
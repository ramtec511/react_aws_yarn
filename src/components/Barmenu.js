import React from 'react';

class Barmenu extends React.Component {
    cerrarses = async () => {
        localStorage.removeItem('_otrj');
        localStorage.removeItem('_gdh');
        localStorage.removeItem('_fres');
        localStorage.removeItem('isLoggedIn'); 
        window.location.href='/'
        //location.href='/'
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-info">
                <div className="container-fluid">
                    {'   '}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active">Inico</a>
                            </li>
                            {/*<li className="nav-item">
                                <a className="nav-link" href="#">Editar</a>
                            </li>*/}

                        </ul>

                        <div className="d-flex">
                            <ul className="navbar-nav me-auto mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link" >{'usuario: '}&nbsp; &nbsp;</a>
                                </li>
                            </ul>
                            <button className="btn btn-outline-dark" type="button" onClick={()=>this.cerrarses()}>cerrar sesion</button>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Barmenu;
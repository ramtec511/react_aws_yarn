import React from 'react';
import Peticiones from '../controllers/LogPeticiones'

class Login extends React.Component {
    state = {
        loguearse: {
            usuario: '',
            pass: ''
        }
    }
    en_cambio = (e) => {
        this.setState({
            loguearse: {
                ...this.state.loguearse,
                [e.target.name]: e.target.value
            }
        })
    }

    enviar = async (e) => {
        e.preventDefault();
        console.log(this.state.loguearse);
        await Peticiones.post_log('login', this.state.loguearse).then(res => {
            console.log(res.data);
            if (res.data.status===200) {
                localStorage.setItem('_fres',JSON.stringify(res.data.datos));
            localStorage.setItem('isLoggedIn','true');
            window.location.href='/Inicio'
            } else {
                alert('contraseña incorrecta')
            }
            /*localStorage.setItem('_fres',JSON.stringify(res.data.datos));
            localStorage.setItem('isLoggedIn','true');
            window.location.href='/Inicio'*/
        }).catch(err => {
            console.log(err);
            alert("no se pudo conectar al servidor")
        })
    }
    render() {
        return (
            <div className="container flex">
                <br />
                <br />
                <br />
                <br />
                <br />
                <form onSubmit={(e) => this.enviar(e)}>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">usuario</label>
                            <input type="text" name="usuario" className="form-control" id="exampleInputEmail1"  required onChange={(e) => this.en_cambio(e)} />
                            <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                            <input type="password" name="pass" className="form-control" id="exampleInputPassword1" required onChange={(e) => this.en_cambio(e)} />
                            <br />
                            <button type="submit" className="btn btn-primary">enviar</button>
                        </div>                       
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;

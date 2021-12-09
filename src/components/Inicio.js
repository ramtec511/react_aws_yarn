import React from 'react'
import Barmenu from './Barmenu';
import '../stilos/scroll.css'
import Nuevodoc from './Nuevodoc';
import Leer from '../controllers/Leerpeticiones'
import Leerdoc from './Leerdoc';
import { Collapse } from 'reactstrap';
import Renderizadoc from './Renderizadoc';
//import Editardoc from './Editardoc';

class Inicio extends React.Component {
    state = {
        losdocs: [],
        otro_fil: [],
        buscar: '',
        nuevo_most: false,
        ver_most: false,
        ver_edit: false,
        render_ver: false,
        contenido_regis: {},
        autores: {},
        histo_cam: []
    }

    componentDidMount = async () => {
        await Leer.obt_all().then(res => {
            console.log(res.data);
            this.setState({
                otro_fil: res.data.datos,
                losdocs: res.data.datos
            })
        }).catch(err => {
            console.log(err);
        });
    }
    auto_busc = async (e) => {
        e.persist();
        await this.setState({ buscar: e.target.value });
        //this.busqueda_doc();
    }

    busqueda_doc = async (e) => {
        e.preventDefault();
        var actividadesShow = [];
        /*let arrBusqueda = this.state.buscar.split(",");
        actividadesShow = this.state.losdocs.filter((item) => {
            let a = arrBusqueda.map((valor) => {
                return JSON.stringify(item).toUpperCase().indexOf(valor.toUpperCase()) > -1 ? 1 : 0;
            }).reduce((x, y) => x + y);
            return a > 0;
        })*/
        actividadesShow = this.state.losdocs.filter((item) => {
            if (item.titulo.includes(this.state.buscar)) {
                return item;
            }
        })

        this.setState({
            ...this.state.otro_fil,
            otro_fil: actividadesShow.slice(0, 5)
        })
    }

    mostrar_con = async (elitem = {}, aut = {}, hist = []) => {
        this.setState({
            nuevo_most: false,
            ver_edit: false,
            render_ver: false,
            ver_most: true,
            contenido_regis: elitem,
            autores: aut,
            histo_cam: hist
        })
    }

    editarlo = async () => {
        this.setState({
            nuevo_most: false,
            ver_most: false,
            render_ver:false,
            ver_edit: true
        })
    }

    cancelalo = () => {
        this.setState({
            nuevo_most: false,
            ver_most: false,
            render_ver:false,
            ver_edit: false
        })
    }

    canc_edit = () => {
        this.setState({
            nuevo_most: false,
            ver_most: true,
            ver_edit: false,
            render_ver:false,
        })
    }

    canc_render = () => {
        this.setState({
            nuevo_most: false,
            ver_most: false,
            ver_edit: false,
            render_ver:true,
        })
        this.componentDidMount()
    }
    render() {
        return (
            <>

                <Barmenu />
                <br />
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-4 span6">
                            <form className="d-flex" onSubmit={(e) => this.busqueda_doc(e)}>
                                <input className="form-control me-2" type="text" placeholder="Buscar" onChange={(e) => this.auto_busc(e)} required />
                                <button className="btn btn-outline-success" type="submit">buscar</button>
                            </form>
                            <br />
                            <button className="btn btn-outline-primary" type="button" onClick={() => this.setState({ nuevo_most: true, ver_most: false, ver_edit: false })}>agregar nuevo</button>
                            <br /><br /><br />
                            <div className="elscrooll">
                                {
                                    this.state.otro_fil.length > 0 ?
                                        this.state.otro_fil.map((item, ini) => {
                                            return (
                                                <ul className="list-group" key={ini}>
                                                    <button type="button" className="list-group-item list-group-item-action" onClick={() => this.mostrar_con(item, item.autor, item.historial_cambios)} key={ini}>
                                                        {item.titulo}
                                                    </button>
                                                </ul>
                                            )
                                        }) :
                                        <ul className="list-group">
                                            <button type="button" className="list-group-item list-group-item-action" >
                                                no hay documentos
                                            </button>
                                        </ul>
                                }
                            </div>

                        </div>
                        <div className="col-md-8">
                            {/*<Nuevodoc />*/}
                            <Collapse isOpen={this.state.ver_most || this.state.ver_edit}>
                                <Leerdoc ediabre={this.state.ver_edit} muestr={this.state.ver_most} datos={this.state.contenido_regis} autores={this.state.autores} hist={this.state.histo_cam} parcancel={this.cancelalo} haber={() => this.editarlo()} editcan={() => this.canc_edit()} verender={this.canc_render}/>
                            </Collapse>
                            <Collapse isOpen={this.state.nuevo_most}>
                                <Nuevodoc verender={this.canc_render}/>
                            </Collapse>
                            <Collapse isOpen={this.state.render_ver}>
                                <Renderizadoc arcancel={this.cancelalo}/>
                            </Collapse>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

export default Inicio;
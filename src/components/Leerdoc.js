import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Collapse } from 'reactstrap';
import Lerrpet from '../controllers/Leerpeticiones';
import Editpet from '../controllers/Editapeticiones'


class Leerdoc extends React.Component {
    state = {
        en_mardown: '',
        colap_hist: false,
        colap_edit: false,
        colap_ver: true,
        el_doc: {
            _id: "",
            titulo: "",
            documento: "",
            autor: {
                usuario: "",
                nombre: ""
            },
            modificado_por: {
                usuario: "",
                nombre: ""
            },
            fecha_creacion: "",
            fecha_modificacion: "",
            historial_cambios: []
        }
    }
    cargar = (e) => {
        console.log(e.target.files[0]);
        if (e.target.files[0]) {
            const archi = e.target.files[0]
            const leer = new FileReader();
            /*leer.onload=((ache)=>{
                let contenido=ache.target.result
                this.setState({
                    contenido_md:contenido
                })
            })()*/
            leer.readAsText(archi);
            leer.onload = () => {
                console.log(leer.result);
                this.setState({
                    el_doc: {
                        ...this.state.el_doc,
                        documento: leer.result,
                        titulo: archi.name
                    }
                })
            }
            leer.onerror = () => {
                console.log(leer.error);
                this.setState({
                    el_doc: {
                        ...this.state.el_doc,
                        documento: "documento dañado",
                        titulo: archi.name
                    }
                })
            }
        } else {
            this.setState({
                el_doc: {
                    ...this.state.el_doc,
                    documento: "no hay nada"
                }
            })
        }
    }
    en_cambio = (e) => {

        this.setState({
            el_doc: {
                ...this.state.el_doc,
                [e.target.name]: e.target.value
            }
        })
    }

    checar_doc = async (mid) => {
        await Lerrpet.solo_uno(mid).then(res => {
            this.setState({
                el_doc: res.data.datos,
                colap_edit: true,
                colap_hist: false
            })
            this.props.haber();
            console.log(res.data);
        }).catch(err => {
            console.log(err);
            alert('no se pudo conectar con el servidor')
        })
    }
    guardar = async (e) => {
        e.preventDefault();
        console.log(this.state.el_doc);
        const usdat = JSON.parse(localStorage.getItem('_fres'));
        const fech = new Date();
        var docnew = {
            titulo: this.state.el_doc.titulo,
            documento: this.state.el_doc.documento,
            modificado_por: { usuario: usdat.usuario, nombre: usdat.nombre },
            fecha_modificacion: fech.toISOString().split('T')[0]
        }
        //console.log(docnew);
        await Editpet.edita_doc(this.state.el_doc._id, docnew).then(res => {
            console.log(res.data);
            if (res.data.status == 200) {
                localStorage.setItem('_otrj', docnew.documento);
                localStorage.setItem('_gdh', docnew.titulo);
                this.props.verender();
            } else {
                alert("error al enviar los datos");
                console.log(res.data);
            }
        }).catch(err => {
            console.log(err);
            alert("no se encuentra el servidor")
        });
    }
    render() {
        //const este = "## Description\n\n[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.\n\n## Installation\n\n```bash\n$ npm install\n```\n\n## Running the app"
        return (
            <>
                <div className="bg-info">
                    <br />
                    <Collapse isOpen={this.props.muestr}>
                        <div className="d-flex justify-content-center">
                            {/*<button className="btn btn-dark me-5" type="button">Editar</button>*/}
                            <button className="btn btn-dark me-5" type="button" onClick={() => this.checar_doc(this.props.datos._id)}>Editar</button>
                            <button className="btn btn-dark me-5" type="button" onClick={this.props.parcancel}>Cancelar</button>
                        </div>
                        <br />

                        <div className="container text-center">
                            <div className="mb-3 bg-dark text-light">
                                <label htmlFor="exampleInputEmail1" className="form-label">Titulo del documento</label>
                                <h3 id="exampleInputEmail1">{this.props.datos.titulo}</h3>
                            </div><br />
                            <div className="mb-3">
                                <ReactMarkdown children={this.props.datos.documento} remarkPlugins={[remarkGfm]} />
                                {/*<ReactMarkdown children={este} remarkPlugins={[remarkGfm]} />*/}
                            </div>
                        </div>

                        <div className="row justify-content-md-center">
                            <div className="col-md-5">
                                <table className="table table-striped table-dark">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Autor</th>
                                            <td>{this.props.autores.nombre}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">fecha creacion</th>
                                            <td>{this.props.datos.fecha_creacion}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">fecha modificacion</th>
                                            <td>{this.props.datos.fecha_modificacion}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="container text-center">
                            <button type="button" className="btn btn-link" onClick={() => this.setState({ colap_hist: !this.state.colap_hist })}>mostrar historial de cambios</button>
                            <br />
                            <br />
                            <Collapse isOpen={this.state.colap_hist}>
                                <div className="elscrooll">
                                    {
                                        this.props.hist.length > 0 ?
                                            this.props.hist.map((item, ini) => {
                                                return (
                                                    <ul className="list-group" key={ini}>
                                                        <a className="list-group-item list-group-item-action" key={ini}>
                                                            {item.fecha_server} // {item.autor_cambio.usuario}
                                                        </a>
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
                            </Collapse>
                        </div>
                    </Collapse>
                    {/* collapse editar */}
                    <Collapse isOpen={this.props.ediabre}>
                        <div className="d-flex justify-content-center">
                            <label className="btn btn-dark me-5">
                                Subir Doc. <input type="file" hidden accept='.md' onChange={(e) => this.cargar(e)} />
                            </label>
                            {/*<button className="btn btn-dark me-5" type="button">Editar</button>*/}
                            <button className="btn btn-dark me-5" type="submit" form="editaForm">Guardar</button>
                            <button className="btn btn-dark me-5" type="button" onClick={() => this.props.editcan()}>Cancelar</button>
                        </div>
                        <br />

                        <div className="d-flex justify-content-center">
                            <form id="editaForm" onSubmit={(e) => this.guardar(e)}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Titulo del documento</label>
                                    <input type="text" name="titulo" value={this.state.el_doc.titulo} className="form-control" id="exampleInputEmail1" required onChange={(e) => this.en_cambio(e)} />
                                </div>
                                <div className="mb-3">
                                    <div className="form-floating">
                                        <textarea className="form-control" value={this.state.el_doc.documento} name="documento" id="floatingTextarea" style={{ height: '400px', width: '500px' }} required onChange={(e) => this.en_cambio(e)}></textarea>
                                        <label htmlFor="floatingTextarea">texto plano</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="row justify-content-md-center">
                            <div className="col-md-5">
                                <table className="table table-striped table-dark">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Autor</th>
                                            <td>{this.state.el_doc.autor.nombre}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">fecha creacion</th>
                                            <td>{this.state.el_doc.fecha_creacion}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">ultima modificacion por: </th>
                                            <td>{this.state.el_doc.modificado_por.nombre}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">fecha modificacion</th>
                                            <td>{this.state.el_doc.fecha_modificacion}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Collapse>
                    <br />

                </div>
            </>
        );
    }
}

export default Leerdoc;
import React from 'react';

class Editardoc extends React.Component {
    state = {
        contenido_md: '',
        titulo: ''
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
                    contenido_md: leer.result,
                    titulo: archi.name
                })
            }
            leer.onerror = () => {
                console.log(leer.error);
                this.setState({
                    contenido_md: "documento dañado",
                    titulo: archi.name
                })
            }
        } else {
            this.setState({
                contenido_md: 'no hay nada'
            })
        }
    }
    en_cambio = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    cancelar = () => {
        this.setState({
            contenido_md: '',
            titulo: ''
        })
    }

   
    render() {       
        this.state.titulo=this.props
        this.state.contenido_md=this.props
        return (
            <>
                <div className="bg-info">
                    <br />
                    <div className="d-flex justify-content-center">
                        <label className="btn btn-dark me-5">
                            Subir Doc. <input type="file" hidden accept='.md' onChange={(e) => this.cargar(e)} />
                        </label>
                        {/*<button className="btn btn-dark me-5" type="button">Editar</button>*/}
                        <button className="btn btn-dark me-5" type="submit" form="formDocumento">Guardar</button>
                        <button className="btn btn-dark me-5" type="button" onClick={this.cancelar}>Cancelar</button>
                    </div>
                    <br />

                    <div className="d-flex justify-content-center">
                        <form id="formDocumento">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Titulo del documento</label>
                                <input type="text" name="titulo" value={this.state.titulo} className="form-control" id="exampleInputEmail1" required onChange={(e) => this.en_cambio(e)} />
                            </div>
                            <div className="mb-3">
                                <div className="form-floating">
                                    <textarea className="form-control" name="contenido_md" id="floatingTextarea" style={{ height: '100px', width: '500px' }} required value={this.state.contenido_md} onChange={(e) => this.en_cambio(e)}></textarea>
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
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">fecha creacion</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">fecha modificacion</th>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <br />

                </div>
            </>
        );
    }
}

export default Editardoc;
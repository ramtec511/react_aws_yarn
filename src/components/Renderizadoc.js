import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

class Renderizadoc extends React.Component {
    render() { 
        return (
            <div className="bg-info">
            <div className="d-flex justify-content-center">
                            {/*<button className="btn btn-dark me-5" type="button">Editar</button>*/}                            
                            <button className="btn btn-dark me-5" type="button" onClick={()=>this.props.arcancel()}>Cerrar</button>
                        </div>
                        <br />

                        <div className="container text-center">
                            <h1>Guardado documento</h1>
                            <div className="mb-3 bg-dark text-light">
                                <label htmlFor="exampleInputEmail1" className="form-label">Titulo del documento</label>
                                <h3 id="exampleInputEmail1">{localStorage.getItem('_gdh')}</h3>
                            </div><br />
                            <div className="mb-3">
                                <ReactMarkdown children={localStorage.getItem('_otrj')} remarkPlugins={[remarkGfm]} />
                                {/*<ReactMarkdown children={este} remarkPlugins={[remarkGfm]} />*/}
                            </div>
                        </div>                                              
            </div>
        );
    }
}
 
export default Renderizadoc;
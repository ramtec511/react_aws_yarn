export const modelEditdoc = class {
    constructor(titulo = '', contenido_md = '', autor = { usuario: '', nombre: '' }) {
        this.titulo = titulo;
        this.documento = contenido_md;        
        this.modificado_por = autor;
        this.fecha_modificacion = '0000-00-00';        
    }
}
export const modelNew = class {
    constructor(titulo = '', contenido_md = '', autor = { usuario: '', nombre: '' }, historial = []) {
        this.titulo = titulo;
        this.documento = contenido_md;
        this.autor = autor;
        this.modificado_por = autor;
        this.fecha_creacion = '0000-00-00';
        this.fecha_modificacion = '0000-00-00';
        this.historial_cambios = historial
    }
}
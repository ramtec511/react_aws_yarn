import Axios from 'axios';
import { modelEditdoc } from '../models/modelEditdoc';

class EditPeticiones {
    link = "http://18.218.83.38:4050/";

    conexion = Axios.create({
        baseURL: this.link
    })    

    edita_doc = async (este='',modelo = modelEditdoc) => {
        console.log( modelo);
       return await this.conexion.put(este, modelo);
    }
}

const este = new EditPeticiones()
export default este;
import Axios from 'axios';
import { modelNew } from '../models/modelNewdoc';

class LogPeticiones {
    link = "http://18.218.83.38:4000/";

    conexion = Axios.create({
        baseURL: this.link
    })    

    guarda_doc = async (api = '', modelo = modelNew) => {
        console.log(api, modelo);
       return await this.conexion.post(api, modelo);
    }
}

const este = new LogPeticiones()
export default este;
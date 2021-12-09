import Axios from 'axios';
//import { modelNew } from '../models//modelNewdoc';

class LogPeticiones {
    link = "http://18.218.83.38:4010/";

    conexion = Axios.create({
        baseURL: this.link
    })    

    obt_all = async () => {        
       return await this.conexion.get();
    }

    solo_uno = async (este='') => {        
        return await this.conexion.get(este);
     }
}

const este = new LogPeticiones()
export default este;
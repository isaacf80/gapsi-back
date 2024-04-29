import { JsonDB, Config } from 'node-json-db';

export type Proveedor = {
    idProvider: number,
    stock: number,
    name: string,
    contact: string,
    active: number,
    amount: number,
    description: string,
}

export class ProveedoresService {

    DB_NAME = '/proveedores';

    db!: JsonDB;

    constructor () {
      this.initDatabase();
    }
 
    /**
     * Inicializa la BD
     *
     */    
    public async initDatabase () {
        this.db = new JsonDB(new Config("bd", true, true, '/'));
    }

    /**
     * Regresa una lista de proveedores
     *
     */    
    async getList(index: number, numRows: number){
        console.log('getList');

        let array = await this.db.getData(this.DB_NAME) as Proveedor[];

        return array;
    }

    /**
     * Guarda un proveedor
     *
     */    
    async saveProvider(provedor: Proveedor): Promise<Proveedor>{
        console.log('saveProvider');

        if (provedor.idProvider > 0){
            console.log('update');
            console.log('provedor.idProvider: ' + provedor.idProvider);

            let idx = await this.db.getIndex(this.DB_NAME, provedor.idProvider, 'idProvider');

            console.log('idx: ' + idx);

            if (idx >= 0){
                this.db.push(this.DB_NAME+'[' + idx + ']', provedor);
            }

        }else{
            console.log('new');

            let numberOfElements = await this.db.count(this.DB_NAME);

            if (numberOfElements > 0){
                //BD creada
                let lastItem = await this.db.getData(this.DB_NAME + "[-1]") as Proveedor;

                console.log('lastItem: ' + lastItem.idProvider);
    
                provedor.idProvider = lastItem.idProvider + 1;
    
                console.log('provedor.idProvider: ' + provedor.idProvider);
            }else{
                //BD limpia

                provedor.idProvider = 1;
            }

            this.db.push(this.DB_NAME+'[]', provedor);
        }

        return provedor;
    }

    /**
     * Borra un proveedor
     *
     */
    async deleteProvider(idProvider: number){
        console.log('deleteProvider: ' + idProvider);
        try {
            const idx = await this.db.getIndex(this.DB_NAME, idProvider, "idProvider");

            if (idx >= 0){
                this.db.delete(this.DB_NAME+'[' + idx + ']');
            }

            return true;
        } catch(error) {
            console.error("No se encontro el objeto");       
        }  
        return false;
    }
}
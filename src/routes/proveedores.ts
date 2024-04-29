import express from "express";
import { Proveedor, ProveedoresService } from "../services/proveedores.service";

const router = express.Router();
const provedoresService = new ProveedoresService();

/**
 * Regresa una lista de proveedores
 *
 */
router.get('/list', async (req, res) => {

    const data = await provedoresService.getList(0, 10)

    res.json(data);
});

/**
 * Guarda un proveedor
 *
 */
router.post('/saveProvider', async (req, res) => {
    const {idProvider, name, contact, stock, amount, description, active} = req.body;

    const newProvedor = {} as Proveedor;

    newProvedor.idProvider = idProvider;
    newProvedor.stock = stock;
    newProvedor.name = name;
    newProvedor.contact = contact;
    newProvedor.active = active;
    newProvedor.amount = amount;
    newProvedor.description = description;

    provedoresService.saveProvider(newProvedor).then(function (response) {
        res.json(response);
    }).catch(function (error) {
        console.log(error);

        res.send('error');
    });
   
});

/**
 * Borra un proveedor
 *
 */
router.get('/deleteProvider/:idProvider', async (req, res) => {
    if(await provedoresService.deleteProvider(parseInt(req.params.idProvider))){
        res.send('ok');
    }else{
        res.send('error');
    }
});

export default router;
import { Router } from "express";
import * as ClientController from '../controllers/clientController'

const router = Router()

router.post('/', ClientController.createClient)
router.get('/', ClientController.listClients)
router.get('/:id', ClientController.getClientById)
router.put('/:id', ClientController.updateClient)
router.delete('/:id' , ClientController.deleteClient)

export default router
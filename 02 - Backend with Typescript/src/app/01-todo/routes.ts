import { Router } from 'express';
import todoController from './controller.js';

const router = Router();
const controller = new todoController();

router.get('/', controller.handleAllTodos.bind(controller));
//user ke request karne pe ye call hoga to detached function ki tarah kaam karega hence we have to bind it


// router.get('/:id')

router.post('/', controller.insertTodo.bind(controller));

// router.put('/:id');
// router.delete('/:id');


export default router;
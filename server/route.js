import express from 'express';
import { getUsers, addUser, getUserById, editUser, deleteUser, register, login } from '../controller/user-controller.js';
import { isAuthenticated } from '../middleware/authentic.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/:cook', isAuthenticated, getUsers);
router.post('/add/:cook', isAuthenticated, addUser);
router.get('/:id/:cook', isAuthenticated, getUserById);
router.put('/:id/:cook', isAuthenticated, editUser);
router.delete('/:id/:cook', isAuthenticated, deleteUser);

export default router;
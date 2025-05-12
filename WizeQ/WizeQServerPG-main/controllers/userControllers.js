const UserModel = require('../models/userModel');

async function getAllUsers(req, res) {
    try {
        const users = await UserModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getUserById(req, res) {
    const { id } = req.params;
    try {
        const user = await UserModel.getUserById(id);
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function createUser(req, res) {
    const user = req.body;
    try {
        const newUser = await UserModel.createUser(user);
        res.json(newUser);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateUser(req, res) {
    const { id } = req.params;
    const user = req.body;
    try {
        const updatedUser = await UserModel.updateUser(id, user);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        const deletedUser = await UserModel.deleteUser(id);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser }
const axios = require('axios');
const fs = require('fs');
require('dotenv').config(); // Load environment variables from .env file
const chatsModel = require('../models/chatsModel');
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function getChatsById(req, res) {
    const { id } = req.params;
    try {
        const chats = await chatsModel.getChatsById(id);
        res.json(chats);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

async function createChat(req, res) {
    const chat_req = req.body;
    try {
        const chat = await chatsModel.createChat(chat_req);
        res.json(chat);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

async function deleteChat(req, res) {
    const { id } = req.params;
    try {
        const chat = await chatsModel.deleteChat(id);
        res.json(chat);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

async function updateChat(req, res) {
    const { id } = req.params;
    const chat_req = req.body;
    try {
        const chat = await chatsModel.updateChat(id, chat_req);
        res.json(chat);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

async function linkSearch(searchQuery) {
    // Define the URL and parameters for the request
    const API_KEY = process.env.API_KEY;
    const SEARCH_ENGINE_ID = '63200ab5d5c3549b7';
    const url = 'https://www.googleapis.com/customsearch/v1';
    const params = {
        q: searchQuery,
        key: API_KEY,
        cx: SEARCH_ENGINE_ID,
        fileType: 'pdf',
        num: 1,
        dateRestrict: '2022-01-01:2024-06-13'
    };

    try {
        // Send the request
        const response = await axios.get(url, { params });
        const results = response.data;

        if (results.items && results.items.length > 0) {
            // Extract the links
            const link = results.items[0].link;
            return { message: 'PDF link found', link};
        } else {
            return { message: 'No PDFs found', link: null};
        }
    } catch (error) {
        console.error('Error fetching search results:', error.response ? error.response.data : error);
        return { message: 'Error fetching search results', error: error.response ? error.response.data : error.message };
    }
}

const getContextNearby = async (req, res) => {

    const { message } = req.body; // user message

    const link =  await linkSearch(message);

    console.log(link.link);
    if (link.link) {

        const { NearbyyClient } = await import('@nearbyy/core');

        // Initialize the NearbyyClient
        const nearbyyClient = new NearbyyClient({
        API_KEY: process.env.NEARBY_API_KEY, 
        });
        // upload the file
        const { success, error, data } = await nearbyyClient.uploadFiles({
            fileUrls: [link.link],
        });
            if (success) {
                console.log('File uploaded successfully:');
                console.log(data);
            } else {
                console.error('Error uploading file:', error);
            }
        //Perform semantic search
        let context;
        try {
            context = await nearbyyClient.semanticSearch({
            query: message,
            limit: 5,
            });
        } catch (error) {
            console.error('Error performing semantic search:', error);
            return res.status(500).send("Error performing semantic search");
        }

        // Check if context retrieval was successful
        if (!context.success) {
            console.error('Context retrieval not successful:', context.error);
            return res.status(500).send("Context retrieval not successful");
        } 
        //Format the retrieved context
        const nearbyContext = context.data.items.map((item) => item.text).join('\n\n');

        console.log(nearbyContext);
        const formattedPrompt = `You are a virtual assistant. You can answer any related 
        question. Use this relevant context to try to answer the user prompt; if the context 
        does not provide the answer, feel free to use your own knowledge. Context:
        ${nearbyContext}. User query: ${message}.`;

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        try {
            const result = await model.generateContent(
                formattedPrompt,
            );
            const response = await result.response;
            const text = response.text();
            return res.json({ response: text });
        } catch (error) {
            console.error('Error generating content:', error);
            return res.status(500).send("Error generating content");
        }
    } else {

        console.log(link.message);

        const formattedPrompt = `You are a virtual assistant. You can answer any related 
        question. Use this relevant context to try to answer the user prompt; if the context 
        does not provide the answer, feel free to use your own knowledge. Context:
        . User query: ${message}.`;

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        try {
            const result = await model.generateContent(
                formattedPrompt,
            );
            const response = await result.response;
            const text = response.text();
            return res.json({ response: text });
        } catch (error) {
            console.error('Error generating content:', error);
            return res.status(500).send("Error generating content");
        }
    }
};



module.exports = { getChatsById, createChat, deleteChat, updateChat, getContextNearby}
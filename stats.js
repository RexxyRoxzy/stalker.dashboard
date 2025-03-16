// stats.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const BOT_TOKEN = 'TON_TOKEN_DISCORD';

// Récupérer le nombre de serveurs
router.get('/guilds', async (req, res) => {
    try {
        const response = await fetch('https://discord.com/api/v10/users/@me/guilds', {
            headers: { 'Authorization': `Bot ${BOT_TOKEN}` }
        });
        const guilds = await response.json();
        res.json({ count: guilds.length });
    } catch (error) {
        console.error('Erreur :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des serveurs' });
    }
});

// Récupérer le nombre d'utilisateurs (approximatif)
router.get('/users', async (req, res) => {
    try {
        const response = await fetch('https://discord.com/api/v10/users/@me', {
            headers: { 'Authorization': `Bot ${BOT_TOKEN}` }
        });
        const botInfo = await response.json();
        res.json({ count: botInfo.approximate_user_count || 0 });
    } catch (error) {
        console.error('Erreur :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
});

module.exports = router;

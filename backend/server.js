const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;
require('dotenv').config();

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://OnlineStore:3KQugwRB3d6vTCG6@onlinestore.yav9l.mongodb.net/banboo?retryWrites=true&w=majority&appName=OnlineStore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ Connecté à MongoDB"))
    .catch(err => console.error("❌ Erreur de connexion MongoDB :", err));


// Routes



const productRoutes = require('./routes/produitsRoutes');
app.use('/api/produits', productRoutes);


const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)

const emailRouter = require('./routes/emailRouter')
app.use('/api', emailRouter)

const commandsRoutes = require('./routes/commandsRoutes');
app.use('/api/commandes', commandsRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api/categories', categoryRoutes);


// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});

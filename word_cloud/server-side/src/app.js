const express = require('express');
const mongoose = require('mongoose');
const endpointWordCloudRoutes = require('./routes/endpoint_word_cloud');
const cors = require('cors')

const app = express();
app.use(cors())     
app.use(express.json())
const port = 3000;

// // Conecte-se ao MongoDB
// mongoose.connect('your_mongodb_connection_string', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

app.get('/teste', (req, res) => {
    res.send('API OK')
})

// Usar as rotas definidas em endpoint_word_cloud.js
app.use('/api', endpointWordCloudRoutes);

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


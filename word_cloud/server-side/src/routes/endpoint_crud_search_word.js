const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

//importando funções de conexão com o banco
const { read_all_mongo } = require('../get_news.js');
const { read_mongo } = require('../get_news.js');
const { get_clean_concatenated_text_by_search_word } = require('../get_news.js');
const { readWord } = require('../get_news.js');

// const app = express();    
// app.use(cors())     
// app.use(express.json())
const router = express.Router();

// const port = 3000; //porta padrão

//teste
router.get('/sabugo', (req, res) => {
    res.send('API OK')
})

router.get('/words', async (req, res) => {
    let list_words = await readWord()
    res.json({'words_search': list_words})
})

//adicionar nova palavra
router.put('/words', (req, res) => {
    
    const word_to_add = req.body.word_to_add
    console.log(word_to_add)

    res.send('ok')


})

module.exports = router;
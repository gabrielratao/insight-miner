const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

//importando funções de conexão com o banco
// const { read_all_mongo } = require('../get_news.js');
// const { read_mongo } = require('../get_news.js');
// const { get_clean_concatenated_text_by_search_word } = require('../get_news.js');
const { readWord } = require('../get_news.js');
const { addWord } = require('../get_news.js');
const { removeWord } = require('../get_news.js');
const { updateWord } = require('../get_news.js');
const { get_news } = require('../get_news.js');
const { extract_info_news } = require('../get_news.js');
const { update_mongo } = require('../get_news.js');


// const app = express();    
// app.use(cors())     
// app.use(express.json())
const router = express.Router();

// const port = 3000; //porta padrão

// //teste
// router.get('/sabugo', (req, res) => {
//     res.send('API OK')
// })


//acionar a atualização das noticias
router.post('/words/update', async (req, res) => {
    // const search_word = 'africa';
    const words = await readWord();

    try {
        for (const word of words) {
            console.log('palavra: ' + word);
            const data = await get_news(word);
            await extract_info_news(data, word);
        }
        
        res.status(200).json({
            "result": "Sucesso na atualização das noticias",
            "words_updated": words
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "result": "Erro ao atualizar as noticias"
        });
    }
});


// //ler todas as palavras chaves
// router.get('/words', async (req, res) => {
//     let list_words = await readWord()
//     res.json({'words_search': list_words})
// })

// //adicionar nova palavra
// router.put('/words', async (req, res) => {
    
//     const word_to_add = req.body.word_to_add
//     const response = await addWord(word_to_add)
//     // console.log(word_to_add)

//     res.send(response)

// })

// //remover palavra
// router.delete('/words', async (req, res) => {
    
//     const word_to_remove = req.body.word_to_remove
//     const response = await removeWord(word_to_remove)
//     // console.log(word_to_add)

//     res.send(response)

// })

// //alterar palavra
// router.patch('/words', async (req, res) => {
    
    
//     const word_before = req.body.word_before
//     const word_after = req.body.word_after
//     const response = await updateWord(word_before, word_after)
//     // console.log(word_to_add)

//     res.send(response)

// })


module.exports = router;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

//importando funções de conexão com o banco
const { read_all_mongo } = require('../get_news.js');
const { read_mongo } = require('../get_news.js');
const { get_clean_concatenated_text_by_search_word } = require('../get_news.js');

// const app = express();    
// app.use(cors())     
// app.use(express.json())
const router = express.Router();

// const port = 3000; //porta padrão

//teste
router.get('/teste', (req, res) => {
    res.send('API OK')
})

router.get('/news/url', async (req, res) => {
    const url = req.query.url;
    // const url = 'https://aljamal.substack.com/p/homoiconic-python'
    if (!url) {
      return res.status(400).send('URL não fornecida');
    }
  
    try {
      const news = await read_mongo(url);
      if (news) {
        res.json(news);
      } else {
        res.status(404).send('Documento não encontrado');
      }
    } catch (error) {
      res.status(500).send('Erro ao encontrar o documento: ' + error.message);
    }
  });

router.get('/news', async (req, res) => {
    try {
      const tasks = await read_all_mongo();
      res.json(tasks);
    } catch (error) {
      res.status(500).send('Erro ao encontrar os documentos: ' + error.message);
    }
  });




router.get('/words/cloud', async (req, res) => {
    const searchWord = req.query.search_word;
    if (!searchWord) {
      return res.status(400).send('search_word não fornecido');
    }
  
    try {
      const concatenatedText = await get_clean_concatenated_text_by_search_word(searchWord);
      res.json({'result': concatenatedText});
    } catch (error) {
      res.status(500).send('Erro ao encontrar os documentos: ' + error.message);
    }
  });



// router.listen(port, () => {
// 	console.log('Example app listening on port: ' + port)
// })


module.exports = router;
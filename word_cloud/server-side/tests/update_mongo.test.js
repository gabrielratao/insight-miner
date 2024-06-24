const mongoose = require('mongoose');
const {updateWord } = require('../src/get_news.js');
const { addWord } = require('../src/get_news.js');
const { read_all_mongo } = require('../src/get_news.js');
const { get_news } = require('../src/get_news.js');
const { get_clean_concatenated_text_by_search_word } = require('../src/get_news.js');
const { update_mongo } = require('../src/get_news.js');


// Mock do modelo News
const News = {
    findOne: jest.fn(),
};

// Mock do protótipo da instância news
function MockNewsInstance(data) {
    this.data = data;
}
MockNewsInstance.prototype.save = jest.fn();

describe('update_mongo function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return "documento salvo" when a new document is successfully saved', (done) => {
        const url = 'https://example.com/news';
        const title = 'Example News';
        const search_word = 'example';
        const content = 'Lorem ipsum dolor sit amet.';
        const description = 'Example description';

        // Simula que não existe documento com a URL especificada
        News.findOne.mockResolvedValue(null);

        // Simula o salvamento do novo documento
        const savedDocument = new MockNewsInstance({
            url: url,
            title: title,
            search_word: search_word,
            content: content,
            description: description,
            date_created: new Date(),
            date_audit: null
        });
        savedDocument.save.mockResolvedValue();

        // Função callback para o teste
        const callback = jest.fn((error, result) => {
            expect(result).toBe('documento salvo');
            expect(error).toBeNull();
            done();
        });

        // Chama a função update_mongo
        update_mongo(url, title, search_word, content, description, callback);
    });

    
});

// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '../../server-side/.env') });
// const uri = process.env.Uri;
// const data_base = 'api_news'
  
// mongoose.connect(uri+data_base)
//     .then(() => console.log('Conexão com MongoDB bem sucedida'))
//     .catch(err => console.error('Erro na conexão com banco :(', err));




// const newsSchema = new mongoose.Schema({
//     // Defina a estrutura do seu documento aqui
    
//         url: String,
//         title: String,
//         search_word: String,
//         content: String,
//         description: String,
//         date_created: Date,
//         date_audit: Date

// }, { 
//     timestamps: true,
//     collection: 'news_content' }); //definie o nome da coleção

  
//   let News;
//   try {
//     News = mongoose.model('News');
//   } catch (error) {
//     News = mongoose.model('News', newsSchema);
//   }
  
  
// //   const data = await addWord('palavra_teste');
//   test('Verifica se esta sendo criado um documento com uma noticia',  () => {
//         let search_word = 'python'
//         let url = 'teste'
//         let title = 'teste'
//         let content = 'teste'
//         let description = 'teste'
//         const text = update_mongo(url, title, search_word, content, description)
    
//         expect(text).toBe('documento salvo');
//   });
  








// // const { update_mongo } = require('../../server-side/');
// // Define o esquema do documento
// // const newsSchema = new mongoose.Schema({
// //     // Defina a estrutura do seu documento aqui
    
// //         url: String,
// //         title: String,
// //         search_word: String,
// //         content: String,
// //         description: String,
// //         date_created: Date,
// //         date_audit: Date

// // }, { 
// //     timestamps: true,
// //     collection: 'news_content' }); //definie o nome da coleção
  
// //     const News = mongoose.model('News', newsSchema);

  
// //   const data = await addWord('palavra_teste');
//   test('Verifica se esta sendo criado um documento com uma noticia',  () => {
//     let search_word = 'python'
//     let url = 'teste'
//     let title = 'teste'
//     let content = 'teste'
//     let description = 'teste'
//     const text = update_mongo(url, title, search_word, content, description)

//     expect(text).toBe('documento salvo');
    
//   });
  
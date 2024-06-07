const fetch = require('node-fetch');
const mongoose = require('mongoose');
const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, 'C:/Users/dell/dev/.env') });
require('dotenv').config();



const news_api_key = process.env.News_api_key
// const uri = process.env.MongoURL;
const uri = process.env.Uri;
const data_base = 'api_news' //nome do banco de dados

// console.log(uri)
// Conecta ao mongoDB utilizando o mongoose
mongoose.connect(uri+data_base)
    .then(() => console.log('Conexão com MongoDB bem sucedida'))
    .catch(err => console.error('Erro na conexão com banco :(', err));

// Define o esquema do documento
const newsSchema = new mongoose.Schema({
    // Defina a estrutura do seu documento aqui
    
        url: String,
        title: String,
        search_word: String,
        content: String,
        description: String

}, { collection: 'news_content' }); //definie o nome da coleção

// Define o modelo do documento
const News = mongoose.model('News', newsSchema);

// function update_mongo(url, title, search_word, content, description){
//     // // Define o modelo do documento
//     // const News = mongoose.model('News', newsSchema);

//      // Verifica se um documento com a URL especificada já existe
//      News.findOne({ url: url })
//      .then((existingDocument) => {
//          if (existingDocument) {
//              console.log('Documento com a URL especificada já existe. Nenhuma ação necessária.');
//              return;
//          }})
        
    

//     // Cria uma instância do modelo do documento com os dados a serem inseridos
//     const news = new News({
//         url: url,
//         title: title,
//         search_word: search_word,
//         content: content,
//         description: description
//     // Outros campos, se necessário
//     });


//     // Salva o novo documento no banco de dados
//     news.save()
//     .then(() => {
//         console.log('Novo documento adicionado com sucesso!');
//         // Faça qualquer outra coisa que você precise fazer após adicionar o documento
//     })
//     .catch((error) => {
//         console.error('Erro ao adicionar o documento:', error);
//     });

// }


//Essa função adiciona um novo documento verificando se ele ja existe com base na URL da noticia
function update_mongo(url, title, search_word, content, description) {
    // Verifica se um documento com a URL especificada já existe
    News.findOne({ url: url })
    .then((existingDocument) => {
        if (existingDocument) {
            console.log('Documento com a URL especificada já existe. Nenhuma ação necessária.');
            return;
        }

        // Cria uma instância do modelo do documento com os dados a serem inseridos
        const news = new News({
            url: url,
            title: title,
            search_word: search_word,
            content: content,
            description: description
            // Outros campos, se necessário
        });

        // Salva o novo documento no banco de dados
        return news.save();
    })
    .then((result) => {
        if (result) {
            console.log('Novo documento adicionado com sucesso!');
        }
    })
    .catch((error) => {
        console.error('Erro ao adicionar o documento:', error);
    });
}

//le um documento atraves da URL
async function read_mongo(url) {
    // Define o modelo do documento
    const News = mongoose.model('News', newsSchema);
    try {
      const news = await News.findOne({ url: url });
      if (news) {
        console.log('Documento encontrado:', news);
        return news;
      } else {
        console.log('Documento não encontrado.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao encontrar o documento:', error);
      throw error;
    }
  }
// function read_mongo(url){
//     // Define o modelo do documento
//     const News = mongoose.model('News', newsSchema);    
//     News.findOne({ url: url })
//     .then((news) => {
//         if (news) {
//         console.log('Documento encontrado:', news);
//         return news;
//         // Faça o que for necessário com o documento retornado
//         } else {
//         console.log('Documento não encontrado.');
//         }
//     })
//     .catch((error) => {
//         console.error('Erro ao encontrar o documento:', error);
//     });
// }

//retorna todos os documentos
async function read_all_mongo() {
    // Define o modelo do documento
    const News = mongoose.model('News', newsSchema);
    try {
      const tasks = await News.find();
      if (tasks.length > 0) {
        console.log('Documentos encontrados:', tasks);
        return tasks;
      } else {
        console.log('Nenhum documento encontrado.');
        return [];
      }
    } catch (error) {
      console.error('Erro ao encontrar os documentos:', error);
      throw error;
    }
  }
// function read_all_mongo(){
//     // Define o modelo do documento
//     const News = mongoose.model('News', newsSchema);

//     // Obtém todos os documentos da coleção
//     News.find()
//         .then((tasks) => {
//             if (tasks.length > 0) {
//                 console.log('Documentos encontrados:', tasks);
//                 // Faça o que for necessário com os documentos retornados
//             } else {
//                 console.log('Nenhum documento encontrado.');
//             }
//         })
//         .catch((error) => {
//             console.error('Erro ao encontrar os documentos:', error);
//         });
// }

//obtem as noticiais com base em uma palavra chave
async function get_news(search_word) {
    try {
    
    const response = await fetch(`https://newsapi.org/v2/everything?q=${search_word}&apiKey=${news_api_key}`);
    // Verifica se a requisição foi bem-sucedida (código de status 200)
    if (response.ok) {
    const data = await response.json();
    // console.log(data)
    return data;
    } else {
    throw new Error('Erro ao buscar dados de noticias:', response.statusText);
    }
    } catch (error) {
    console.error('Erro ao buscar dados de noticias:', error.message);
    }
}

//mostra na tela as noticias obtidas  IGNORAR NO TESTE
function display_news(data){
    console.log('############### NOTÍCIAS ###############')
    console.log('Principais títulos de notícias relacionados a palavra')

    data.articles.forEach(article => {
            const { url, title, description, content } = article;
            console.log(url)
            console.log(title)
            console.log(description)
            console.log(content)
            console.log('###')
            
        });

    console.log('')
    console.log('##############################')

}

//extrai os campos da resposta da API e adiciona os principais no mongo
function extract_info_news(data, search_word){
    let i = 1;
    console.log('Atualizando noticias no MongoDB')
    data.articles.forEach(article => {
        const { url, title, content, description } = article;
        update_mongo(url, title, search_word, content, description)
        setTimeout(() => {
            // console.log('Fim');
        }, 3000);
        console.log(i)
        i = i + 1
    });
    console.log('Não há mais noticias')
}

// python, javascript, technology, mongodb, frontend, backend, web, development, woman, coke, ai
// chatgpt, gemini, copilot
// const search_word = 'copilot'
// get_news(search_word)
//     .then(data => {
//         // display_news(data)
//         extract_info_news(data, search_word)
//     })
//     .catch(error => {
//         console.error('Erro ao buscar dados de noticias ', error.message);
//     });

// update_mongo(url, title)
// read_mongo('www.arromassi')


// read_all_mongo()


// Lista de stop words em inglês
const stopWords = [
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"
  ];
  
  async function get_clean_concatenated_text_by_search_word(search_word) {
    const News = mongoose.model('News', newsSchema);
    try {
      const documents = await News.find({ search_word: search_word });
      if (documents.length > 0) {
        // console.log('Documentos encontrados:', documents);
  
        // Concatena os campos title, content e description
        let concatenatedText = documents.map(doc => 
          `${doc.title} ${doc.content} ${doc.description}`
        ).join(' ');
  
        // Limpa o texto deixando apenas palavras
        concatenatedText = concatenatedText
          .toLowerCase()  // Transforma em minúsculas
          .replace(/[^a-z\s]/g, '')  // Remove caracteres especiais e números
          .replace(/\s+/g, ' ')  // Remove espaços em excesso
          .trim();  // Remove espaços no início e no fim
  
        // Remove as stop words
        const words = concatenatedText.split(' ');
        const filteredWords = words.filter(word => !stopWords.includes(word));
        const cleanText = filteredWords.join(' ');
  
        return cleanText;
      } else {
        console.log('Nenhum documento encontrado.');
        return '';
      }
    } catch (error) {
      console.error('Erro ao encontrar os documentos:', error);
      throw error;
    }
  }
module.exports = { read_all_mongo, read_mongo, get_clean_concatenated_text_by_search_word };

// get_clean_concatenated_text_by_search_word('python')
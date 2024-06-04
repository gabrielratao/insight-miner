const fetch = require('node-fetch');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'C:/Users/dell/dev/.env') });



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
function read_mongo(url){
    // Define o modelo do documento
    const News = mongoose.model('News', newsSchema);    
    News.findOne({ url: url })
    .then((news) => {
        if (news) {
        console.log('Documento encontrado:', news);
        // Faça o que for necessário com o documento retornado
        } else {
        console.log('Documento não encontrado.');
        }
    })
    .catch((error) => {
        console.error('Erro ao encontrar o documento:', error);
    });
}

//retorna todos os documentos
function read_all_mongo(){
    // Define o modelo do documento
    const News = mongoose.model('News', newsSchema);

    // Obtém todos os documentos da coleção
    News.find()
        .then((tasks) => {
            if (tasks.length > 0) {
                console.log('Documentos encontrados:', tasks);
                // Faça o que for necessário com os documentos retornados
            } else {
                console.log('Nenhum documento encontrado.');
            }
        })
        .catch((error) => {
            console.error('Erro ao encontrar os documentos:', error);
        });
}

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

//mostra na tela as noticias obtidas
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

// python, javascript, technology, mongodb, frontend, backend, web, development
const search_word = 'development'
get_news(search_word)
    .then(data => {
        // display_news(data)
        extract_info_news(data, search_word)
    })
    .catch(error => {
        console.error('Erro ao buscar dados de noticias ', error.message);
    });

// update_mongo(url, title)
// read_mongo('www.arromassi')


// read_all_mongo()



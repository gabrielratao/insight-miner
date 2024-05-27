const fetch = require('node-fetch');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'C:/Users/dell/dev/.env') });



const news_api_key = process.env.News_api_key
// const uri = process.env.MongoURL;
const uri = process.env.Uri;


// console.log(uri)
// Conecta ao mongoDB utilizando o mongoose
mongoose.connect(uri)
    .then(() => console.log('Conexão com MongoDB bem sucedida'))
    .catch(err => console.error('Erro na conexão com banco :(', err));

// Define o esquema do documento
const newsSchema = new mongoose.Schema({
    // Defina a estrutura do seu documento aqui
    // Por exemplo:
        url: String,
        title: String,
    // Outros campos, se necessário
});

function update_mongo(url, title){


    // Define o modelo do documento
    const News = mongoose.model('News', newsSchema);

    // Cria uma instância do modelo do documento com os dados a serem inseridos
    const news = new News({
        url: url,
        title: title,
    // Outros campos, se necessário
    });

    // Salva o novo documento no banco de dados
    news.save()
    .then(() => {
        console.log('Novo documento adicionado com sucesso!');
        // Faça qualquer outra coisa que você precise fazer após adicionar o documento
    })
    .catch((error) => {
        console.error('Erro ao adicionar o documento:', error);
    });

}


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
// update_mongo(url, title)
// read_mongo('www.arromassi')
// read_all_mongo()

async function get_news(search_word) {
    try {
    // Fazendo uma requisição GET para a API da OpenWeatherMap
    const response = await fetch(`https://newsapi.org/v2/everything?q=${search_word}&apiKey=${news_api_key}`);
    // Verifica se a requisição foi bem-sucedida (código de status 200)
    if (response.ok) {
    const data = await response.json();
    return data;
    } else {
    throw new Error('Erro ao buscar dados de noticias:', response.statusText);
    }
    } catch (error) {
    console.error('Erro ao buscar dados de noticias:', error.message);
    }
}

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

function extract_info_news(data){
    console.log('Atualizando noticias no MongoDB')
    data.articles.forEach(article => {
        const { url, title } = article;
        update_mongo(url, title)
        setTimeout(() => {
            // console.log('Fim');
        }, 3000);
        
    });
}
const search_word = 'Python'
get_news(search_word)
    .then(data => {
        display_news(data)
        // extract_info_news(data)
    })
    .catch(error => {
        console.error('Erro ao buscar dados de noticias ', error.message);
    });
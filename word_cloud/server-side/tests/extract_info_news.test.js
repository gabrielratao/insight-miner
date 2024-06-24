const { extract_info_news } = require('../src/get_news.js');



// Mock da função update_mongo
jest.mock('../src/get_news');

describe('extract_info_news', () => {
    it('deve chamar update_mongo para cada artigo', () => {
        const data = {
            articles: [
                { url: 'http://example.com/1', title: 'Title 1', content: 'Content 1', description: 'Description 1' },
                { url: 'http://example.com/2', title: 'Title 2', content: 'Content 2', description: 'Description 2' }
            ]
        };
        const search_word = 'test';

        // Configurar o mock da função update_mongo
        update_mongo.mockImplementation((url, title, search_word, content, description, callback) => {
            callback(null, 'documento salvo');
        });

        extract_info_news(data, search_word);

        expect(update_mongo).toHaveBeenCalledTimes(2);
        expect(update_mongo).toHaveBeenCalledWith('http://example.com/1', 'Title 1', search_word, 'Content 1', 'Description 1', expect.any(Function));
        expect(update_mongo).toHaveBeenCalledWith('http://example.com/2', 'Title 2', search_word, 'Content 2', 'Description 2', expect.any(Function));
    });
});
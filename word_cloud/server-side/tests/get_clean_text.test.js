const mongoose = require('mongoose');
const {updateWord } = require('../src/get_news.js');
const { addWord } = require('../src/get_news.js');
const { read_all_mongo } = require('../src/get_news.js');
const { get_news } = require('../src/get_news.js');
const { get_clean_concatenated_text_by_search_word } = require('../src/get_news.js');

const wordsSchema = new mongoose.Schema({
    words: [String]
  });
  
  let Words;
  try {
    Words = mongoose.model('Words');
  } catch (error) {
    Words = mongoose.model('Words', wordsSchema);
  }
  
  beforeEach(async () => {
    await Words.create({
      _id: '6670d8dcde7b4b99e1bd8c05',
      words: ['example', 'test', 'words']
    });
  });
  
//   const data = await addWord('palavra_teste');
  test('Verifica a concatenação das string para gerar nuvem de palavra', async () => {
    let search_word = 'python'
    const text = await get_clean_concatenated_text_by_search_word(search_word)

    expect(typeof text).toBe('string');
    
  });
  
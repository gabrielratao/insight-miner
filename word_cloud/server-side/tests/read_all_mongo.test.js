const mongoose = require('mongoose');
const {updateWord } = require('../src/get_news.js');
const { addWord } = require('../src/get_news.js');
const { read_all_mongo } = require('../src/get_news.js');


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
  test('Verifica se as noticias estão sendo retornadas', async () => {
    // await addWord('palavra_teste')
    // const update_result = await updateWord('palavra_teste', 'palavra_teste_alterada');
    const result = await read_all_mongo()
    expect(result.length).toBeGreaterThan(0);
  });
  
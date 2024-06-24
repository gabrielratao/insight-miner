const mongoose = require('mongoose');
const { removeWord } = require('../src/get_news.js');
const { addWord } = require('../src/get_news.js');

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
  test('Verifica se uma palavra foi removida', async () => {
    await addWord('palavra_teste')
    const remove_result = await removeWord('palavra_teste');
    expect(remove_result.status).toBe('success');
  });
  

const mongoose = require('mongoose');
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
  
  test('Verifica se uma palavra foi adicionada', async () => {
    const data = await addWord('palavra_teste');
    expect(data.status).toBe('success');
  });
  


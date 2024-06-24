const { readWord } = require('../src/get_news.js');

// const { removeWord } = require('../../server-side/src/get_news.js');
// const { updateWord } = require('../../server-side/src/get_news.js');
// const { get_news } = require('../../server-side/src/get_news.js');
// const { extract_info_news } = require('../../server-side/src/get_news.js');
// const { update_mongo } = require('../../server-side/src/get_news.js');
const mongoose = require('mongoose');



// test('verifica se o documento retornado é maior que zero', async () => {
//   const words = await readWord();
//   expect(words.length).toBeGreaterThan(0);
// });

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

test('verifica se o tamanho do array retornado é maior que zero', async () => {
  const data = await readWord();
  expect(data.length).toBeGreaterThan(0);
});


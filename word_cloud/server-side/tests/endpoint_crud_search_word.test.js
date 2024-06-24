const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const express = require('express');
const request = require('supertest');
const router = require('../src/routes/endpoint_crud_search_word');

// Mock das funções de banco de dados
const { readWord, addWord, removeWord, updateWord } = require('../src/get_news');
jest.mock('../src/get_news');

// Criação de um aplicativo express e uso do router
const app = express();
app.use(express.json());
app.use(router);

describe('Endpoints da API', () => {
  beforeEach(() => {
    // Limpar as mocks antes de cada teste
    readWord.mockClear();
    addWord.mockClear();
    removeWord.mockClear();
    updateWord.mockClear();
  });

  test('GET: retornar API OK', async () => {
    const res = await request(app).get('/sabugo');
    expect(res.status).toBe(200);
    expect(res.text).toBe('API OK');
  });

  test('GET: retornar todas as palavras', async () => {
    readWord.mockResolvedValue(['word1', 'word2']);
    const res = await request(app).get('/words');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ words_search: ['word1', 'word2'] });
  });

  test('PUT: adicionar uma palavra', async () => {
    addWord.mockResolvedValue('Added newWord');
    const res = await request(app)
      .put('/words')
      .send({ word_to_add: 'newWord' });
    expect(res.status).toBe(200);
    expect(res.text).toBe('Added newWord');
  });

  test('DELETE: remover uma palavra', async () => {
    removeWord.mockResolvedValue('Removed word1');
    const res = await request(app)
      .delete('/words')
      .send({ word_to_remove: 'word1' });
    expect(res.status).toBe(200);
    expect(res.text).toBe('Removed word1');
  });

  test('PATCH: atualizar uma palavra', async () => {
    updateWord.mockResolvedValue('Updated word1 to updatedWord');
    const res = await request(app)
      .patch('/words')
      .send({ word_before: 'word1', word_after: 'updatedWord' });
    expect(res.status).toBe(200);
    expect(res.text).toBe('Updated word1 to updatedWord');
  });
});

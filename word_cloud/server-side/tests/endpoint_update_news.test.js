const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const express = require('express');
const request = require('supertest');
const router = require('../src/routes/endpoint_update_news');

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

  test('POST: retornar API OK', async () => {
    const res = await request(app).get('/words/update');
    expect(res.status).toBe(200);
    expect(res.result).toBe('Sucesso na atualização das noticias');
  });

});

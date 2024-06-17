const request = require('supertest');
const express = require('express');
const sql = require('mssql');
const cors = require('cors');

// Mocking mssql
jest.mock('mssql');

const app = express();
app.use(cors());
app.use(express.json());

const config = {
  server: 'localhost',
  database: 'insightminer',
  port: 1433,
  user: 'sa',
  password: '123456',
  trustServerCertificate: true,
  options: {
    cryptoCredentialsDetails: {
      minVersion: 'TLSv1',
      trustServerCertificate: true,
    },
  },
};

const pool = new sql.ConnectionPool(config);
sql.connect = jest.fn().mockResolvedValue(pool);

function execSQLQuery(sqlQry, res) {
  pool.request = jest.fn().mockReturnValue({
    query: jest.fn().mockResolvedValue({ recordset: [{ mockKey: 'mockValue' }] }),
  });

  pool.request()
    .query(sqlQry)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err.message);
    });
}

app.get('/users', (req, res) => {
  execSQLQuery(`select * from Usuarios_Donos`, res);
});

app.get('/users_dep/:email', (req, res) => {
  const email = req.params.email;
  execSQLQuery(`exec sp_Mostrar_Geral @email = '${email}'`, res);
});

app.get('/users/:email', (req, res) => {
  const email = req.params.email;
  execSQLQuery(`exec sp_Mostrar_Usuario_Dono @email = '${email}'`, res);
});

app.get('/users/plano/:email', (req, res) => {
  const email = req.params.email;
  execSQLQuery(`exec sp_Mostrar_Plano @email = '${email}'`, res);
});

app.get('/users/autenticate/:email/:senha', (req, res) => {
  const email = req.params.email;
  const senha_enviada = req.params.senha;
  execSQLQuery(`exec sp_Autenticar_Usuario_Dono @email = '${email}', @senha_enviada = '${senha_enviada}'`, res);
});

app.post('/users', (req, res) => {
  const { email, nome, dt_nascimento, senha, nome_empresa, tipo_empresa } = req.body;
  execSQLQuery(`exec sp_Criar_Juridico_Dono @‌email = '${email}', @‌nome = '${nome}', @‌dt_nascimento = '${dt_nascimento}', @‌senha = '${senha}', @‌nome_empresa = '${nome_empresa}', @‌tipo_empresa = '${tipo_empresa}'`, res);
});

app.delete('/users/:email', (req, res) => {
  const email = req.params.email;
  execSQLQuery(`exec sp_Deletar_Usuario_Dono @email = '${email}'`, res);
});

app.put('/users', (req, res) => {
  const { email, dt_nascimento, nome_usuario, senha, nome_empresa, ramo_empresa } = req.body;
  execSQLQuery(`exec sp_Alterar_Usuario_Dono @email = '${email}', @dt_nascimento = '${dt_nascimento}', @nome_usuario = '${nome_usuario}', @senha = '${senha}', @nome_empresa = '${nome_empresa}', @ramo_empresa = '${ramo_empresa}'`, res);
});

describe('API Endpoints', () => {
  it('should return all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('recordset');
  });

  it('should return users dependentes', async () => {
    const res = await request(app).get('/users_dep/test@example.com');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('recordset');
  });

  it('should return user by email', async () => {
    const res = await request(app).get('/users/test@example.com');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('recordset');
  });

  it('should return user plano by email', async () => {
    const res = await request(app).get('/users/plano/test@example.com');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('recordset');
  });

  it('should authenticate user', async () => {
    const res = await request(app).get('/users/autenticate/test@example.com/password');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('recordset');
  });

  it('should create a user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: 'test@example.com', nome: 'Test', dt_nascimento: '1990-01-01', senha: 'password', nome_empresa: 'Test Corp', tipo_empresa: 'Tech' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('recordset');
  });

  it('should delete a user by email', async () => {
    const res = await request(app).delete('/users/test@example.com');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('recordset');
  });

  it('should update a user', async () => {
    const res = await request(app)
      .put('/users')
      .send({ email: 'test@example.com', dt_nascimento: '1990-01-01', nome_usuario: 'Test Updated', senha: 'password', nome_empresa: 'Test Corp Updated', ramo_empresa: 'Tech' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('recordset');
  });
});

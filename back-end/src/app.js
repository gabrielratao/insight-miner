const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors')


const app = express();    
app.use(cors())     
const port = 3000; //porta padrão
app.use(express.json())

const config = {
    server: 'localhost',
    database: 'insightminer',
    port: 1433,
    user: "sa",
    password: '123456',
    trustServerCertificate: true,
    options: {
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1',
            trustServerCertificate: true,
        }
    }   
  }


//fazendo a conexão global  (global.   => variável global -> )
sql.connect(config) 
	.then(conn => global.conn = conn) //se der certo criar essa variável coma conexão  (retorno do connect)
	.catch(err => console.log(err))

function execSQLQuery(sqlQry, res){
	global.conn.request()
				.query(sqlQry)
				.then(result => {

                    console.log(result)
                    res.json(result.recordset)
                })
				.catch(err => {
                    console.log(err.message)
                    res.json(err.message)
                });
}

//Read all users
app.get('/users', (req, res) => {
    try{
        execSQLQuery(`select * from Usuarios_Donos`, res)
    }   
    catch (error) {
        console.error('Erro no endpoint /users:', error.message);
    }
    
})


//raad all users dependentes
app.get('/users_dep/:email', (req, res) =>{
    try {
        const email = req.params.email
        execSQLQuery(`exec sp_Mostrar_Geral @email = '${email}' `, res)
    }
	catch (error){

    }
    

})


//Read users by email
app.get('/users/:email', (req, res) =>{

    const email = req.params.email
    execSQLQuery(`exec sp_Mostrar_Usuario_Dono @email = '${email}' `, res)

})


//create user  Infos required: email, @‌nome @‌email @‌dt_nascimento @‌senha @‌nome_empresa @‌tipo_empresa
app.post('/users', (req, res) => {
    const email = req.body.email
    const nome = req.body.nome
    const dt_nascimento = req.body.dt_nascimento
    const senha = req.body.senha
    const nome_empresa = req.body.nome_empresa
    const tipo_empresa = req.body.tipo_empresa

    execSQLQuery(`exec sp_Criar_Juridico_Dono 
                @email = '${email}',
                @nome = '${nome}',
                @dt_nascimento = '${dt_nascimento}',
                @senha = '${senha}',
                @nome_empresa = '${nome_empresa}',
                @tipo_empresa = '${tipo_empresa}'`, res)
})


//delete user by email
app.delete('/users/:email', (req, res) => {
    const email = req.params.email

    execSQLQuery(`exec sp_Deletar_Usuario_Dono @email = '${email}'`, res)

})



//update user by email
app.put('/users', (req, res) => {
    
    const email = req.body.email
    const email_novo = req.body.email_novo
    const nome_usuario = req.body.nome_usuario
    const senha = req.body.senha
    const nome_empresa = req.body.nome_empresa
    const ramo_empresa = req.body.ramo_empresa

    execSQLQuery(`exec sp_Alterar_Usuario_Dono 
                @email = '${email}',
                @email_novo = '${email_novo}',
                @nome_usuario = '${nome_usuario}',
                @senha = '${senha}',
                @nome_empresa = '${nome_empresa}',
                @ramo_empresa = '${ramo_empresa}'
                `, res)


})



app.listen(port, () => {
	console.log('Example app listening on port: ' + port)
})
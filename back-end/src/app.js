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
                    res.json(result)
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
        console.error('Erro no endpoint /users_dep/:email', error.message);
    }
    

})


//Read users by email
app.get('/users/:email', (req, res) =>{

    try{    
        const email = req.params.email
        execSQLQuery(`exec sp_Mostrar_Usuario_Dono @email = '${email}' `, res)
    }
    catch (error){
        console.error('/users/:email', error.message);
    }
    

})

//Read tipo de plano
app.get('/users/plano/:email', (req, res) => {
    try{
        const email = req.params.email
        execSQLQuery(`exec sp_Mostrar_Plano @email = '${email}' `, res)
    }
    catch (error){
        console.error('/users/plano/:email', error.message);
    }
    
})

//autenticação do usuário
app.get('/users/autenticate/:email/:senha', (req, res) =>{

    try{
        const email = req.params.email
        const senha_enviada = req.params.senha

        execSQLQuery(`exec sp_Autenticar_Usuario_Dono
                    @email = '${email}',
                    @senha_enviada = '${senha_enviada}'`, res)
    }
    catch (error){
        console.error('/users/autenticate/:email/:senha', error.message);
    }
})


//create user  Infos required: email, @‌nome @‌email @‌dt_nascimento @‌senha @‌nome_empresa @‌tipo_empresa
app.post('/users', (req, res) => {

    try{
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
    }
    catch (error){
        console.error('/users', error.message);
    }

})


//delete user by email
app.delete('/users/:email', (req, res) => {

    try{
        const email = req.params.email
        execSQLQuery(`exec sp_Deletar_Usuario_Dono @email = '${email}'`, res)
    }
    catch (error){
        console.error('/users/:email', error.message);
    }  

})



//update user by email
app.put('/users', (req, res) => {
    
    const email = req.body.email
    const dt_nascimento = req.body.dt_nascimento
    const nome_usuario = req.body.nome_usuario
    const senha = req.body.senha
    const nome_empresa = req.body.nome_empresa
    const ramo_empresa = req.body.ramo_empresa

    execSQLQuery(`exec sp_Alterar_Usuario_Dono 
                @email = '${email}',
                @dt_nascimento = '${dt_nascimento}',
                @nome_usuario = '${nome_usuario}',
                @senha = '${senha}',
                @nome_empresa = '${nome_empresa}',
                @ramo_empresa = '${ramo_empresa}'
                `, res)


})



app.listen(port, () => {
	console.log('Example app listening on port: ' + port)
})
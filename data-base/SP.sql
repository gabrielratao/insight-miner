-- SP CRIAÇÃO DE USUÁRIO JURÍDICO DONO
alter procedure sp_Criar_Juridico_Dono
@nome varchar(1000),
@email varchar(1000),
@dt_nascimento date,
@senha varchar(1000),
@nome_empresa varchar(1000),
@tipo_empresa varchar(1000)
as 
begin 

declare @idade int;
set @idade = DATEDIFF(YEAR, @dt_nascimento, GETDATE());

declare @tipo_plano int;
set @tipo_plano = 1 --plano básico padrão para todos novos usuários

declare @id_tipo_empresa int; --busca o id do tipo de empresa pelo tipo
select @id_tipo_empresa = id_tipo_empresa from Tipo_Empresa
where tipo = @tipo_empresa;

--declare @dominio as varchar(100)
--set @dominio =  SUBSTRING(@email, CHARINDEX('@', @email) + 1, LEN(@email) - CHARINDEX('@', @email))


if @idade < 18 
begin

	RAISERROR('Usuário menor de idade', 16, 1)
	PRINT 'Para criar conta, o usuário deve ter acima de 18 anos de idade'
	return 
end

-- verificar se já há uma empresa com esse email opção de verificar por email (porém essa coluna email dono foi exluída)
--if (SELECT count(id_empresa)
	--FROM Empresas
	--WHERE SUBSTRING(email_dono, CHARINDEX('@', email_dono) + 1, LEN(email_dono)) = @dominio) = 1

if (select count(id_empresa) from Empresas
	where nome = @nome_empresa) = 1
begin 
	RAISERROR('Já há um dono para essa empresa', 16, 1)
	PRINT 'JÁ HÁ UM DONO PARA ESSA EMPRESA'
	return
end

if (select count(id_usuario) from Usuarios_Donos
	where email = @email) = 1
begin
	RAISERROR('Usuário já cadastrado no sistema', 16, 1)
	PRINT 'Usuário já cadastrado no sistema'
	return
end

-- se nao: criar uma empresa
insert into Empresas (nome,  id_tipo_empresa, id_tipo_plano) values
(@nome_empresa, @id_tipo_empresa, @tipo_plano)

--pegar o id_empresa
declare @id_empresa int;
select @id_empresa = Empresas.id_empresa from Empresas
	where Empresas.nome = @nome_empresa;


-- criar o usuário dono
insert into Usuarios_Donos (nome, email, dt_nascimento, senha, id_empresa) values
(@nome, @email, @dt_nascimento, @senha, @id_empresa)


end 
go



--   TESTANDO SP CRIAÇÃO USUARIO DONO    --
exec sp_Criar_Juridico_Dono
@nome = 'Magda Ratao',
@email = 'marcelo@poesia.com',
@dt_nascimento = '1990-09-28' ,
@senha = '123',
@nome_empresa = 'poesias',
@tipo_empresa  = 'varejo'




-- SP CRIAÇÃO DE USUÁRIO DEPENDENTE
alter procedure sp_Criar_Usuario_Dependente
@nome varchar(1000),
@email varchar(1000),
@dt_nascimento date,
@senha varchar(1000)
as 
begin 

declare @idade int;
set @idade = DATEDIFF(YEAR, @dt_nascimento, GETDATE());

if @idade < 18
begin
	RAISERROR('Usuário menor de idade', 16, 1)
	PRINT 'Para criar conta, o usuário deve ter acima de 18 anos de idade'
	return 
end

-- verificar se o usuário já existe com base no email
if (select count(id_usuario) from Usuarios_Dependentes
	where email = @email) = 1
begin
	RAISERROR('Usuário já cadastrado no sistema', 16, 1)
	PRINT 'Usuário já cadastrado no sistema'
	return
end

-- verifica se a empresa existe com base no dominio do email do usuario
declare @dominio as varchar(100)
set @dominio =  SUBSTRING(@email, CHARINDEX('@', @email) + 1, LEN(@email) - CHARINDEX('@', @email))

if (select count(Empresas.id_empresa) from Usuarios_Donos
left join Empresas on Usuarios_Donos.id_empresa = Empresas.id_empresa
where substring(Usuarios_Donos.email, CHARINDEX('@', Usuarios_Donos.email) + 1, len(Usuarios_Donos.email)) = @dominio) = 0
begin
	RAISERROR('Não há nenhuma empresa cadastrada nesse dominio', 16, 1)
	PRINT 'Não há nenhuma empresa cadastrada nesse dominio'
	return
end

-- verifica se há possibilidade de criar mais um usuário com base no limite do plano da empresa
declare @limite_usuarios int;
select TOP 1 @limite_usuarios =  Tipo_Plano.limite_usuarios from Usuarios_Dependentes
	left join Usuarios_Donos on Usuarios_Dependentes.id_usuario_dono = Usuarios_Donos.id_usuario
	left join Empresas on Usuarios_Donos.id_empresa = Empresas.id_empresa
	left join Tipo_Plano on Empresas.id_tipo_plano = Tipo_Plano.id_tipo_plano
	where substring(Usuarios_Donos.email, CHARINDEX('@', Usuarios_Donos.email) + 1, len(Usuarios_Donos.email)) = @dominio;

if (select count(Usuarios_Dependentes.id_usuario) from Usuarios_Dependentes
	left join Usuarios_Donos on Usuarios_Dependentes.id_usuario_dono = Usuarios_Donos.id_usuario
	left join Empresas on Usuarios_Donos.id_empresa = Empresas.id_empresa
	left join Tipo_Plano on Empresas.id_tipo_plano = Tipo_Plano.id_tipo_plano
	where substring(Usuarios_Donos.email, CHARINDEX('@', Usuarios_Donos.email) + 1, len(Usuarios_Donos.email)) = @dominio) >= @limite_usuarios
begin
	RAISERROR('Não será possível criar um novo usuário pois a empresa já está com o número maximo de usuários disponíveis.', 16, 1)
	PRINT 'Não será possível criar um novo usuário pois a empresa já está com o número maximo de usuários disponíveis.'
	return
end

declare @id_dono_empresa int;
select @id_dono_empresa = Usuarios_Donos.id_usuario from Usuarios_Donos
	left join Empresas on Usuarios_Donos.id_empresa = Empresas.id_empresa
	where substring(Usuarios_Donos.email, CHARINDEX('@', Usuarios_Donos.email) + 1, len(Usuarios_Donos.email)) = @dominio


insert into Usuarios_Dependentes (nome, email, dt_nascimento, senha, id_usuario_dono) values
(@nome, @email, @dt_nascimento, @senha, @id_dono_empresa)

end 
go

	

exec sp_Criar_Usuario_Dependente
@nome = 'Anackin Dourado',
@email = 'anakas@empresa1.com',
@dt_nascimento = '1987-05-04',
@senha = '123'





-- SP deletar usuário juridico dono pelo email do usuário
alter procedure sp_Deletar_Usuario_Dono
@email varchar(1000)

as 
begin 

-- verificar se existe o usuário
if (select count(id_usuario) from Usuarios_Donos
	where email = @email) = 0
begin
	RAISERROR('Usuário não existe', 16, 1)
	PRINT 'Usuário não existe'
	return
end

declare @id_empresa int;
select @id_empresa = Usuarios_Donos.id_empresa from Usuarios_Donos where email = @email;

--deletar o usuário pelo email
delete from Usuarios_Donos
where email = @email

--deletar empresa desse usuário
delete from Empresas
where id_empresa = @id_empresa

PRINT 'Usuário deletado'

end 
go


exec sp_Deletar_Usuario_Dono
@email = 'marcelo@oesia.com'


-- SP Para mostrar  a partir do email
-- INFOS Nome, Email, Senha, Empresa, Ramo
alter procedure sp_Mostrar_Usuario_Dono
@email varchar(1000)

as 
begin 

-- verificar se existe o usuário
if (select count(id_usuario) from Usuarios_Donos
	where email = @email) = 0
begin
	RAISERROR('Usuário não existe', 16, 1)
	PRINT 'Usuário não existe'
	return
end

select Usuarios_Donos.nome, Usuarios_Donos.email, Usuarios_Donos.senha, Empresas.nome as "empresa",  Tipo_Empresa.tipo, Usuarios_Donos.dt_nascimento from Usuarios_Donos
left join Empresas on Usuarios_Donos.id_empresa = Empresas.id_empresa
left join Tipo_Empresa on Empresas.id_tipo_empresa = Tipo_Empresa.id_tipo_empresa
where Usuarios_Donos.email = @email


end 
go

exec sp_Mostrar_Usuario_Dono
@email = 'marcelo@l.com'


exec sp_Mostrar_Plano
@email = 'defequinho@defeco'


-- SP Para mostrar as informações do plano      Nome do plano e limites
alter procedure sp_Mostrar_Plano
@email varchar(1000)

as begin

-- verificar se existe o usuário
if (select count(id_usuario) from Usuarios_Donos
	where email = @email) = 0
begin
	RAISERROR('Usuário não existe', 16, 1)
	PRINT 'Usuário não existe'
	return
end

select Tipo_Plano.tipo, Tipo_Plano.limite_solicitacao_mensal, Tipo_Plano.limite_usuarios, Tipo_Plano.custo_mensal
from Usuarios_Donos
left join Empresas on Usuarios_Donos.id_empresa = Empresas.id_empresa
left join Tipo_Plano on Empresas.id_tipo_plano = Tipo_Plano.id_tipo_plano
where email = @email

end 
go



exec sp_Mostrar_Plano
@email = 'marcelo@l.com'





-- SP Alterar Cadastro Usuário Dono   Nome, Email, Senha, Empresa, Ramo
alter procedure sp_Alterar_Usuario_Dono
@email varchar(1000),
@nome_usuario varchar(1000),
@dt_nascimento date,
@senha varchar(1000),
@nome_empresa varchar(1000),
@ramo_empresa varchar(1000)    


as
begin

--verificar idade
declare @idade int;
set @idade = DATEDIFF(YEAR, @dt_nascimento, GETDATE());

if @idade < 18
begin
	RAISERROR('Usuário menor de idade', 16, 1)
	PRINT 'Para ter conta, o usuário deve ter acima de 18 anos de idade'
	return 
end

-- verificar se existe o usuário
if (select count(id_usuario) from Usuarios_Donos
	where email = @email) = 0
begin
	RAISERROR('Usuário não existe', 16, 1)
	PRINT 'Usuário não existe'
	return
end


UPDATE Usuarios_Donos
SET nome = @nome_usuario,
    senha = @senha,
	dt_nascimento = @dt_nascimento
where email = @email

UPDATE Empresas
SET Empresas.nome = @nome_empresa
from Empresas
left join Usuarios_Donos ON Usuarios_Donos.id_empresa = Empresas.id_empresa
where Usuarios_Donos.email = @email

UPDATE Tipo_Empresa
SET Tipo_Empresa.tipo = @ramo_empresa
from Tipo_Empresa
left join Empresas ON Empresas.id_tipo_empresa = Tipo_Empresa.id_tipo_empresa
left join Usuarios_Donos ON Usuarios_Donos.id_empresa = Empresas.id_empresa
where Usuarios_Donos.email = @email

PRINT 'Alterações do usuário realizadas com sucesso'


end 
go

select * from Usuarios_Donos
left join Empresas on Usuarios_Donos.id_empresa = Empresas.id_empresa
left join Tipo_Empresa on Empresas.id_tipo_empresa = Tipo_Empresa.id_tipo_empresa

exec sp_Alterar_Usuario_Dono
@email = 'amorim@lm.com',
@email_novo = 'nelso@lm.com',
@nome_usuario = 'Nelso Fisico',
@senha = '789',
@nome_empresa = 'nelso copany',
@ramo_empresa = 'varejo'

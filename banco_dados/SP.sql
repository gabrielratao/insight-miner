

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
	PRINT 'JÁ HÁ UM DONO PARA ESSA EMPRESA'
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
	PRINT 'Para criar conta, o usuário deve ter acima de 18 anos de idade'
	return 
end

-- verificar se o usuário já existe com base no email
if (select count(id_usuario) from Usuarios_Dependentes
	where email = @email) = 1
begin
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


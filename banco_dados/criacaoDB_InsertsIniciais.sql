
create database insightminer

use insightminer


create table Tipo_Empresa (
id_tipo_empresa int primary key identity(1, 1),
tipo varchar(1000)
)

create table Tipo_Plano (
id_tipo_plano int primary key identity(1, 1),
tipo varchar(1000),
descricao varchar(1000),
custo_mensal float,
limite_solicitacao_mensal int,
limite_usuarios int
)

create table Empresas (
id_empresa int primary key identity (1, 1),
nome varchar(1000),
id_tipo_empresa int foreign key references Tipo_Empresa(id_tipo_empresa),
id_tipo_plano int foreign key references Tipo_Plano(id_tipo_plano)
)


create table Usuarios_Donos(
id_usuario int primary key identity (1, 1),
nome varchar(1000),
email varchar(1000) unique,
dt_nascimento date,
senha varchar(1000),
id_empresa int foreign key references Empresas(id_empresa)
)

create table Usuarios_Dependentes (
id_usuario int primary key identity (1, 1),
nome varchar(1000),
email varchar(1000) unique,
dt_nascimento date,
senha varchar(1000),
id_usuario_dono int foreign key references Usuarios_Donos(id_usuario)
)



insert into Tipo_Empresa (tipo) values 
('marketing'),
('varejo'),
('orgão público'),
('engenharia'),
('tecnologia'),
('pessoa fisica')


insert into Tipo_Plano (tipo, descricao, custo_mensal, limite_solicitacao_mensal, limite_usuarios) values
('inicial', 'Plano utilizado por pessoas físicas e jurídicas para testar a plataforma.', 0, 99, 1),
('básico', 'Plano utilizado por usuários conta jurídica', 39, 499, 5),
('intermediário', 'Plano utilizado por usuários conta jurídica com número intermediário de solicitação mensal', 99, 1499, 10),
('avançado', 'Plano utilizado por usuários conta jurídica com número avançado de solicitação mensal', 299, 2999, 20)


insert into Empresas (nome, id_tipo_empresa, id_tipo_plano) values
('empresa1', 1, 2), 
('tribunal de contas', 3, 3)


insert into Usuarios_Donos (nome, email, dt_nascimento, senha, id_empresa) values
('Marilea Pereira', 'marileia@tribunal.com', '1985-05-02', '123', 2),
('Joao Bobao', 'joao@empresa1', '1980-07-04', '123', 1)



insert into Usuarios_Dependentes (nome, email, dt_nascimento, senha, id_usuario_dono) values
('Walace Pereira', 'walace@tribunal.com', '1986-06-20', '123', 1),
('Joana Filha', 'joana@empresa1.com', '1999-06-04', '123', 2),
('Gabriel Filho', 'gabriel@empresa1.com', '1980-03-04', '123', 2),
('Maju Fisica', 'maju@empresa1.com', '1996-04-08', '123', 2),
('Jose Joao', 'jose@empresa1.com', '1990-08-04', '123', 2)




-- SP Autenticação Usuário Dono
alter procedure sp_Autenticar_Usuario_Dono
@email varchar(100),
@senha_enviada varchar(100)

as begin

declare @senha varchar(100)
select @senha = senha  from Usuarios_Donos 
where email = @email


if (select count(id_usuario) from Usuarios_Donos where email = @email) = 0
begin 
	RAISERROR('Usuário não existe', 16, 1)
	PRINT ('Usuário não existe')
	return 
end

if @senha != @senha_enviada
begin
	PRINT('Acesso negado')
	RAISERROR('Acesso negado', 16, 1)
	return
end

PRINT('Acesso ok')



end
go


select * from Usuarios_Donos

exec sp_Autenticar_Usuario_Dono
@email = 'defequinho@defeco',
@senha_enviada = 'asdas'
















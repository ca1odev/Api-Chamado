# api de chamados

api para controlar chamados de suporte técnico usando node.js, express e postgresql.

## instalação

npm i express
npm i pg

## iniciar

npm start

servidor na porta 3000.

## tokens

tecnico123
admin123

## rotas

get /chamados
get /chamados/:id
post /chamados
patch /chamados/:id/assumir
patch /chamados/:id/finalizar
delete /chamados/:id
get /chamados/estatisticas

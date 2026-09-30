import express from 'express';
import pool from './db.js';
import { registrarRequisicao } from './middlewares/registrarRequisicao.js';
import { validarChamado } from './middlewares/validarChamado.js';
import { validarPrioridade } from './middlewares/validarPrioridade.js';
import { verificarAutenticacao } from './middlewares/verificarAutenticacao.js';
import { somenteAdmin } from './middlewares/somenteAdmin.js';
import { rotaNaoEncontrada } from './middlewares/rotaNaoEncontrada.js';
import { tratamentoErros } from './middlewares/tratamentoErros.js';

const app=express();
const porta=3000;
app.use(express.json());
app.use(registrarRequisicao);

app.get('/chamados',async(req,res,next)=>{try{const {status,prioridade}=req.query;let r;if(status&&prioridade)r=await pool.query('select * from chamados where status=$1 and prioridade=$2 order by id',[status,prioridade]);else if(status)r=await pool.query('select * from chamados where status=$1 order by id',[status]);else if(prioridade)r=await pool.query('select * from chamados where prioridade=$1 order by id',[prioridade]);else r=await pool.query('select * from chamados order by id');res.json(r.rows);}catch(err){next(err);}});

app.get('/chamados/estatisticas',async(req,res,next)=>{try{const r=await pool.query(`select count(*) as total,count(*) filter(where status='aberto') as abertos,count(*) filter(where status='em_atendimento') as "emAtendimento",count(*) filter(where status='finalizado') as finalizados,count(*) filter(where prioridade='alta') as "prioridadeAlta" from chamados`);res.json(r.rows[0]);}catch(err){next(err);}});

app.get('/chamados/:id',async(req,res,next)=>{try{const r=await pool.query('select * from chamados where id=$1',[req.params.id]);if(r.rowCount===0)return res.status(404).json({erro:'chamado não encontrado'});res.json(r.rows[0]);}catch(err){next(err);}});

app.post('/chamados',validarChamado,validarPrioridade,async(req,res,next)=>{try{const {titulo,descricao,setor,prioridade}=req.body;const r=await pool.query(`insert into chamados(titulo,descricao,setor,prioridade,status,responsavel,data_abertura) values($1,$2,$3,$4,'aberto',null,current_timestamp) returning *`,[titulo,descricao,setor,prioridade]);res.status(201).json(r.rows[0]);}catch(err){next(err);}});

app.patch('/chamados/:id/assumir',verificarAutenticacao,async(req,res,next)=>{try{const c=await pool.query('select * from chamados where id=$1',[req.params.id]);if(c.rowCount===0)return res.status(404).json({erro:'chamado não encontrado'});if(c.rows[0].status!=='aberto')return res.status(400).json({erro:'o chamado não está aberto'});const r=await pool.query(`update chamados set status='em_atendimento',responsavel=$1 where id=$2 returning *`,[req.usuario.nome,req.params.id]);res.json(r.rows[0]);}catch(err){next(err);}});

app.patch('/chamados/:id/finalizar',verificarAutenticacao,async(req,res,next)=>{try{const c=await pool.query('select * from chamados where id=$1',[req.params.id]);if(c.rowCount===0)return res.status(404).json({erro:'chamado não encontrado'});if(c.rows[0].status!=='em_atendimento')return res.status(400).json({erro:'o chamado precisa estar em atendimento'});const r=await pool.query(`update chamados set status='finalizado' where id=$1 returning *`,[req.params.id]);res.json(r.rows[0]);}catch(err){next(err);}});

app.delete('/chamados/:id',verificarAutenticacao,somenteAdmin,async(req,res,next)=>{try{const r=await pool.query('delete from chamados where id=$1 returning *',[req.params.id]);if(r.rowCount===0)return res.status(404).json({erro:'chamado não encontrado'});res.json({mensagem:'chamado excluído',chamado:r.rows[0]});}catch(err){next(err);}});

app.use(rotaNaoEncontrada);
app.use(tratamentoErros);
app.listen(porta,()=>console.log(`servidor rodando na porta ${porta}`));

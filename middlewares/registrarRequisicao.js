export function registrarRequisicao(req,res,next){
 const agora=new Date();
 console.log(`[${agora.toLocaleDateString('pt-BR')} ${agora.toLocaleTimeString('pt-BR')}] ${req.method} ${req.originalUrl}`);
 next();
}

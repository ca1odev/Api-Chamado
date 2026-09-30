export function verificarAutenticacao(req,res,next){
 const token=req.headers.authorization;
 if(!token)return res.status(401).json({erro:'token não informado'});
 if(token==='tecnico123'){req.usuario={nome:'Carlos',tipo:'tecnico'};return next();}
 if(token==='admin123'){req.usuario={nome:'Administrador',tipo:'admin'};return next();}
 return res.status(401).json({erro:'token inválido'});
}

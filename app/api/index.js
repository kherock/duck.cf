const { flatten } = require('lodash');
const compose = require('koa-compose');
const Router = require('koa-router');

const rootRouter = new Router();
rootRouter.get('/', (ctx) => {
  const duck = `
      ,;MMMM..                                    
   ,;:MM"MMMMM.                                   
,;.MM::M.MMMMMM:                                  
""::.;'MMMMMMMMM                                  
       "'""MMMMM;                                 
           ':MMMM.                                
            'MMMM;                                
             :MMMM;.                              
              MMMMMM;...                          
              MMMMMMMMMMMMM;.;..                  
              MMMMMMMMMMMMMMMMMMM...              
              MMMMMM:MMMMMMMMMMMMMMM;...       ..:
              MMMMMM;MMMMMMMMMMMMM:MMMMMMM:MMMM:M 
              :MMMMMM:MMMMMMMMMMMMMMM.:::;:::;;:' 
              ':MMMMMMM:MMMM:;MM:M;.MMM:';::M:'   
               ':MMMMMM;M;;MM;::M;;::::;MM:""     
                 'MMMMMMMM;M;:::MMMMMMMMMM"       
                  ''MMMMMMMMMMMMMMMMMMMMM"        
                     ':MMMMMMMMMMMMMMMM"'         
                       '':MMMMMMMMMMM"'           
                          ':MMMMMM""'             
                             .                    
                             :                    
                            ::                    
                       ,..;.M'                    
                      ,;;MM:'                     
                        '"'                       
  `.slice(1, -2);
  switch (ctx.accepts('text', 'json')) {
  case 'text':
    ctx.body = duck;
    break;
  case 'json':
    ctx.body = { ascii: duck };
    break;
  }
});

module.exports = compose(flatten([
  rootRouter,
  // add other routers here
].map(router => [router.routes(), router.allowedMethods()])));

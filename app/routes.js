const { Router } = require('express');

module.exports = exports = new Router();

exports.route('/').get((req, res) => {
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
  res.send(duck);
});
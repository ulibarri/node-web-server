const express=require('express');
const hbs=require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
let app = express();
hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getUTCFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();;
});
app.set('view engine','hbs');
app.use((req,res,next)=>{
    let now = new Date().toString();
    var log = `${now}: ${req.method} ${req.path}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(error)=>{
        if (error){
            console.log('Something went wrong');
        }
    });
    next();
});

//use this if your web site is under maintenanace and you want to redirect
//all the routes to the maintenance page
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });
app.use(express.static(`${__dirname}/public`));
app.get('/',(request, response)=>{
//     let html=`<html>
//     <head>
//       <title>Sample "Hello, World" Application</title>
//     </head>
//     <body bgcolor=white>
  
//       <table border="0" cellpadding="10">
//         <tr>
//           <td>
//             <img src="images/springsource.png">
//           </td>
//           <td>
//             <h1>Sample "Hello, World" Application</h1>
//           </td>
//         </tr>
//       </table>
  
//       <p>This is the home page for the HelloWorld Web application. </p>
//       <p>To prove that they work, you can execute either of the following links:
//       <ul>
//         <li>To a <a href="hello.jsp">JSP page</a>.
//         <li>To a <a href="hello">servlet</a>.
//       </ul>
  
//     </body>
//   </html>`;
//     response.send(html);
response.render('home.hbs',{
    welcomeMessage: 'Hello, welcome to myWebsite home page rendered with HBS',
    pageTitle:'Home page 33'
});
// response.send({
//     name:'Carlos',
//     likes: ['coffe','play','round butts']
//     });
});

app.get('/about',(request,response)=>{
//         let html=`<html>
//     <head>
//       <title>About us</title>
//     </head>
//     <body bgcolor=white>
//     <p>This is the about us  page for the HelloExpress Web application. </p>
  
//     </body>
//   </html>`;
//     response.send(html);
response.render('about.hbs',{
    pageTitle:'About page 33'
    });
});

app.get('/bad',(request,response)=>{
    
    response.send({
        errorMessage: 'unable to handle request'
    });
});
app.get('/projects',(request,response)=>{
    response.render('portfolio.hbs',{
        welcomeMessage: 'Hello, this is the portfolio page',
        pageTitle:'Portfolio'
        });
    });
app.listen(port,()=>{
    console.log('server up&running on port ' + port);
});
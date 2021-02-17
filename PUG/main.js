const express = require ('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.set('views','./views');
app.set('view engine','pug');

let item = []

app.get('/form', (req,res) => {
    res.sendFile(__dirname+'/form.html');
})

app.post('/myform', (req,res) => {
    console.log(req.body);
    res.send(req.body);
    item.push(req.body);
})

app.get('/files',(req,res)=>{
    res.render('index',{array: item}, function (err, html) {
        if(item.length !=0){
            res.send(html);
        }else{
            res.send('No hay productos');
        }
    })
})

app.use('/items',require('./products'));

app.listen(1313,(error)=>{
    if(error){
        console.log('El puerto esta en uso');
    }
    console.log('Servidor corriendo en el puerto 1313');
})



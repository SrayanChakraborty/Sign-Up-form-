const express = require('express');
const https = require('https');
const bodyparser = require('body-parser');
const request = require('request');
const { response } = require('express');


const app = express();
const port = 3000;
app.use(express.static('static'))
app.use(bodyparser.urlencoded({extended:true}));


//End points
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
    var firstname = req.body.fname;
    var lastname = req.body.lname;
    var email = req.body.email;

    var datam = {
        members: [
            {
                email_address:email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }

            }
        ]
    }
    var JSondata = JSON.stringify(datam);
    const url = 'https://us21.api.mailchimp.com/3.0//lists/f40654c7eb';

    const options = {
        method: 'POST',
        auth: 'srayan:63440429b893ae0f818f4d5410e6f7f4-us21'
    }

    const request=https.request(url,options,(response)=>{
        
        response.on('data',(datam)=>{
            if(response.statusCode==200){
                res.sendFile(__dirname+"/success.html");

            }
            else{
                res.sendFile(__dirname+'/failure.html');
            }
            console.log(JSON.parse(datam));
        })
    })
    request.write(JSondata);
    request.end();  


    

})
app.post('/failure',(req,res)=>{
    res.redirect('/');
})



//Run the server
app.listen(process.env.PORT ||3000, () => {
    console.log(`Running the server on port ${port}`);
})


















//API keys
// 63440429b893ae0f818f4d5410e6f7f4-us21

//List Id
// f40654c7eb


// https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbk53S0NmbGUycGlhVEhIVDZwNmlYN0llWUlvd3xBQ3Jtc0ttbnZwS3JlUGI3bERtS3BiRDcyVE9MM3VJWFhManU1Q3RBa19KWnpYOEpHSHN5QzBCUmpCSVRma0pNY2Y2OTBVaTQzNDZUVnJPeGJWS0NxQTRMeF9RWmFWcGZqRHJIeHZDRV90dVVRWnRrTGdJWXRFNA&q=https%3A%2F%2Ftelegram.me%2F%2Bk4rdgTPwmm5kMGVl&v=WAtQzfJcy5s

// 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
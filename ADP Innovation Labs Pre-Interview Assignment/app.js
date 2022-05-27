//create a get request here for the site
const https = require('https');
https.get('https://interview.adpeai.com/api/v1/get-task', (res) => {
    //collect data here 
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    })

    res.on('end', () => {
        //parse the data here
        const obj = JSON.parse(data);
        let id = obj.id;
        let operation = obj.operation;
        let left = obj.left;
        let right = obj.right;
        
        //check to make sure what operation we will perform
        let result = 0;
        if (operation == 'addition')
        {
            result = left + right;
            console.log('operation:',operation,'result:',result);
        }
        else if (operation == 'subtraction')
        {
            result = left - right;
            console.log('operation:',operation,'result:',result);
        }
        else if (operation == 'multiplication')
        {
            result = left * right;
            console.log('operation:',operation,'result:',result);
        }
        else if (operation == 'division')
        {
            result = left / right;
            console.log('operation:',operation,'result:',result);
        }
        else if (operation == 'remainder')
        {
            result = left % right;
            console.log('operation:',operation,'result:',result);
        }

        //package the id and result to post
        const dataToSend = JSON.stringify({
            id: id,
            result: result
        });
        
        //create post options
        const options = {
          hostname: 'interview.adpeai.com',
          path: '/api/v1/submit-task',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': dataToSend.length,
          },
        };
        
        //write adn send post
        const req = https.request(options, res => {
          console.log(`statusCode: ${res.statusCode}`);
        
          res.on('data', d => {
            process.stdout.write(d);
          });
        });
        
        //error check
        req.on('error', error => {
          console.error(error);
        });
        
        req.write(dataToSend);
        req.end();
        
    });
}).on('error', (error) => {
    console.log(error);
})//error check

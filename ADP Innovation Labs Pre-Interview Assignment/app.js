const https = require('https');
https.get('https://interview.adpeai.com/api/v1/get-task', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    })

    res.on('end', () => {
        const obj = JSON.parse(data);
        let id = obj.id;
        let operation = obj.operation;
        let left = obj.left;
        let right = obj.right;
        
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


        const dataToSend = JSON.stringify({
            id: id,
            result: result
        });
        
        const options = {
          hostname: 'interview.adpeai.com',
          path: '/api/v1/submit-task',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': dataToSend.length,
          },
        };
        
        const req = https.request(options, res => {
          console.log(`statusCode: ${res.statusCode}`);
        
          res.on('data', d => {
            process.stdout.write(d);
          });
        });
        
        req.on('error', error => {
          console.error(error);
        });
        
        req.write(dataToSend);
        req.end();
        
    });
}).on('error', (error) => {
    console.log(error);
})

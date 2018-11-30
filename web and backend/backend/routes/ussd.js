//============================================================================================
// Create a project
//============================================================================================

router.get('/ussdtext', (req, res) => {
    res.send('Welcome to GRID3')
  })

  //==========================================================================
  //    USSD PART
  //==========================================================================
  
  router.post('/ussdtext', (req, res) => {
    
    return Package.find({})
    .then(doc => {
        
        let data = [];
        for(i = 0; i< doc.length && i < 5; i++){
            data.push(`${doc[i].email}\n`)
        }
        data = data.toString()
        console.log(data.toString())

    let {sessionId, serviceCode, phoneNumber, text} = req.body
    if (text == '') {
      // This is the first request. Note how we start the response with CON
    //   res.send("doc")
    res.send(data.replace(/,/g,''))
    }
    
    else if (text == '1') {
        // Business logic for first level response
        let response = `CON Select choice
        1. Budget update
        2. On-Going projects
        3. Completed projects
        4. Failed projects`
        res.send(response)
      }
    
    else if (text == '1*2') {
      // Business logic for first level response
      
      let response = `CON Select project status:
      1. On-Going projects
      2. Completed projects
      3. Failed projects`
      res.send(response)
    } 
    
    else if (text == '1*1') {
      // Business logic for first level response
      let accountNumber = 'ACC1001'
      // This is a terminal request. Note how we start the response with END
      let response = `END Your account number is ${accountNumber}`
      res.send(response)
    } 
    
    else if (text == '1*2') {
      // This is a second level response where the Package selected 1 in the first instance
      let balance = 'NGN 10,000'
      // This is a terminal request. Note how we start the response with END
      let response = `END Your balance is ${balance}`
      res.send(response)
    } 
    
    else {
      res.status(400).send('Bad request!')
    }
    })
    
    .catch(err => {
        return res.status(500).json({message: "Cannot display list", err: err});
    })

  })
  
    
    function find(value){
        return Package.find({email: value})
            .then(doc => {
                console.log(doc.toString())
                return res.json(doc.firstName)
            })
        
            .catch(err => {
            return res.status(500).json({message: "Cannot display list", err: err});
            })
    }
// 'use strict';

/*********************************************************
 Author:               Swam Didam Bobby 
 Year:                  2018
 File Discription:      Routing processes
/********************************************************/

/**
 * Dependencies
*/

const
    express  = require('express'),
    Package     = require('../models/Package');
    Disease     = require('../models/DiseaseMonitor');
    User     = require('../models/User');
    POIS     = require('../models/POIS');
    const axios = require("axios");

/**
 * Router instance
*/

const router = express.Router();

//============================================================================================
// User signup, login, find ...
//============================================================================================

/*
    to create a new user pass ---- {userName, password}
*/

router.post("/CreateUser", function (req, res) {
    return User.create(req.body)
        .then(doc => {
            return res.status(200).json({ message: "User created", doc: doc });
        })
        .catch(err => {
            return res.status(500).json({ message: "Could not create user", err: err });

        })

});

//=============================================================================================
// User login router
//=============================================================================================


router.post('/loginUser',(req, res)=>{
    
    if (req.body.userName && req.body.password)
        User.authenticate(req.body.userName, req.body.password, function (err, user) {
            if (err) 
                return res.json({status: 500, message: "An error occured! please check your provided details", err: err});
            else 
                return res.json({status:200, message:"Welcome back to home page"})
            
        })
    else 
        return res.status(400).json({info:"Both userName and password are required"})
    


})

//=============================================================================================
// Delete user
//=============================================================================================

router.delete('/deleteUser', (req, res) => {
    return User.findOneAndRemove({ userName: req.body.userName })
        .then(ok => {
            return res.status(200).json({message: "user account deleted"});
        })
        .catch(err => {
            return res.status(500).json({ message: "Unfortunately an error has occured" });

        });
});


//=============================================================================================
// Searching for a particular user
//=============================================================================================

router.post("/oneUser", function (req, res) {
    return User.findOne({userName: req.body.userName})
        .then(doc => {
            console.log(doc)
            return res.status(200).json({message: "user found",doc: doc});
        })
        .catch(err => {
            return res.status(500).json({message: "oops, server error", err: err});
        })
      
  });

//=============================================================================================
//Updating an existing user
//=============================================================================================

router.put('/updateUser', (req, res) => {
    return User.update({ "userName": req.body.userName },
        { $set: req.body })
        .then(doc => {
            console.log("Successfully updated user's details");
            return res.status(200).json({message: "user's detail update", doc: doc});
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ message: "Unfortunately an error has occured" });

        });
});


//=============================================================================================
// Search all registered users
//=============================================================================================

router.get("/viewAllUsers", function (req, res) {
    return User.find({})
        .then(doc => {
            return res.status(200).json({message: "User LIST",doc:doc});
        })
        .catch(err => {
            return res.status(500).json({message: "Cannot display list", err: err});
        })
      
  });

 
//============================================================================================
// Package processes, create, update, delete, retrieve
//============================================================================================

router.post("/CreatePackage", function (req, res) {

//form
    var form = {
        orderCode: req.body.orderCode,
        packageType: req.body.packageType,
        packageName: req.body.packageName,
        qty:req.body.qty,
        driverId: req.body.driverId,
        source: req.body.source,
        destination: req.body.destination,
        status: "PICKED",
    }

        return Package.create(form)
            .then(doc => {
                return res.status(200).json({message: "Package created",doc:doc});
            })
            .catch(err=>{
                return res.status(500).json({message: "Could not create Package", err: err});
        })

});


//=============================================================================================
// Update Package router
//=============================================================================================

router.post('/receivedPackage', (req, res) => {
    return Package.update({ orderCode: req.body.orderCode },
        { $set: {status:"DELIVERED", updatedAt:Date.now()},
        
    })
        .then(doc => {
            console.log("Successfully updated Package's details");
            return res.status(200).json({message: "Package accepted"});
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ message: "Unfortunately an error has occured" });

        });
});

//=============================================================================================
// Delete Package router
//=============================================================================================

router.delete('/deletePackage', (req, res) => {
    return Package.findOneAndRemove({ _id: req.body._id })
        .then(ok => {
            return res.status(200).json({message: "Package' deleted"});
        })
        .catch(err => {
            return res.status(500).json({ message: "Unfortunately an error has occured" });

        });
});


//=============================================================================================
// Searching for a particular Packages
//=============================================================================================

router.post("/onePackage", function (req, res) {
    return Package.findOne({_id: req.body._id})
        .then(doc => {
            console.log(doc)
            return res.status(200).json({message: "Package found",doc: doc});
        })
        .catch(err => {
            return res.status(500).json({message: "oops, server error", err: err});
        })
      
  });

//=============================================================================================
// Search all registered Packages
//=============================================================================================

router.get("/viewAllPackages", function (req, res) {
    return Package.find({})
        .then(doc => {
            return res.status(200).json({message: "list of packages",doc:doc});
        })
        .catch(err => {
            return res.status(500).json({message: "Cannot display list", err: err});
        })
      
  });

//====================================================================================
//  
//====================================================================================


//=============================================================================
// api call
//=============================================================================

router.get('/poisall', function(req, res){
    return POIS.find({})
    .then(doc =>{
        return res.status(200).json({message: "Package list", doc:doc});
        // console.log(doc)
    })
    .catch(err =>{
        return res.status(500).json({message: "Could not create Package", err: err});
        // console.log(err)
    })
})

router.post("/pois", function (res, req) {
       return POIS.create(req.body)
                .then(doc => {
                    return res.status(200).json({message: "Package created",doc:doc});
                })
                .catch(err=>{
                    return res.status(500).json({message: "Could not create Package", err: err});
            })
    
    });



router.get("/data", function(req, res){

    let url = "https://api.grid-nigeria.org/"
    let 
        resource_name = 'health-facilities',
        size = 200,
        page = 1,
        sort_by = 'global_id',
        fields = "",
        cql = state_name = "Kaduna",

    endpoint = `${url}${resource_name}${size}${page}${sort_by}${fields}${cql}`
    console.log(endpoint)
    axios.get(endpoint, {
       
    }).then(response => {
        // var doc = [];
        //     for(var i = 0; i < response.data.features.length; i++){
        //         doc.push(response.data.features[i].geometry.coordinates)
        //     }
            console.log(response.data)
            return res.json(response.data)
            // return res.json(response.data)
    }).catch(err=>{
        return res.json(err)
    })

})

//============================================================================================
// DISEASE
//============================================================================================


router.post("/CreateDisease", function (req, res) {
    var form = {
        disease: req.body.disease,
	    lga: req.body.lga,
        ward: req.body.ward,
        campain: "REPORTED"
    }
    return Disease.create(form)
        .then(doc => {
            return res.status(200).json({ message: "case created", doc: doc });
        })
        .catch(err => {
            return res.status(500).json({ message: "Could not create case", err: err });

        })

});

router.get('/viewAlldiseases', function(req, res){
    return Disease.find({})
    .then(doc =>{
        return res.status(200).json({message: "desease list", doc:doc});
        // console.log(doc)
    })
    .catch(err =>{
        return res.status(500).json({message: "Could send report", err: err});
        // console.log(err)
    })
})

//iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii

router.post('/CreateDiseaseUssd/:disease', function (req, res) {
    var disease = cough
    return Disease.create()
        .then(doc => {
            return res.status(200).json({ message: "case created", doc: doc });
        })
        .catch(err => {
            return res.status(500).json({ message: "Could not create case", err: err });

        })

});

//============================================================================================
//============================================================================================
//ussd
//============================================================================================
//============================================================================================


//============================================================================================
// Create a project
//============================================================================================

router.get('/ussdtext', (req, res) => {
    res.send('Welcome to GRID3')
  })

  //==========================================================================
  //    USSD PART
  //==========================================================================
  
  router.post('/ussdtext', (req, res) => {let {sessionId, serviceCode, phoneNumber, text} = req.body
    if (text == '') {
        // This is the first request. Note how we start the response with CON
        let response = `CON What would you want to check
        1. Report an Outbreak
        2. Vaccine Stuffs`
        res.send(response)
    } else if (text == '1') {

        // Business logic for first level response
        let response = `CON Please enter DISEASE name`

        // return Disease.create({disease: response})
        // .then(doc => {
        //     return res.status(200).json({ message: "case created", doc: doc });
        // })
        // .catch(err => {
        //     return res.status(500).json({ message: "Could not create case", err: err });

        // })

        console.log(response)
        
        res.send(response)
        
        //==================================================================
        // USSD CREATE REPORT
        //==================================================================

     

        //==================================================================
        //==================================================================


        
    } else if (text == '2') {
        // Business logic for first level response
        let response = `END Your phone number is ${phoneNumber}`
        res.send(response)
    } else if (text == '1*1') {
        // Business logic for first level response
        let accountNumber = 'ACC1001'
        // This is a terminal request. Note how we start the response with END
        let response = `END Your account number is ${accountNumber}`
        res.send(response)
    } else if (text == '1*2') {
        // This is a second level response where the user selected 1 in the first instance
        let balance = 'NGN 10,000'
        // This is a terminal request. Note how we start the response with END
        let response = `END Your balance is ${balance}`
        res.send(response)
    } else {
        res.status(400).send('Bad request!')
    }
    })

// module.exports.getDatasets = getDatasets

//=============================================================================
/**
* Module export
*/
//=============================================================================
module.exports = router;
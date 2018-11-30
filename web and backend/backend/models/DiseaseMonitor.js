'use strict'

/*********************************************************
 Author:                Swam Didam Bobby
 Year:                  2018
 File Discription:      Model for Disease Monitoring
/********************************************************/

// model dependencies
const
    mongoose                = require("mongoose");
    
// MONGOOSE MODEL CONFIGURATION
const DiseaseSchema = new mongoose.Schema({

    
    disease: {
        type: String,
    },
    lga: {
        type: String,
        
    },
    ward: {
        type: String
    },
    campain: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
        

});

module.exports = mongoose.model('Disease', DiseaseSchema);



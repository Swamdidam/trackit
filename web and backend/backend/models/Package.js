'use strict'

/*********************************************************
 Author:                Swam Didam Bobby
 Year:                  2018
 File Discription:      Model for end Drugs for delivery
/********************************************************/

// model dependencies
const
    mongoose                = require("mongoose");
    
// MONGOOSE MODEL CONFIGURATION
const PackageSchema = new mongoose.Schema({

    orderCode: {
        type: String,
    },
    packageType: {
        type: String,
    },
    packageName: {
        type: String,
    },
    qty: {
        type: String,
    },
    driverId: {
        type: String
    },
    source: {
        type: String
    },
    destination: {
        type: String
    },
    status: {
        type: String,
        
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

module.exports = mongoose.model('Package', PackageSchema);



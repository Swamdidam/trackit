
'use strict';

/*********************************************************
 Created  by Swam Didam Bobby on 09/08/2018
 Modified by Swam Didam Bobby on 13/08/2018
/********************************************************/

// model dependencies

const
    mongoose                = require("mongoose")
    

// MONGOOSE MODEL CONFIGURATION
const poiSchema = new mongoose.Schema({
    geometry: {
        type: String,
        coordinates: []
    },
    geometry_name:{type: String} ,
    properties: {
        geometry_type: String,
        latitude: { type:Number},
        longitude: { type:Number},
        global_id: { type:String},
        name: { type:String},
        // alternate_name: null,
        functional_status: { type:String},
        ri_service_status: { type:String},
        type: { type:String},
        ownership: { type:String},
        ward_code: { type:String},
        // accessibility: null,
        // cce_quantity: null,
        cce_availability: { type:String},
        cce_last_updated: { type:String},
        // mnch2: null,
        // mnch2_last_updated: null,
        source: { type:String},
        ward_name: { type:String},
        lga_code: { type:String},
        lga_name: { type:String},
        state_code: { type:String},
        state_name: { type:String}
    }
});




module.exports = mongoose.model('POIS', poiSchema);


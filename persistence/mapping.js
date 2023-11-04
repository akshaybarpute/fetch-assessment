'use strict';

// const memory={'uuid':{'recept'}}
// [
//     uuid:{receipt,points}
// ]

const uuid=require('uuid');

const map= new Map();

exports.insertData=(points)=>{
    let id=uuid.v1();
    map.set(id,points);
    return id;
};

exports.getPoints=(id)=>{

    if(!map.has(id)){
        const error = new Error('No receipt found for the id');
        error.code=400;
        throw error;
    }

    return map.get(id);
};
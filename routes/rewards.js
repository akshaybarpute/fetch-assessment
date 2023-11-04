'use strict';

const express = require('express');
const Joi = require('joi');
const router = express.Router();
const receiptProcessor=require('../helpers/receiptProcessor');
const dataStore=require('../persistence/mapping');

 const processSchema=Joi.object({
  retailer: Joi.string().required(),
  // purchaseDate: Joi.date().format('YYYY-MM-DD').utc().required(),
  purchaseDate: Joi.string().required(),
  purchaseTime: Joi.required(),
  items: Joi.array().required(),
  total:Joi.string().required()

 });

 
router.get('/test', async(req,res)=>{

  return res.status(200).json({
    status:'success',
    message:'hello',
    data:null,
    err:false,
    count:0,
    totalCount:0
  })
});

router.post('/process', async(req,res)=>{

try{  
  const body=req.body;
  //console.log(body);
  try{
    await processSchema.validateAsync(body);
    
  }
  catch(err){
    //console.log('error: ',err.message,err.stack);
    const error= new Error('Invalid Receipt');
    error.code=400;
    throw error;

  }

  const points= await receiptProcessor.processReceipt(body);
  //console.log('points: ',points);

  const id=dataStore.insertData(points);

  return res.status(200).json({
    status:'success',
    message:'success',
    data:{'id':id},
    err:false,
    count:0,
    totalCount:0
  })

}
catch(err){
  //console.log('error: ', err.stack);
  return res.status(err.code||500).json({
    status:'success',
    message:err.message,
    data:null,
    err:true,
    count:0,
    totalCount:0
  });        
}

});

router.get('/receipts/:id/points', async(req,res)=>{

  try{
        
      const id=req.params.id;

      if(!id){
        const error = new Error('Invalid Id');
        error.code=400;
        throw error;
      }
      //console.log('id: ',id);
      const points=dataStore.getPoints(id);

      return res.status(200).json({
      status:'success',
      message:'success',
      data:{"points":points},
      err:false,
      count:0,
      totalCount:0
      });

    }
    catch(err){
      return res.status(err.code||500).json({
      status:'success',
      message:err.message,
      data:null,
      err:true,
      count:0,
      totalCount:0
    });        

  }

});

module.exports = router;
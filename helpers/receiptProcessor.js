'use strict';


exports.processReceipt= async (receipt)=>{

    let totalP=0;
    //alpha-numeric retailer name
    const retailer = JSON.stringify(receipt.retailer).replace(/\W/g, '');
    // const retailer = receipt.retailer.replace(/\W/g, '');
    totalP=totalP + retailer.length;
    //console.log('retailer: ', retailer);

    //if total is round figure
    if(Math.floor(receipt.total)==receipt.total){
        totalP=totalP+50;
    }

    //if total is multiple of 0.25
    if(receipt.total%0.25==0){
        totalP=totalP+25;
    }

    //5 points for every two items on the receipt.
    const itemLength=Math.floor(receipt.items.length / 2);
    totalP = totalP + itemLength*5;


    //description
    receipt.items.map(ele=>{
        // console.log('inside mqap');
        if(ele.shortDescription.trim().length%3==0){
            // console.log('inside map if');
            let price=ele.price * 0.2;
            price= Math.ceil(price);
            totalP=totalP+price;
        }
    });

    //odd purchase date
    // console.log('#####: ',receipt.purchaseDate.split('-')[2]);

    const purchaseDay=Number(receipt.purchaseDate.split('-')[2]);
    if(purchaseDay%2!=0){
        totalP=totalP+6;
    }

    //purchase time
    const purchaseTime=Number(receipt.purchaseTime.split(':')[0]);
    //console.log('purchaseTime: ',purchaseTime);
    if(purchaseTime>=14 && purchaseTime<16){
        totalP=totalP+10;
    }

    return totalP;

};
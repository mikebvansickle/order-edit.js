//##Add-to-Cart/Backorder-Function: that does all the Cart Button computation and work
  function ATCCalc(qty, avail, spq){
  	if(qty <= 0){
    	return "";
    }
  	var overflow = avail%spq; //Gives amount of overflow they can order over a multiple of spq if can reach next multiple of spq
    var qtyNumSPQ = Math.floor(qty/spq); //coefficient of quantity values (floor drops all decimal values *DOESNT ROUND*)
    var qtyNumAvail = Math.floor(avail/spq); //coefficient of stock values (floor drops all decimal values *DOESNT ROUND*)
    var qtyATC = (Math.ceil(qty/spq)*spq); //Quantity as multiple of SPQ (ceil rounds UP to next whole number if there are decimal places present)
    var qtyOverflow = ((Math.floor(qty/spq)*spq)+overflow);

    if(qty <= avail){
    	if((qty%spq == 0) && (qtyNumSPQ == qtyNumAvail)){
    	//If the Quantity input is a multiple of Sell Pack Quantity
    		return [qty, ""];
    	}
    	if(qtyNumSPQ == qtyNumAvail){
    	//If Quantity input is not a multiple of Sell Pack Quantity, but within overflow
    		if((qtyNumAvail*spq)+overflow == qty){
    	 	 	return [qtyOverflow, ""];
     	 }else{
         var up = (qtyNumAvail)*spq;
         return [up, spq];
       }
    	}else if(qtyNumSPQ != qtyNumAvail){
    	//If the quantity is not a multiple of Sell Pack Quantity, but less than overflow range
     	 if(Math.round(qty/spq) == 0){
     	 //If the qty/spq rounds to 0
     		 	return [spq, ""];
     	 }else if(Math.round(qty/spq) <= Math.floor(avail/spq)){
     	 //If qty/spq doesn't round to 0
     		 	return [qtyATC, ""];
     	 }else{
      		return [avail, ""];
      	}
    	}
    }else if(qty > avail){
      if(avail > 0){
        if(avail%spq == 0){
          //If order quantity is a multiple of the Sell Pack Quantity
          var BOqty = qty-(Math.ceil(avail/spq)*spq);
          var BONumSPQ = Math.ceil(BOqty/spq);
          var qtyATBO = BONumSPQ*spq;
          var gtrAvail = (Math.ceil(avail/spq))*spq; //Returns the value able to be added to cart if order quantity is greater than stock
          return [avail,qtyATBO];
        }
        //All other cases
        var BOqty = qty-(Math.ceil(avail/spq)*spq);
        var BONumSPQ = Math.ceil(BOqty/spq);
        var qtyATBO = BONumSPQ*spq+spq;
        var gtrAvail = (Math.ceil(avail/spq))*spq;
        return [avail,qtyATBO];
      }else if(avail <= 0){
        //If there are none in stock and only Backorder is available
        var BOqty = Math.ceil(qty/spq)*spq;
        return ["", BOqty];
      }
    }
    return ["", ""];
  };

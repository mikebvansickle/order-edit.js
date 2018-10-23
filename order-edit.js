$(document).ready(function(e){
  //Caches values to use
  var qty = "";
  var pkid = $('#pkid').val();
  var avail = $('#availedit').val();
  var availEdit = parseInt(avail);
  var oQty = $('#qtyorderedit').attr('placeholder');
  var oQtyEdit = parseInt(oQty);
  var spq = $('#spqEdit').val();
  if(spq == 0){
    spq = 1;
  }
  var spqEdit = parseInt(spq);
  //Updates the value stored for qty on keyup when the user enters it
  $('#qtyorderedit').focus(function(){
    $('#qtyorderedit').keyup(function(){
      qty = $('#qtyorderedit').val();
    });
  });

  //Function that executes when the Order Summary Update button is clicked
  $('#submitedit').click(function(e){
    var msg = "";
    qty = $('#qtyorderedit').val();
    var upperBound = (Math.ceil(qty/spqEdit)*spqEdit);
    var lowerBound = (Math.floor(qty/spqEdit)*spqEdit);
    if(isNaN(qty) || qty < 0){
      //Throws an alert if the input is not a number
      msg = "The entered quantity is not valid. Quantity must be a number and cannot be a blank, negative, zero, or a decimal.";
      alert(msg);
      e.preventDefault();
      return false;
    }
    if((qty > availEdit && qty%spqEdit != 0) || (qty < availEdit && qty%spqEdit != 0)){
      //Throws error in alert and prevents update of Order Summary due to invalid input
      if(lowerBound == 0){
        //Won't suggest the user to input 0 or a negative value
        msg = "Quantity must be a multiple of the Sell Pack Quantity: " + spqEdit + "\n\nThe closest valid quantity to your input is " + upperBound +".";
        alert(msg);
        e.preventDefault();
        return false;
      }
      msg = "Quantity must be a multiple of the Sell Pack Quantity: " + spqEdit + "\n\nThe closest valid quantities to your input are " + lowerBound + " and " + upperBound +".";
      alert(msg);
      e.preventDefault();
      return false;
    }else if(qty<=0){
      //Throws error in alert and prevents update of Order Summary due input being zero, blank, negative, or a decimal
      msg = "The entered quantity is not valid. Quantity must be a number and cannot be a blank, negative, zero, or a decimal. \n\nThe quantity must also be a multiple of the Sell Pack Quantity: "+ spqEdit +".";
      alert(msg);
      e.preventDefault();
      return false;
    }else if(qty<=availEdit && (Math.floor(qty/spqEdit) == Math.floor(availEdit/spqEdit)) && (qty != availEdit) && qty%spqEdit != 0){
      //Throws error in alert and prevents update of Order Summary due to invalid input
      if(lowerBound == 0){
        //Won't suggest the user to input 0 or a negative value
        msg = "Quantity must be a multiple of the Sell Pack Quantity: " + spqEdit + "\n\nThe closest valid quantity to your input is " + upperBound +".";
        alert(msg);
        e.preventDefault();
        return false;
      }
      msg = "Quantity must be a multiple of the Sell Pack Quantity: " + spqEdit + "\n\nThe closest valid quantities to your input are " + lowerBound + " and " + upperBound +".";
      alert(msg);
      e.preventDefault();
      return false;
    }else if(qty <= availEdit && qty%spqEdit == 0 && oQtyEdit > availEdit){
      //Sends AJAX request when order quantity goes from greater than stock to less than stock and lets the user know it's no longer on Backorder
      var that = $(this);
          url = "../../functions/order-edit-handler.php",
          type = 'post',
          data = {pkid: pkid, avail: availEdit, qty: qty, oqty: oQty};

      $.ajax({
        url: url,
        type: type,
        data: data,
        success: function(response){
        }
      });
      msg = "The quantity no longer exceeds the available amount ("+avail+") and as a result has been removed from Backorder.";
      alert(msg);
    }else if(qty%spqEdit == 0 && qty > availEdit){
      //Sends AJAX request when order quantity greater than stock
      var that = $(this);
          url = "../../functions/order-edit-handler.php",
          type = 'post',
          data = {pkid: pkid, avail: availEdit, qty: qty, oqty: oQty};

      $.ajax({
        url: url,
        type: type,
        data: data,
        success: function(response){
        }
      });
      if(oQtyEdit <= availEdit){
        //If order quantity goes from less than stock to greater than stock it throws and alert to let the user know it is now on Backorder
        msg = "The Quantity has exceeded the available amount (" + avail + ") and has now been put on Backorder";
        alert(msg);
      }
    }else if((qty%spqEdit == 0 && qty < availEdit) || (qty == availEdit)){
      //Sends AJAX request when order quantity is less than stock or equal to stock
      var that = $(this);
          url = "../../functions/order-edit-handler.php",
          type = 'post',
          data = {pkid: pkid, avail: availEdit, qty: qty, oqty: oQty};

      $.ajax({
        url: url,
        type: type,
        data: data,
        success: function(response){
        }
      });
      if(oQtyEdit > availEdit && qty <= availEdit){
        //If order quantity goes from greater than stock to less than OR equal to stock it throws an alert to let the user know it is removed from Backorder
        msg = "The quantity no longer exceeds the available amount ("+avail+") and as a result has been removed from Backorder.";
        alert(msg);
      }
    }
  });
});

<?php
//Includes RBI Database connection info
include '../Connections/RBI.php';

  if($_POST['qty'] > $_POST['avail']){
    //If quantity entered was greater than stock it will update the OrderType to "Backorder"
    mysql_select_db($database_RBI, $RBI);
    $shipUpdate = "UPDATE ordersummary SET OrderType='backorder' WHERE PK=".$_POST['pkid'];
    $shipQuery = mysql_query($shipUpdate, $RBI) or die(mysql_error());
  }else if($_POST['qty'] <= $_POST['avail']){
    //If quantity entered was less than or equal to stock it will update the OrderType to "ship"
    mysql_select_db($database_RBI, $RBI);
    $shipUpdate = "UPDATE ordersummary SET OrderType='ship' WHERE PK=".$_POST['pkid'];
    $shipQuery = mysql_query($shipUpdate, $RBI) or die(mysql_error());
  }
?>

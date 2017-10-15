<?php
	if($_POST["submit"]) {
    	mail('jasapara.arpit@gmail.com', $_POST['subject'], $_POST['message'], "From: $_POST['name'] <'$_POST['email']>");
    }
?>
<p>Your email has been sent.</p>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@include file="./parts/head.jsp"%>
<title>Ordinazioni 
</title>
</head>
<body>
	<div class="container-fluid">
		<%@include file="./parts/navbar.jsp"%>
		<%
		
		if (utente == null /* || !utente.getRuoloUtente().equalsIgnoreCase("Cassiere") || !utente.getRuoloUtente().equalsIgnoreCase("Cameriere") */ ) {
			response.sendRedirect("./login.jsp");
			return;
		}
		
		
		%>
		<div class="row mt-5" id="tablesList"></div>
		<!-- 	<script type="text/javascript">tablesList();</script> questa � una caagata in mezzo alla stanza -->




	
	</div>
	
<script src="./contents/scripts/homepage.js"></script>
</body>
</html>

<!DOCTYPE html>
<html>
<head>
<%@include file="./parts/head.jsp"%>

<title>Catalogo Prodotti</title>
</head>
<body>
<<<<<<< HEAD

	<div class="container-fluid">
		<div class="row">
			<div class="col-9">
				<%@include file="./parts/navbar.jsp"%>

				<%
					if (role != null && (role != "cameriere" || role != "Cameriere" || role != "Cassiere" || role != "cassiere"
							|| role != "Amministratore" || role != "amministratore")) {
						request.getRequestDispatcher("/login.jsp").forward(request, response);
					}
				%>
				<nav>
=======
<div class="container-fluid">
		<div class="row">
			<div class="col-9">
				<%@include file="./parts/navbar.jsp"%>
<%
			if(role != null && (role != "cameriere" || role!="Cameriere" || role!="Cassiere" || role!="cassiere" || role!="Amministratore" || role!="amministratore")){
				request.getRequestDispatcher("/login.jsp").forward(request, response);	   
		    }
		%>
					<nav>
>>>>>>> 90c8c05eb59e7bb1535a46331a70d59b58cabde9
					<ul class="nav nav-pills nav-fill justify-content-center"
						id="pills-tab" role="tablist">

					</ul>
					<div class="tab-content" id="pills-tabContent"></div>
				</nav>

			</div>
		</div>
	</div>
	<script src="./contents/scripts/utility.js"></script>
	<script src="./contents/scripts/classes/ClassTable.js"></script>
	<script src="./contents/scripts/ProdottiOrdinazione.js"></script>
</body>
</html>

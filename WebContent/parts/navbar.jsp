<%@include file="./GetCookies.jsp"%>
<nav class="nav border-bottom">
  <% if(role.equalsIgnoreCase("Amministratore")){ %>
  <a class="nav-link">Benvenuto <span class="username-menu"><%=username %> | Sei un <%=role %> </span> </a>
   <a class="nav-link" href="./homepage.jsp">Sala in real time</a>
 <a class="nav-link" href="ServletLogout">Logout</a>
 
 <% }else{%>
  <a class="nav-link">Benvenuto <span class="username-menu"><%=username %> | Sei un <%=role %> </span> </a>
 <a class="nav-link" href="ServletLogout">Logout</a>
 <% }%>
</nav>
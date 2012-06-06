<html>
<head>
	<link rel="stylesheet" type="text/css" href="escapeStyle.css" />
	<title>RegisterScore</title>
</head>
<%	
try{
	Class.forName("org.gjt.mm.mysql.Driver").newInstance();
	
	java.sql.Connection db = java.sql.DriverManager.getConnection(
    "jdbc:mysql://mysql.stud.ntnu.no/teodoran_escape",
    "teodoran_escape_",
    "shiboleet");
	
    java.sql.PreparedStatement st = db.prepareStatement("INSERT INTO stats(userName, score, scoreDate) VALUES(?, ?, now())");
	
	String name = request.getParameter("navn");
	int score = Integer.parseInt(request.getParameter("scoreValue"));
	if(name != ""){
		st.setString(1, name);
		st.setInt(2, score);
		st.executeUpdate();
	}
	
	db.close();
} catch (Exception e){
	out.println("Something went terrebly wrong. Sorry!");	
} finally{
	response.sendRedirect("http://folk.ntnu.no/teodoran/highscore.jsp");	
}
%>
<body>
</body>
</html>
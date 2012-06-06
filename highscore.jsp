<html>
<head>
	<link rel="stylesheet" type="text/css" href="escapeStyle.css" />
	<title>Highscore</title>
</head>
<body>
<p><a href="index.htm">Play again</a></p>
<%	
try{
	Class.forName("org.gjt.mm.mysql.Driver").newInstance();
	
	java.sql.Connection db = java.sql.DriverManager.getConnection(
    "jdbc:mysql://mysql.stud.ntnu.no/teodoran_escape",
    "teodoran_escape_",
    "shiboleet");
	
    java.sql.PreparedStatement st = db.prepareStatement("SELECT userName, score FROM stats ORDER BY score DESC");
	java.sql.ResultSet rs = st.executeQuery();

	int place = 1;
	
	while( rs.next() ){
		out.println("<p>[" + place + "] " + rs.getString(1) + ": " + rs.getString(2) + "</p>" );
		place += 1;
	}
	rs.close();
	
	db.close();
} catch (Exception e){
	out.println("Something went terrebly wrong. Sorry!");	
}
%>
</body>
</html>
package edu.umkc.mongorestapp;

import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.json.java.JSON;
import com.ibm.json.java.JSONObject;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.WriteResult;



/**
 * Servlet implementation class UserServlet
 */
@WebServlet("/user")
public class UserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@SuppressWarnings("resource")
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		//MongoClientURI uri = new MongoClientURI("mongodb://root:password@ds035004.mongolab.com:35004/lab7");
		//MongoClient client = new MongoClient(uri);
		
		//DB db = client.getDB(uri.getDatabase());
		//DBCollection myUsers = db.getCollection("users");
		
		//DBCursor docs = myUsers.find();
		//response.getWriter().write(docs.toArray().toString());
		
	//	JSONObject object = new JSONObject();
		//object.put("message", "Hello World");
		//response.getWriter().write(object.toString());
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		
		MongoClientURI uri = new MongoClientURI("mongodb://root:password@ds035004.mongolab.com:35004/lab7");
		MongoClient client = new MongoClient(uri);

		DB db = client.getDB(uri.getDatabase());
		DBCollection users = db.getCollection("users");
//		BasicDBObject query = new BasicDBObject();
//		query.put("name", request.getParameter("name"));
//		query.put("password", request.getParameter("password"));
		DBCursor docs = users.find();
		response.getWriter().write(docs.toArray().toString());
		
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Max-Age", "86400");
	
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		final StringBuilder builder = new StringBuilder();
		final BufferedReader reader = request.getReader();
		
		String line;
		while ((line = reader.readLine()) != null) {
			builder.append(line);
		}
		
		final JSONObject params = (JSONObject) JSON.parse(builder.toString());
		final Document user = new Document(params);
		
		users.insertOne(user);

		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Methods", "POST");
		response.addHeader("Access-Control-Allow-Headers", "Content-Type");
		response.addHeader("Access-Control-Max-Age", "86400");
		response.getWriter().write(user.toJson());
	}

}

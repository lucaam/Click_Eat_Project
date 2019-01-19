package controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import manager.ManagerIngrediente;
import manager.ManagerPiatto;
import model.BeanIngrediente;
import model.BeanPiatto;


@WebServlet("/ControllerPiatto")
public class ControllerPiatto extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String SAVE_DIR = "jsonfiles/";
       
    public ControllerPiatto() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String toGet = request.getParameter("op");
		
		if(toGet.equalsIgnoreCase("1")){
			
			System.out.println("-----------------------");
			System.out.println("Inizio metodo: doGet - Servlet: ControllerPiatto");
			System.out.println("-----------------------");

			ManagerPiatto piatto = new ManagerPiatto();

			ArrayList<BeanPiatto> listaPiatti = piatto.ottieniListaPiatti();
			String appPath = request.getServletContext().getRealPath("");
			String savePath = appPath + File.separator + SAVE_DIR;

			File f = new File(savePath +  "listaPiatti.json");
			if(f.exists() && !f.isDirectory()) { 
				System.out.println("Esiste");
				f.delete();
				f.createNewFile();	
			}
			else {
				System.out.println("non esiste");
				System.out.println("Creazione del file qui:" + f.getAbsolutePath());
				f.createNewFile();	

			}


			ObjectMapper mapper = new ObjectMapper();


			mapper.writeValue(f, listaPiatti);


			System.out.println("-----------------------");
			System.out.println("Fine metodo: doGet - Servlet: ControllerTavolo");
			System.out.println("-----------------------");
		}
		else if(toGet.equalsIgnoreCase("2")) {
			
			System.out.println("-----------------------");
			System.out.println("Inizio metodo: doGet - Servlet: ControllerPiatto");
			System.out.println("-----------------------");
			
			BeanPiatto piatto = new BeanPiatto();
			BeanIngrediente ingrediente = new BeanIngrediente();
			ManagerPiatto piattoManager = new ManagerPiatto();
			ManagerIngrediente ingredienteManager = new ManagerIngrediente();
			ArrayList<BeanIngrediente> listaIngredienti = new ArrayList<BeanIngrediente>();
			
			String nomePiatto = request.getParameter("nomePiatto");
			String categoriaPiatto = request.getParameter("categoriaPiatto");
			String ingredienti = request.getParameter("listaIngredienti");
			String prezzo = request.getParameter("prezzoPiatto");
			Float prezzoPiatto = Float.parseFloat(prezzo);
			
			ArrayList<String> parts = (ArrayList<String>) Arrays.asList(ingredienti.split(","));
			for(String s: parts){
				ingrediente = ingredienteManager.creaIngrediente(s);
				listaIngredienti.add(ingrediente);
			}
			
			piatto = piattoManager.creaPiatto(nomePiatto, prezzoPiatto, categoriaPiatto);
			piatto.setListaIngredienti(listaIngredienti);
			
			piattoManager.inserisciIngredientiNelPiatto(piatto);
			

			System.out.println("-----------------------");
			System.out.println("Fine metodo: doGet - Servlet: ControllerTavolo");
			System.out.println("-----------------------");
		}
	}
	

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}

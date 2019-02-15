

var elementsOrder = new elementsToOrder();
var f = 0;
class navLink
{
	//active : true o false, per settare su attivo un pills al caricamento
	//tabname: nome del tab, di solito uguale al namenav
	//namenav: il nome da visualizzare
	constructor(active,tabname,namenav){
		this.div_class=this.setClass(active);
		this.tab_class= this.setTab_Class(active);
		this.id = "pills-"+tabname;
		this.data_toggle= "pill";
		this.href="#pills-"+tabname;
		this.role="tab";
		this.aria_controls="pills-"+tabname;
		this.aria_selected=active;
		this.data_name=tabname;
		this.namenav = namenav;
	}

	setClass(active)
	{
		return active? "nav-link active" : "nav-link";
	}
	setTab_Class(active)
	{
		return active? "tab-pane fade show active" : "tab-pane fade";
	}
	//crea il singolo nav-link, ognuno per categoria
	createNavLink()
	{
		var a= document.createElement("a");
		$(a).addClass(this.div_class);
		$(a).attr("id",this.id+"-tab");
		$(a).attr("data-toggle",this.data_toggle);
		$(a).attr("href",this.href);
		$(a).attr("role",this.role);
		$(a).attr("aria-controls",this.aria_controls);
		$(a).attr("aria-selected",this.aria_selected);
		$(a).text(this.namenav);
		$(a).css("border","2px solid #007bff");
		return a;
	}
	//crea il panel per ogni nav-link
	createTabPanel(){
		var div = document.createElement("div");
		$(div).addClass(this.tab_class);
		$(div).attr("id",this.id);
		$(div).attr("role","tabpanel");
		$(div).attr("aria-labelledby",this.id +"-tab");
		$(div).attr("data-name",this.data_name);
		return div;
	}
}

var ntavolo = 0;
$(document).ready(function(){
	ntavolo = localStorage.getItem("tavoloordinazione");
	$("#ntavolo").text(ntavolo);
//	console.log(localStorage.getItem("tavoloordinazione"));

	createNavPills();

	sendOrder();
});


function createNavPills(){
	var howToAppendlink = $("#pills-tab");
	var howToAppendContent = $("#pills-tabContent");
	$.get("ServletGetAllPiatti",function(data,status)  {
		var products =JSON.parse(data);
		//transformo la lista di oggetti ingredienti in una lista di stringhe
		products.forEach(function(p){
			p.listaIngredienti = concatIngredienti(p.listaIngredienti);
		}) 
		//ritorno la categoria dei piatti
		var filter = Array.from(new Set(products.map(p => p.categoriaPiatto)))
		.map(categoriaPiatto =>{
			return categoriaPiatto;
		});

		console.log(filter);
		//creo la lista dei link-categorie
		filter.forEach(function(e){;
		if(f == 0){ //la prima volta setta il primo nav-link a true per mostrarlo all'avvio
			var link = new navLink(true,e,e);
			f=1;
		}else
		{
			var link = new navLink(false,e,e);
		}
		//creo il nav-item
		var li = document.createElement("li");
		$(li).addClass("nav-item");
		$(li).append(link.createNavLink());
		$(howToAppendlink).append(li);
		//creo il nav-panel
		var panel = link.createTabPanel();
		$(howToAppendContent).append(panel);
		//popolo il nav-panel
		splitProduct(products,e,panel);
		});


	});
}
var _category="";
//questa funzione viene chiamata in un foreach
function splitProduct(products,navlink,paneltoAppend){
	//setto la categoria corrente
	_category =navlink;
	//mi prendo tutti i campi che hanno per categoria _category
	var table_filtred = products.filter(filterBycategory);
	//creo la tabella
	var table = new TablewithCrudButtons(
			table_filtred,
			navlink,
			[{column:"nomePiatto", nome:"Nome Piatto",show:true},
				{column: "categoriaPiatto",nome:"Categoria",show:false},
				{column: "listaIngredienti",nome:"Lista Ingredienti",show:true},
				{column: "prezzoPiatto",nome:"Prezzo",show:true},
				{column: "idPiatto",nome:"id Piatto",show:false}
				],"add");
	//appendo la tabella al panel
	$(paneltoAppend).append(table.createTable());
	var howToAppend = $("#selected-items");
	var tableOrdering = "";
	//al click di una riga viene aggiunta alla selezione prodotti
	var btn_add = $("#table-"+_category + " > tbody").children("tr").children("td").children("div #add-to-ordering");
	$(btn_add).click(function(event,status){
		$(howToAppend).children().remove();
		var element = {"nomePiatto" : $(this).parent().parent().data("nomepiatto"),
				"prezzoPiatto" : $(this).parent().parent().data("prezzopiatto"),
				"idPiatto": $(this).parent().parent().data("idpiatto"),
				"quantita" : 1};


		elementsOrder.checkifExist(element);
//		elementsOrder.elements.push(element);
		tableOrdering = new TablewithCrudButtons(elementsOrder.elements,
				"ordering",
				[{column: "idPiatto",nome:"id Piatto",show:false},
					{column:"nomePiatto", nome:"Nome Piatto",show:true},
					{column: "prezzoPiatto",nome:"Prezzo",show:false}
					],"remove");
		$(howToAppend).append(tableOrdering.createTable(howToAppend));

	});


}

function filterBycategory(item) {
	if (item.categoriaPiatto == _category) {
		return true;
	} 
}


//funzione che invia i dati al server 
function sendOrder(){
	$("#sendOrder").click(function(){
		var elemsToSend = [];
		$("#table-ordering > tbody").children("tr").each(function(){
			var elem ={"idPiatto": $(this).data("idpiatto"),
					   "quantita": $(this).data("quantita")};
			elemsToSend.push(elem);
		});
		console.log(elemsToSend);


		$.post("ServeltCreaNuovaOrdinazione",
				{ 
				'numeroTavolo':ntavolo,
				'ProdottiOrdinati':  JSON.stringify(elemsToSend)
				})
		.done(function(data){
			console.log(data);
		}).
		fail(function(data){
			console.log(data);
		});




	});
}



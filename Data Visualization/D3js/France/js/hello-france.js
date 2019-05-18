const w =800 ; 
const h = 600 ;
let dataset=[] ;
//Create SVG element

////////////////////////////// draw map //////////////////////////
function draw(selectedcolor){


	///////// add cicles for population ///////
	svg.selectAll("circle")
	.data(dataset)
	.enter()
	.append("circle")
	.attr("width",1)
	.attr("height",1)
	.attr("cx", (d) => x(d.longitude) )
	.attr("cy", (d) => y(d.latitude) )
	.attr("r", (d) => d.population/60000) 
	.style("fill", selectedcolor);


	//Add circles for legend
	//svg.selectAll("circle")
	//.append("circle").attr("cx",750).attr("cy",130).attr("r", 12).style("fill", "black")
	//.append("circle").attr("cx",230).attr("cy",100).attr("r", 12).style("fill", "red");

	//////////  add rect for density  /////////
	svg.selectAll("rect")
	.data(dataset)
	.enter()
	.append("rect")
	.attr("width",1)
	.attr("height",1)
	.attr("x", (d) => x(d.longitude) )
	.attr("y", (d) => y(d.latitude) )	
	.style('fill', function(d) { 
		return xcolor(d.density);
	  })


	/////////  add mousevoer for popup //////////
	.on("mouseover", function(d) {
		div.transition()        
			.duration(20)
			.style("opacity", .9);      
		div.html("<strong>Place :</strong> " + d.place + "<br/>"
		+  "<strong>Population : </strong>" + d.population +"<br/>"
		+ "<strong>Code Postal : </strong>" + d.codePostal) 
			.style("left", (d3.event.pageX + 30) + "px")     
			.style("top", (d3.event.pageY - 30) + "px");
		span.html("<strong>Place :</strong> " + d.place + "<br/>"
		+  "<strong>Population : </strong>" + d.population +"<br/>"
		+ "<strong>Code Postal : </strong>" + d.codePostal);
	})
	.on("mouseout", function(d) {
		div.style("opacity", 2);
		div.html("")
			.style("left", "-500px")
			.style("top", "-500px");
	});

	
	/////////// add x axis /////////////
	svg.append("g")
	.attr("class","x axis")
	.attr("transform", "translate(0," +h-50 + ")")
	.call(d3.axisBottom(x)) 
	////////// add y axis /////////////
	svg.append("g")
	.attr("class","y axis")
	.attr("transform", "translate(0," +w-10 + ")")
	.call(d3.axisRight(y)) ;
}


//////////////////////////// histogram //////////////////////

function drawhist(selectedcolor){

/////// defining some constants
const min = Math.min(d3.min(dataset,d=> d.density));
const max = Math.max(d3.max(dataset,d=> d.density));
const width = "660"
const height = "400"
const margin = {top: 20, right: 20, bottom: 30, left: 40};
let x = d3.scaleLinear()
.domain([min,max/5]).nice() //nice() extent values
.range([margin.left, width-margin.right]);

const xAxis = d3.axisBottom(x)
	  .ticks(10) //10 by default
	  .tickSize(6) //6 by default


// setting width and height of the histogram
svghist
	  .attr("width",width)
	  .attr("height",height) ;

//add axis x
svghist
.append("g")
.attr("class", "axis x_axis")
.attr("transform",`translate(0, ${height-margin.bottom})`)
.call(xAxis)
///add label x
svghist
.append("text")
.attr("x",width-margin.right)
.attr("y",height-margin.bottom-6)
.attr("fill","#3a3a3a")
.attr("text-anchor","end")
.text("Value")


// add title to histogram
svghist.append("text")
.attr("class", "title")
.attr("x", width/2)
.attr("y", 0 - (margin.top / 2))
.attr("fill","#3a3a3a")
.attr("text-anchor", "middle")
.text("Testing");

 //bins
 let n = dataset.length;

 //init histogram
 let histogram = d3.histogram()
				  .value(d=>d.density)
				  .domain(x.domain())
				  .thresholds(x.ticks(100));

 //compute bins
 let bins = histogram(dataset);

 //console.log(bins);
 //console.log("Bin widths:\n"+bins.map(d=> d.x1-d.x0));

  //axis y
  let y = d3.scaleLinear()
    .domain([0,1])
    .range([height - margin.bottom, margin.top])

  const yAxis = d3.axisLeft(y)
                  .ticks(10)   //10 by default
                  .tickSize(6) //6 by default


  //add axis y
  svghist
    .append("g")
    .attr("class", "axis y_axis")
    .attr("transform",`translate(${margin.left},0)`)
    .call(yAxis)

  //add label y
  svghist
    .append("text")
    .attr("x",margin.left)
    .attr("y",margin.top-6)
    .attr("fill","#3a3a3a")
    .attr("text-anchor","start")
    .text("Density")


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
  //generate histogram
console.log(selectedcolor)


/// initialize histogram with white rects
svghist.insert("g", "*")
.attr("fill", "#bbb")

svghist.insert("g", "*")
      .attr("fill", "#bbb")
    .selectAll("rect")
    .data(bins)
    .enter().append("rect")
      .attr("x", function(d) { return x(d.x0) + 1; })
      .attr("y", function(d) { return y(d.length / n); })
      .attr("width", function(d) { return x(d.x1) - x(d.x0); })
	  .attr("height", function(d) { return y(0) - y(d.length / n); })
	  .style("fill", selectedcolor);


}



/////////////////////// update color theme //////////
function update(selectedGroup) {

	// Create new data with the selection?
	//var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} })

	// Give these new data to update line
	console.log(selectedGroup);
	svghist.selectAll('rect').remove();
	drawhist.call(this,selectedGroup);

	svg.selectAll("circle").remove()
	draw.call(this,selectedGroup);

  }
  
//////////////////////////// get html element ///////////////
   // List of groups (here I have one group per column)
   var allGroup = ["purple", "black", "red"]

   // add the options to the button
   d3.select("#selectButton")
	 .selectAll('myOptions')
		.data(allGroup)
	 .enter()
	   .append('option')
	 .text(function (d) { return d; }) // text showed in the menu
	 .attr("value", function (d) { return d; }) // corresponding value returned by the button


d3.select("#map")
.append("h3")
.attr("class", "title")
.attr("x", 100)             
.attr("y", 100)
.attr("align",'center')
.attr("text-anchor", "middle")  
.text("France Map");

// select the svg area


let svg =d3.select("#map")
		   .append("svg")
		   .attr("width", w)
		   .attr("height", h)
		   .attr("align","center"); 


var div = d3.select("#map").append("div")   
	.attr("class", "tooltip")               
	.style("opacity", 0);



var span = d3.select("#info").append("span")   ;
d3.select("#info").append("br")
d3.select("#info").append("br")
d3.select("#info").append("br")


d3.select("#info")
			.append("h3")
			.attr("class", "title")
			.attr("x", w/4)             
			.attr("y", 100)
			.attr("text-anchor", "middle")  
			.text("Density Histogram")
			.attr("align","center"); 
			

			
let svghist= d3.select("#info")
			.append("svg")
			.attr("id","hist")

d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
		// run the updateChart function with this selected option

        update(selectedOption)
    })

/////////////////////// reading data /////////////////////////
d3.tsv("data/france.tsv")
.row((d,i) => { 
	return {
		codePostal :+d["Postal Code"],
		inseeCode :+d.inseecode,
		place :d.place,
		longitude:+d.x,
		latitude: +d.y,
		population : +d.population,
		density: +d.density
	} ;
})
.get((error,rows) =>{
// handle error or set up visualisation here 
	console.log("Loaded"+rows.length+"rows");
	if ( rows.length > 0 )  {
		console.log("First row" , rows[0]) ;
		console.log("Last row:" ,rows[rows.length -1]) ;
		x=d3.scaleLinear()
		 .domain(d3.extent(rows,(row) => row.longitude ))
		 .range([0,w]);
		//console.log(x(rows[0].latitude)) ;

		y=d3.scaleLinear()
		.domain(d3.extent(rows,(row) => row.latitude ))
		.range([h,0]);
		dataset=rows ;

		xcolor= d3.scaleLinear()
		.domain(d3.extent(rows,(row) => row.density *100 ))
		.range(["grey","black"]);


		draw.call(this,"purple") ;
		drawhist.call(this,"purple");
	};
//	dataset=rows ;
} );





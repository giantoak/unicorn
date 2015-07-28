$(document).ready(function() {

	 $.get('timeline', function(data) {
	 	data_outer=JSON.parse(data);
	 	data = JSON.parse(data_outer.date_data)
	 	console.log(data);


	 	var	parseDate = d3.time.format("%Y-%m-%d").parse;

	 	timeline_min = parseDate(data_outer.time_min);
	 	console.log(timeline_min)


	    data.forEach(function(d) {
	        d.date = parseDate(d.Date);
	        d.count = +d.Count;
	    });
	 	console.log(d3.max(data, function(d) { return d.date; }));
	
	    console.log(data);

		var margin = {top: 10, right: 10, bottom: 40, left: 10},
		    width = 1060 - margin.left - margin.right,
		    height = 75 - margin.top - margin.bottom;

		// Parse the date / time

		var x = d3.time.scale().range([width/data.length/2, width-width/data.length/2]);

		var y = d3.scale.linear().range([height, 0]);

		var width_adjuster = (data.length > 40) ? 0.75 : (data.length > 30) ? 0.65 : 0.45
		console.log(data.length);
		console.log(width_adjuster);

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom")
		    .tickFormat(d3.time.format("%b %y"));

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left")
		    .ticks(10);

		var svg = d3.select("#timeline").append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		    .style("margin-bottom", "-10px")
		    .style("margin-top", "-10px")
		  .append("g")
		    .attr("transform", 
		          "translate(" + margin.left + "," + margin.top + ")");
		
		 x.domain([timeline_min, d3.max(data, function(d) { return d.date; }) ]);
		 y.domain([0, d3.max(data, function(d) { return d.count; })]);

		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis)
		    .selectAll("text")
		      .style("text-anchor", "end")
		      .attr("dx", "-.8em")
		      .attr("dy", "-.55em")
		      .attr("transform", "rotate(-90)" )
		      .style("font-size", "8px");

		  svg.selectAll("bar")
		      .data(data)
		    .enter().append("rect")
		      .style("fill", "steelblue")
		      .attr("width", width / data.length * 0.9)
		      .attr("x", function(d) { return x(d.date) -  width / data.length; })
		      .attr("y", function(d) { return y(d.count); })
		      .attr("height", function(d) { return height - y(d.count); });


		    // Draw the brush
		    brush = d3.svg.brush()
		        .x(x)
		        .on("brush", brushmove)
		        .on("brushend", brushend);

		    var arc = d3.svg.arc()
		      .outerRadius(height / 15)
		      .startAngle(0)
		      .endAngle(function(d, i) { return i ? -Math.PI : Math.PI; });

		    brushg = svg.append("g")
		      .attr("class", "brush")
		      .call(brush);

		    brushg.selectAll(".resize").append("path")
		        .attr("transform", "translate(0," +  height / 2 + ")")
		        .attr("d", arc);

		    brushg.selectAll("rect")
		        .attr("height", height);



		// ****************************************
		// Brush functions
		// ****************************************

		function brushmove() {
		    y.domain(x.range()).range(x.domain());
		    b = brush.extent();
		
		    $.ajax({
            type: "POST",
            url: "serve_timeline",
            data: JSON.stringify({dates: b}),
            contentType: "application/json",
            success: function (response) {
            var myDiv = $('#search-results-box'); // The place where you want to insert the template
	        myDiv.html(response);
	    	}})




		    /* var localBrushYearStart = (brush.empty()) ? brushYearStart : Math.ceil(y(b[0])),
		        localBrushYearEnd = (brush.empty()) ? brushYearEnd : Math.ceil(y(b[1]));

		    // Snap to rect edge
		    d3.select("g.brush").call((brush.empty()) ? brush.clear() : brush.extent([y.invert(localBrushYearStart), y.invert(localBrushYearEnd)]));

		    // Fade all years in the histogram not within the brush
		    d3.selectAll("rect.bar").style("opacity", function(d, i) {
		      return d.x >= localBrushYearStart && d.x < localBrushYearEnd || brush.empty() ? "1" : ".4";
		    }); */
		}

		function brushend() {

		  /* var localBrushYearStart = (brush.empty()) ? brushYearStart : Math.ceil(y(b[0])),
		      localBrushYearEnd = (brush.empty()) ? brushYearEnd : Math.floor(y(b[1]));

		    d3.selectAll("rect.bar").style("opacity", function(d, i) {
		      return d.x >= localBrushYearStart && d.x <= localBrushYearEnd || brush.empty() ? "1" : ".4";
		    });

		  // Additional calculations happen here...
		  // filterPoints();
		  // colorPoints();
		  // styleOpacity();

		  */

		  // Update start and end years in upper right-hand corner of the map
		  //d3.select("#brushYears").text(localBrushYearStart == localBrushYearEnd ? localBrushYearStart : localBrushYearStart + " - " + localBrushYearEnd);

		}

		function resetBrush() {
		  brush
		    .clear()
		    .event(d3.select(".brush"));
		}



 })





});

$(document).ready(function() {

	 $.get('timeline', function(data) {
	 	data=JSON.parse(data);
	 	//console.log(data);

	 	var	parseDate = d3.time.format("%Y-%m-%d").parse;

	 	date = []
	 	count = []

	 	for(var i=0; i<data.length;i++){
        	date.push(parseDate(data[i]['Date']));
        	count.push(data[i]['Count']);
        	};

        console.log(date);
        console.log(count);


	    data.forEach(function(d) {
	        d.date = parseDate(d.Date);
	        d.count = +d.Count;
	    });

	    console.log(data);

		var margin = {top: 10, right: 10, bottom: 40, left: 10},
		    width = 960 - margin.left - margin.right,
		    height = 75 - margin.top - margin.bottom;

		// Parse the date / time

		var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);

		var y = d3.scale.linear().range([height, 0]);

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom")
		    .tickFormat(d3.time.format("%m/%y"));

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left")
		    .ticks(10);

		var svg = d3.select("#timeline").append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform", 
		          "translate(" + margin.left + "," + margin.top + ")");

		  console.log(d3.min(date), d3.max(date))
		
		 x.domain(data.map(function(d) { return d.date; }));
		 y.domain([0, d3.max(data, function(d) { return d.count; })]);

		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis)
		    .selectAll("text")
		      .style("text-anchor", "end")
		      .attr("dx", "-.8em")
		      .attr("dy", "-.55em")
		      .attr("transform", "rotate(-90)" );


		  svg.selectAll("bar")
		      .data(data)
		    .enter().append("rect")
		      .style("fill", "steelblue")
		      .attr("x", function(d) { return x(d.date); })
		      .attr("width", x.rangeBand())
		      .attr("y", function(d) { return y(d.count); })
		      .attr("height", function(d) { return height - y(d.count); });



	 })

});

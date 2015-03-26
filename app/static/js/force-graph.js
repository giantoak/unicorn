function get_force_graph(graph, w){
    var width = w;
        height = width;

      var color = d3.scale.category20();

      var a = document.createElement("div") 
      var svg = d3.select(a).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("pointer-events","all")
        .append('svg:g')
        .call(d3.behavior.zoom().on("zoom",redraw))
        .append('svg:g');
      
       var force = d3.layout.force()
          .nodes(graph.nodes)
          .links(graph.links)
          .size([width, height])
          .linkDistance(100)
          .charge(-200)
          .start();

        function redraw(){
          svg.attr("transform","translate("
          + d3.event.translate+")"+" scale("+d3.event.scale+")");
        }

        var link = svg.append("g").selectAll(".link")
            .data(graph.links)
          .enter().append("line")
            .attr("class", "link");

      // Create the groups under svg
      var gnodes = svg.selectAll('g.gnode')
        .data(graph.nodes)
        .enter()
        .append('g')
        .classed('gnode', true);

      // Add one circle in each group
      var node = gnodes.append("circle")
        .attr("class", "node")
        .attr("r", 5)
        .attr("fill","cadetblue")
        .on("click",function(d){
          window.open("/view/"+d.origin)
        })
        .call(force.drag);

      var labels = gnodes.append("text")
        .attr("fill","black")
        .text(function(d) { return d.id; });
      
      force.on("tick", function() {
        // Update the links
        link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

        // Translate the groups
        gnodes.attr("transform", function(d) { 
          return 'translate(' + [d.x, d.y] + ')'; 
        });    

      });

  return a;
}

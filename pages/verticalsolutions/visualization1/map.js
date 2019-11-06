
     function drawTreeMap(id, root, extent,name, type, tooltip) {
       var config = {
           w: 900,
           h: 450,
           r: 4,
           pad: 10
       };
      //  extent=10000;
      //   extent= function(root.descendants()) {console.log(parseFloat(d.data.Gross);
      //      if(extent<parseFloat(d.Gross))
      //     {extent=parseFloat(d.data.Gross);}
      //   }

       var color = d3.scale.linear().domain([0,extent]).range( ["white", "#177725"]);



       // accessor functions for x and y
       var x = function(d) { return d.x; };
       var y = function(d) { return d.y; };

         var svg = d3.select("svg");
         var g = svg.append("g");
         var margin = {
           "top": 10,  "bottom": 25,
           "left": 90, "right": 73
         };

         var plot = {
           "width": svg.attr("width") - margin.left - margin.right,
           "height": svg.attr("height") - margin.top - margin.bottom
         };
         console.log("plot area:", [plot.width, plot.height]);
         g.attr("id", "plot");
         g.attr("transform", translate(margin.left, margin.top));

       //var svg = d3.select("body").select("#" + id);
       svg.attr("width", config.w);
       svg.attr("height", config.h);

       var g = svg.append("g");
       g.attr("id", "plot");
       g.attr("transform", translate(config.pad, config.pad));

       // calculate sum for nested circles
       root.sum(function(d) { return parseFloat(d.Gross); });
       var format=d3.format(".2f");
       // setup treemap layout
       var treemap = d3.treemap()
         .padding(5)
         .size([ config.w - 10 * config.pad,
                 config.h - 5 * config.pad]);

       // run layout to calculate x, y, and r attributes
       treemap(root);
       // draw nested rectangles
       var rects = g.selectAll("rect")
         .data(root.descendants())
         .enter()
         .append("rect")
         .attr("x", function(d) { return d.x0; })
         .attr("y", function(d) { return d.y0; })
         .attr("width", function(d) { return d.x1 - d.x0; })
         .attr("height", function(d) { return d.y1 - d.y0; })
         .attr("id", function(d) { console.log(d.value);return d.data.Title.replace(/[\W_]+/g," ") +", Hours: "+format(d.value); })
         .attr("class", "node")
         .style("stroke", 'red')
         .style("fill", function(d) {return color(parseFloat(d.data.Gross));})
         .on("mouseover", function(d) {

                         tooltip
                           .style("left", d3.event.pageX + "px")
                           .style("top", d3.event.pageY-15 + "px")
                           .style("display", "inline-block")
                           .style("font-size", "150%")
                           .html((d.data.Title.replace(/[\W_]+/g," ")) + "<br>" +  " Hours: " +format(d.value));


          // show_tooltip(g, d3.select(this), );
           d3.select(this).classed("selected", true);
           ;
         })
         .on("mouseout", function(d) {
           //g.select("#tooltip").remove();
           tooltip.style("display", "none");
           d3.select(this).classed("selected", false);
         });
         svg.append('text')
         .data(root.descendants())
          .attr('x',815)
          .attr('y',config.h/2-183)
          .style('font-size','16px')
          .text(function(d){if(type=="ac"){return "Employee:"}else{return "Director:"} })

          var name1 = name.trim().substr(0,name.indexOf(' '));
          var name2 = name.trim().substr(name.indexOf(' ')+1);
          console.log(name2);

          svg.append('text')
          .data(root.descendants())
           .attr('x',815)
           .attr('y',config.h/2-145)
           .style('font-size','20px')
           .text(name2)



        var back= svg.append('rect')
         .attr('x',810)
         .attr('y',config.h/2)
         .attr('rx',6)
         .attr('ry',6)
         .attr('width',85)
         .attr('height',config.h/2-40)
         .style('fill',"#4ECEF9")
         .style('opacity', .4);

         back.on('click', function(d){
           back.style('fill','#F94E4E')
          if(type=="ac"){
            location.href='index.html';
          }
        
         });



           svg.append('text')
            .attr('x',820)
            .attr('y',config.h/2+105)
            .style('font-size','16px')
            .text("Back to")
            svg.append('text')
             .attr('x',820)
             .attr('y',config.h/2+123)
             .style('font-size','16px')

             .text(function(d){if(type=="ac"){return "List"}else{return "Directors"} })


     }

     function translate(x, y) {
       return "translate(" + String(x) + "," + String(y) + ")";
     }

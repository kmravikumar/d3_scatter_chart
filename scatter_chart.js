var dataArray = [
                 ['category A',5,2000], ['category B',10,1000], ['Some text ...long C',19,300], ['D',40,50],
                 ['category Q',5,200], ['category R',10,100], ['Some text ...long S',19,3500], ['T',40,5000]                                                   
                ];

plot_scatter_graph(dataArray, "#scatter_chart", 600, 300, 'yLabel');


// A function to plot D3 line chart - Pass in the data array and the html objectId
// where the chart needs to be.
// Also pass the width, height for the plot
function plot_scatter_graph (dataArray, htmlObjectId, width, height, yLabel) {

    // set margins for a nice looking bar chart
    var margin = {top: 30, right: 50, bottom: 50, left: 50},
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    // Determine max data to set the axis limits
    var maxData = Math.max.apply(Math,dataArray.map(function(d){return d[1];}));
    var minData = Math.min.apply(Math,dataArray.map(function(d){return d[1];}));
    var maxData2 = Math.max.apply(Math,dataArray.map(function(d){return d[2];}));
    var minData2 = Math.min.apply(Math,dataArray.map(function(d){return d[2];}));
    

    // Define linear scale for y-axis
    // Note that the height range is reversed. 
    var heightScale = d3.scaleLinear()
                            .range([height, margin.top])
                            // change 0 to minData is required
                            .domain([0,maxData2])
                            ;
    

    // define linear scale for x-axis
    var widthScale = d3.scaleLinear()
                            .range([margin.left, width])
                            .domain([0,maxData])
                            ;

    // define x,y-axes scale and align them bottom and left
    var yaxis = d3.axisLeft()
                .scale(heightScale)
                .tickSize(3)
                ;


    var xaxis = d3.axisBottom()
                .scale(widthScale)
                .tickSize(0)
                ;

    // Define the canvas which will hold the chart
    var canvas = d3.select(htmlObjectId)
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    ;


    // Define the div for the tooltip
    // The styling and locations need css definitions.
    var div = d3.select(htmlObjectId)
                .append("div")	
                .attr("class", "tooltip")				
                .style("opacity", 0);


     // Add dots for data points. 
     // Also includes tooltip
    canvas.selectAll("dot")
        .data(dataArray)
      .enter().append("circle")
        .attr("r", function(d) { return widthScale(d[1])/10;  })
        .attr("cx", function(d) { return widthScale(d[1]);  })
        .attr("cy", function(d) { return heightScale(d[2]); })
        .attr("fill", "blueviolet")
        .style("opacity", 0.5)
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .7);
            div.html(d[0] + ": " + d[2])
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function() {		
            div.transition()		
                .duration(200)		
                .style("opacity", 0);	
        })
        .on("click", function(d) {
            console.log(d);
        })
        ;




    // Add x-axis to the bar chart canvas
    canvas.append("g")
                .call(xaxis)
                .attr("transform", "translate(0," + height + ")")
                .attr("class", "axis x")  
            .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-4")
                .attr("dy", "4")
                .attr("transform", "rotate(-75)" )
                ;


    // add y-axis to the bar chart canvas
    canvas.append("g")
                .call(yaxis)
                .attr("transform", "translate(" + margin.left +", 0)")
                .attr("class", "axis y")  
            .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0)
                .attr("x", 0)
                .attr("dy", "1.2em")
                .attr("dx", "-5em")
                .style("text-anchor", "end")
                .text(yLabel)
                .attr("fill", "blueviolet");
                ;
                                
}                            
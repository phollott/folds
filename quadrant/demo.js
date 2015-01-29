// call the method below
showScatterPlot(items);
function showScatterPlot(data) {
// just to have some space around items.
var margins = {
"left": 40,
"right": 30,
"top": 30,
"bottom": 30
};
var width = 400;
var height = 400;
var domainwidth = width - margins.left - margins.right;
var domainheight = height - margins.top - margins.bottom;
// this will be our colour scale. An Ordinal scale.
var colors = d3.scale.category10();
// we add the SVG component to the scatter-load div
var svg = d3.select("#scatter-load").append("svg")
.attr("width", width).attr("height", height).append("g")
.attr("transform", "translate(" + margins.left + "," + margins.top + ")");
svg.append("rect")
.style("opacity", 0.1)
.attr("fill", "blue")
.attr("width", domainwidth)
.attr("height", domainheight / 2);
svg.append("rect")
.style("opacity", 0.3)
.attr("fill", "yellow")
.attr("width", domainwidth / 2)
.attr("height", domainheight);
// this sets the scale that we're using for the X axis.
// the domain define the min and max variables to show. In this case, it's the min and max prices of items.
// this is made a compact piece of code due to d3.extent which gives back the max and min of the price variable within the dataset
// simple function fixes the axes so they have room to breathe
// this should really be built into the library for extent
// https://github.com/ScottLogic/d3-financial-components/issues/228
function padExtent(e, p) {
if (p === undefined) p = 1;
return ([e[0] - p, e[1] + p]);
}
// the range maps the domain to values from 0 to the width minus the left and right margins (used to space out the visualization)
var x = d3.scale.linear()
.domain(padExtent(d3.extent(data, function (d) {
return d.price;
})))
.range([0, domainwidth]);
// this does the same as for the y axis but maps from the rating variable to the height to 0. Note that height goes first due to the weird SVG coordinate system
var y = d3.scale.linear()
.domain(padExtent(d3.extent(data, function (d) {
return d.rating;
})))
.range([domainheight, 0]);
// we add the axes SVG component. At this point, this is just a placeholder. The actual axis will be added in a bit
svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + y.range()[0] + ")");
svg.append("g").attr("class", "y axis");
// this is our X axis label. Nothing too special to see here.
svg.append("text")
.attr("fill", "#414241")
.attr("text-anchor", "end")
.attr("x", width / 2)
.attr("y", height - 35)
.text(xaxislabel);
// this is the actual definition of our x and y axes. The orientation refers to where the labels appear - for the x axis, below or above the line, and for the y axis, left or right of the line. Tick padding refers to how much space between the tick and the label. There are other parameters too - see https://github.com/mbostock/d3/wiki/SVG-Axes for more information
var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);
var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);
// this is where we select the axis we created a few lines earlier. See how we select the axis item. in our svg we appended a g element with a x/y and axis class. To pull that back up, we do this svg select, then 'call' the appropriate axis object for rendering.
svg.selectAll("g.y.axis").call(yAxis);
svg.selectAll("g.x.axis").call(xAxis);
// now, we can get down to the data part, and drawing stuff. We are telling D3 that all nodes (g elements with class node) will have data attached to them. The 'key' we use (to let D3 know the uniqueness of items) will be the name. Not usually a great key, but fine for this example.
var item = svg.selectAll("g.node").data(data, function (d) {
return d.name;
});
// quadrant grid: horizontal rules
svg.append("g").attr("class", "qxgrid")
.call(xAxis.tickFormat("").tickSize(340).ticks(2));
svg.select("g.qxgrid").selectAll(".tick")
.style('opacity', 0.4)
.style('stroke', "#000");
svg.select("g.qxgrid .domain").style('fill', 'none');
// quadrant grid: vertical rules
svg.append("g").attr("class", "qygrid")
.call(yAxis.tickFormat("").tickSize(-330).ticks(2));
svg.select("g.qygrid").selectAll(".tick")
.style('opacity', 0.4)
.style('stroke', "#000");
svg.select("g.qygrid .domain").style('fill', 'none');
// we 'enter' the data, making the SVG group (to contain a circle and text) with a class node. This corresponds with what we told the data it should be above.
var itemGroup = item.enter().append("g").attr("class", "node")
// this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items
.attr('transform', function (d) {
return "translate(" + x(d.price) + "," + y(d.rating) + ")";
});
// we add our first graphics element! A circle!
itemGroup.append("circle")
.attr("r", function (d) {
return d.size;
})
.attr("class", "dot")
.style("fill", function (d) {
// remember the ordinal scales? We use the colors scale to get a colour for our category.
return colors(d.category);
});
// now we add some text, so we can see what each item is.
itemGroup.append("text")
.style("text-anchor", "middle")
.attr("dy", -10)
.text(function (d) {
// this shouldn't be a surprising statement.
return d.name;
});
}

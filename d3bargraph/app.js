var data            =   [];

for(var i=0; i<20; i++){
    var num = Math.floor(d3.randomUniform(1,50)());
    data.push(num)
}

console.log(data)

//Create SVG Element
var chart_width = 800;
var chart_height = 400
var bar_padding = 5;
var svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height);

//Bind Data and Create Bars
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => {
        return i * (chart_width / data.length); //0, 40, 80
    })
    .attr('y', (d) => {
        return chart_height - d * 5;
    })
    .attr('width', chart_width / data.length - bar_padding)
    .attr('height', (d) => {
        return d * 5;
    })
    .attr('fill', '#7ED26D');

//Create Labels

svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text((d) => {
        return d;
    })
    .attr('x', (d, i) => {
        // 0 * (800 / 20) * (800/20-5) / 2
        // 0 * (40) + (35) / 2
        // 0 + 17.5
        return i * (chart_width / data.length) + 
        (chart_width / data.length - bar_padding) / 2; //0, 40, 80
    })
    .attr('y', (d) => {
        return chart_height - d * 5 + 15;
    })
    .attr('font-size', 14)
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle');

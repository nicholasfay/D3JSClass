// var data            =   [
//     [ 400, 200 ],
//     [ 210,140 ],
//     [ 722,300 ],
//     [ 70,160 ],
//     [ 250,50 ],
//     [ 110,280 ],
//     [ 699,225 ],
//     [ 90, 220 ]
// ];

var chart_width     =   800;
var chart_height    =   400;
var padding = 50;
var data = [
    { date : '07/01/2017', num: 20},
    { date : '07/02/2017', num: 37},
    { date : '07/03/2017', num: 25},
    { date : '07/04/2017', num: 45},
    { date : '07/05/2017', num: 23},
    { date : '07/06/2017', num: 33},
    { date : '07/07/2017', num: 49},
    { date : '07/08/2017', num: 40},
    { date : '07/09/2017', num: 36},
    { date : '07/10/2017', num: 27}

];

var time_parse = d3.timeParse('%m/%d/%Y');
var time_format = d3.timeFormat('%b %e');

//Loop through each date
data.forEach((e, i) => {
    data[i].date = time_parse(e.date);
})

var svg = d3.select('#chart')
            .append('svg')
            .attr('width', chart_width)
            .attr('height',  chart_height);
//Create Scales
var x_scale = d3.scaleTime()
                .domain([d3.min(data, (d) => {
                    return d.date;
                }), d3.max(data, (d) => {
                    return d.date;
                })])
                .range([padding,chart_width - padding * 2]);

//Range is reversed on here so that the graph reads from bottom to top rather than top to bottom
var y_scale = d3.scaleLinear()
                .domain([0, d3.max(data, (d) => {
                    return d.num;
                })])
                .range([chart_height - padding, padding]);

var a_scale = d3.scaleSqrt()
                .domain([0, d3.max(data, (d) => {
                    return d.num;
                })])
                .range([0,25])

//.nice() rounds your domain to nearest value (e.g. 0.4344 to 0.4 and 0.0912 to 0.1)
//.rangeRound() rounds range after scaling (e.g. 4.55 into a 10x scale turns into 45 and not 45.5)
//.clamp(true) coerces any number outside of the domain to the bound it is near (e.g. domain [5,10] range [50,100] scale input is 3, returns 50 not 30)

//Create Circles
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d) => {
        return x_scale(d.date);
    })
    .attr('cy', (d) => {
        return y_scale(d.num);
    })
    .attr('r', (d) => {
        return a_scale(d.num);
    })
    .attr('fill', '#D1AB0E');

//Create Labels
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text((d) => {
        return time_format(d.date);
    })
    .attr('x', (d) => {
        return x_scale(d.date);
    })
    .attr('y', (d) => {
        return y_scale(d.num);
    });
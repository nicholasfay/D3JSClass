

var svg = d3.select('#chart')
            .append('svg')
            .attr('width', chart_width)
            .attr('height',  chart_height);
//Create Scales
var x_scale = d3.scaleLinear()
                .domain([0, d3.max(data, (d) => {
                    return d[0];
                })])
                .range([padding,chart_width - padding * 2]);

//Range is reversed on here so that the graph reads from bottom to top rather than top to bottom
var y_scale = d3.scaleLinear()
                .domain([0, d3.max(data, (d) => {
                    return d[1];
                })])
                .range([chart_height - padding, padding]);

var r_scale = d3.scaleLinear()
                .domain([0, d3.max(data, (d) => {
                    return d[1];
                })])
                .range([5,30])

var a_scale = d3.scaleSqrt()
                .domain([0, d3.max(data, (d) => {
                    return d[1];
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
        return x_scale(d[0]);
    })
    .attr('cy', (d) => {
        return y_scale(d[1]);
    })
    .attr('r', (d) => {
        return a_scale(d[1]);
    })
    .attr('fill', '#D1AB0E');

//Create Labels
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text((d) => {
        return d.join(',');
    })
    .attr('x', (d) => {
        return x_scale(d[0]);
    })
    .attr('y', (d) => {
        return y_scale(d[1]);
    });

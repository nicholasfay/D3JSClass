var data            =   [
    [ 400, 200 ],
    [ 210, 140 ],
    [ 722, 300 ],
    [ 70, 160 ],
    [ 250, 50 ],
    [ 110, 280 ],
    [ 699, 225 ],
    [ 90, 220 ]
];
var chart_width     =   800;
var chart_height    =   400;
var padding         =   50;

// Create SVG Element
var svg             =   d3.select( '#chart' )
    .append( 'svg' )
    .attr( 'width', chart_width )
    .attr( 'height', chart_height );

// Create Scales
var x_scale         =   d3.scaleLinear()
    .domain([0, d3.max(data, function(d){
        return d[0];
    })])
    .range([ padding, chart_width - padding * 2 ]);

var y_scale         =   d3.scaleLinear()
    .domain([ 0, d3.max(data, function(d){
        return d[1];
    })])
    .range([ chart_height - padding, padding ]);

//Clip Paths
svg.append('clipPath')
    .attr('id', 'plot-area-clip-path')
    .append('rect')
    .attr('x', padding)
    .attr('y', padding)
    .attr('width', chart_width - padding * 3)
    .attr('height', chart_height - padding * 2)

// Create Axis
var x_axis          =   d3.axisBottom( x_scale );

svg.append( 'g' )
    .attr( 'class', 'x-axis' )
    .attr(
        'transform',
        'translate(0,' + (chart_height - padding ) + ')'
    )
    .call( x_axis );

var y_axis          =   d3.axisLeft( y_scale )
    .ticks( 5 );

svg.append( 'g' )
    .attr( 'class', 'y-axis' )
    .attr(
        'transform',
        'translate( ' + padding + ', 0 )'
    )
    .call( y_axis );

// Create Circles
svg.append('g')
    .attr('id', 'plot-area')
    .attr('clip-path', 'url(#plot-area-clip-path)')
    .selectAll( 'circle' )
    .data( data )
    .enter()
    .append( 'circle' )
    .attr("cx", function(d) {
        return x_scale(d[0]);
    })
    .attr("cy", function(d) {
        return y_scale(d[1]);
    })
    .attr("r", 15)
    .attr( 'fill', '#D1AB0E' );

//Events

d3.select('button')
    .on('click', () => {
        //Create Random Data
        data = [];
        var max_num = Math.random() * 1000;
        for(var i = 0 ; i < 8; i++){
            var new_x = Math.floor(Math.random() * max_num);
            var new_y = Math.floor(Math.random() * max_num);
            data.push([new_x, new_y]);
        }

        //Update scales
        x_scale.domain([0, d3.max(data, (d) => {
            return d[0];
        })]);

        y_scale.domain([0, d3.max(data, (d) => {
            return d[1];
        })]);

        var colors = [
            '#F26D6D',
            '#1E6190',
            '#7559D9',
            '#D1AB03'
        ];
        var color_index = Math.floor(
            Math.random() * colors.length
        );

        //Group the circles here so that clip path can optimally be applied to group rather than each circle individually
        svg.selectAll('circle')
            .data(data)
            .transition()
            .duration(1000)
            //Arrow functions can't be used when using this within the scope because they inherit their scoping of this, which breaks the function
            // .on('start', function() {
            //     d3.select(this)//returns current circle being animated
            //         //You can have multiple transitions happen at the same time around the chart but you can't apply multiple transitions to the same element at the same time. This problem occurs in only start and not end events due to the transitions being over by the end event.
            //         // .transition()
            //         .attr('fill', '#F26D2D');
            // })
            .attr("cx", function(d) {
                return x_scale(d[0]);
            })
            .attr("cy", function(d) {
                return y_scale(d[1]);
            })
            // .on('end', function() {
            //     var colors = [
            //         '#F26D6D',
            //         '#1E6190',
            //         '#7559D9',
            //         '#D1AB03'
            //     ];
            //     var color_index = Math.floor(
            //         Math.random() * colors.length
            //     );

                // d3.select(this) //returns current circle being animated
            .transition()//First transition will handle all of the change up until the second transition
            .attr('fill', colors[color_index]);
            // });

        //Update Axis
        svg.select('.x-axis')
            .transition()
            .duration(1000)
            .call(x_axis)
        
        svg.select('.y-axis')
            .transition()
            .duration(1000)
            .call(y_axis)
    })

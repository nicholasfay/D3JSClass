var data            =   [6,20,21,14,2,30,7,16,25,5,11,28,10,26,9];

// Create SVG Element
var chart_width     =   800;
var chart_height    =   400;
var sort_flag = false;
var svg             =   d3.select( '#chart' )
    .append( 'svg' )
    .attr( 'width', chart_width )
    .attr( 'height', chart_height );

// Create Scales
var x_scale         =   d3.scaleBand()
    .domain( d3.range( data.length ) )
    .rangeRound([ 0, chart_width ])
    .paddingInner( 0.05 );
var y_scale         =   d3.scaleLinear()
    .domain([
        0, d3.max( data )
    ])
    .range([ 0, chart_height ]);

// Bind Data and create bars
svg.selectAll( 'rect' )
    .data( data )
    .enter()
    .append( 'rect' )
    .attr( 'x', function( d, i ){
        return x_scale(i);
    })
    .attr( 'y', function(d ){
        return chart_height - y_scale( d );
    })
    .attr( 'width', x_scale.bandwidth() )
    .attr( 'height', function( d ){
        return y_scale( d );
    })
    .attr( 'fill', '#7ED26D' )
    // .append('title')
    // .text((d) => {
    //     return d;
    // });
    .on('mouseover', function(d){
        //This will grab the current elements x attribute for you
        var x = parseFloat(d3.select(this).attr('x')) +
            x_scale.bandwidth() / 2;
        var y = parseFloat(d3.select(this).attr('y')) /
                2 + chart_height / 2;
        d3.select('#tooltip')
            .style('left', x + 'px')
            .style('top', y + 'px')
            .style('display', 'block')
            .text(d);
    })
    .on('mouseout', () => {
        d3.select('#tooltip')
            .style('display', 'none');
    });
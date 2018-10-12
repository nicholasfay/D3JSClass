var data            =   [6,20,21,14,2,30,7,16,25,5,11,28,10,26,9];

// Create SVG Element
var chart_width     =   800;
var chart_height    =   400;
var bar_padding     =   5;
var svg             =   d3.select( '#chart' )
    .append( 'svg' )
    .attr( 'width', chart_width )
    .attr( 'height', chart_height );

//Create Scales
// 800 / 15 = 53.33 because 800 width with 15 items in array
// 0, 53.33, 106.66....

//D3.range is a way to trick d3 into thinking numerical data is categorical by creating an array of unique indices which act as the categorical values
//SVG has a hard time drawing fractions of pixels therefore rounding your numbers will often result in cleaner looking visualizations, rangeRound is used here to do this
var x_scale = d3.scaleBand()
                .domain(d3.range(data.length))
                .rangeRound([0, chart_width])
                .paddingInner(0.05);

var y_scale = d3.scaleLinear()
                .domain([0,d3.max(data)])
                .rangeRound([0, chart_height])

// Bind Data and create bars
svg.selectAll( 'rect' )
    .data( data )
    .enter()
    .append( 'rect' )
    .attr( 'x', function( d, i ){
        //Index should be used here because that is the piece of information we used as its unique identifier in the pseudo categorical array
        return x_scale(i);
    })
    .attr( 'y', function(d ){
        return chart_height - y_scale(d);
    })
    .attr( 'width', x_scale.bandwidth() )
    .attr( 'height', function( d ){
        return  y_scale(d);
    })
    .attr( 'fill', '#7ED26D' );

// Create Labels
svg.selectAll( 'text' )
    .data(data)
    .enter()
    .append( 'text' )
    .text(function( d ){
        return d;
    })
    .attr( 'x', function( d, i ){
        return x_scale(i) + x_scale.bandwidth() / 2;
    })
    //15 is added here to slightly push down labels because otherwise they will be at same y coordinate as top of bar
    .attr( 'y', function(d ){
        return chart_height - y_scale(d) + 15;
    })
    .attr( 'font-size', 14 )
    .attr( 'fill', '#fff' )
    .attr( 'text-anchor', 'middle' );

//Events

d3.select('button').on('click', () => {
    // data.reverse();

    data[0] = 50;
    y_scale.domain([0, d3.max(data)]);
    svg.selectAll('rect')
        .data(data)
        .transition()
        .delay((d, i) => {
            return i/ data.length * 1000; //Max delay is 1seconds for last element using this trick, * 2000 would be 2s
        })
        .duration(1000)
        .ease(d3.easeElasticOut)
        .attr( 'y', function(d ){
            return chart_height - y_scale(d);
        })
        .attr( 'height', function( d ){
            return  y_scale(d);
        });

        svg.selectAll( 'text' )
        .data(data)
        .transition()
        .delay((d, i) => {
            return i/ data.length * 1000; //Max delay is 1seconds for last element using this trick, * 2000 would be 2s
        })
        .duration(1000)
        .ease(d3.easeElasticOut)
        .text(function( d ){
            return d;
        })
        //15 is added here to slightly push down labels because otherwise they will be at same y coordinate as top of bar
        .attr( 'y', function(d ){
            return chart_height - y_scale(d) + 15;
        });
});
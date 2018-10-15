//Drag Only Map

// // Width and height
// var chart_width     =   800;
// var chart_height    =   600;

// //Quantized scale can bucket data ranges into categorical buckets
// var color = d3.scaleQuantize().range([
//     'rgb(255,245,240)','rgb(254,224,210)','rgb(252,187,161)',
//     'rgb(252,146,114)','rgb(251,106,74)','rgb(239,59,44)',
//     'rgb(203,24,29)','rgb(165,15,21)','rgb(103,0,13)'
// ])

// //Projection
// var projection = d3.geoAlbersUsa()
//                     .scale([chart_width * 5])
//                     .translate([chart_width/2, chart_height/2]);
// var path = d3.geoPath(projection);

// // Create SVG
// var svg             =   d3.select("#chart")
//     .append("svg")
//     .attr("width", chart_width)
//     .attr("height", chart_height);

// var drag_map = d3.drag().on('drag', () => {
//     var offset = projection.translate();
//     offset[0] += d3.event.dx;
//     offset[1] += d3.event.dy;

//     projection.translate(offset);

//     svg.selectAll('path')
//         .transition()
//         .attr('d', path);

//     svg.selectAll('circle')
//         .transition()
//         .attr('cx', (d) => {
//             return projection([d.lon, d.lat])[0];
//         })
//         .attr('cy', (d) => {
//             return projection([d.lon, d.lat])[1];
//         });
// });

// var map = svg.append('g')
//             .attr('id', 'map')
//             .call(drag_map);

// map.append('rect')
//     .attr('x', 0)
//     .attr('y', 0)
//     .attr('width', chart_width)
//     .attr('height', chart_height)
//     .attr('opacity', 0);

// //Data
// d3.json('zombie-attacks.json').then((zombie_data) => {
//     color.domain([
//         d3.min(zombie_data, (d) => {
//             return d.num;
//         }),
//         d3.max(zombie_data, (d) => {
//             return d.num;
//         })
//     ])

//     d3.json('us.json').then((us_data) => {
//         us_data.features.forEach((us_e, us_i) => {
//             zombie_data.forEach( (z_e, z_i) => {
//                 if(us_e.properties.name !== z_e.state){
//                     return null;
//                 }

//                 us_data.features[us_i].properties.num = parseFloat(z_e.num);
//             })
//         })
//         map.selectAll('path')
//             .data(us_data.features)
//             .enter()
//             .append('path')
//             .attr('d', path)
//             .attr('fill', (d) => {
//                 var num = d.properties.num;
//                 return num ? color(num) : '#ddd';
//             })
//             .attr('stroke', '#fff')
//             .attr('stroke-width', 1);

//         draw_cities();
//     });
// });

// function draw_cities(){  
//     d3.json('us-cities.json').then((city_data) => {
//         map.selectAll('circle')
//             .data(city_data)
//             .enter()
//             .append('circle')
//             .style('fill', '#9D497A')
//             .style('opacity', 0.8)
//             .attr('cx', (d) => {
//                 return projection([d.lon, d.lat])[0];
//             })
//             .attr('cy', (d) => {
//                 return projection([d.lon, d.lat])[1];
//             })
//             .attr('r', (d) => {
//                 return Math.sqrt(parseInt(d.population) * 0.00005);
//             })
//             .append('title')
//             .text((d) => {
//                 return d.city;
//             })
//     })
// }

// d3.selectAll('#buttons button').on('click', function(){
//     var offset = projection.translate();
//     var distance = 100;

//     //This is to select which button is clicked
//     var direction = d3.select(this).attr('class')

//     if(direction == "up"){
//         offset[1] += distance;
//     }
//     else if (direction =="down"){
//         offset[1] -= distance;
//     }
//     else if (direction =="left"){
//         offset[0] += distance;
//     }
//     else if (direction =="right"){
//         offset[0] -= distance;
//     }

//     projection.translate(offset);

//     svg.selectAll('path')
//         .transition()
//         .attr('d', path);

//     svg.selectAll('circle')
//         .transition()
//         .attr('cx', (d) => {
//             return projection([d.lon, d.lat])[0];
//         })
//         .attr('cy', (d) => {
//             return projection([d.lon, d.lat])[1];
//         });

// });

//Zoom and Pan Map

// Width and height
var chart_width     =   800;
var chart_height    =   600;

//Quantized scale can bucket data ranges into categorical buckets
var color = d3.scaleQuantize().range([
    'rgb(255,245,240)','rgb(254,224,210)','rgb(252,187,161)',
    'rgb(252,146,114)','rgb(251,106,74)','rgb(239,59,44)',
    'rgb(203,24,29)','rgb(165,15,21)','rgb(103,0,13)'
])

//Projection
var projection = d3.geoAlbersUsa()
                    .translate([0,0]);
var path = d3.geoPath(projection);

// Create SVG
var svg             =   d3.select("#chart")
    .append("svg")
    .attr("width", chart_width)
    .attr("height", chart_height);

var zoom_map = d3.zoom()
    .scaleExtent([0.5, 3.0])
    .translateExtent([
        [-1000, -500],
        [1000, 500]
    ])
    .on('zoom', () => {
    var offset = [d3.event.transform.x, d3.event.transform.y];

    var scale = d3.event.transform.k * 2000;

    projection.translate(offset)
                .scale(scale);

    svg.selectAll('path')
        .transition()
        .attr('d', path);

    svg.selectAll('circle')
        .transition()
        .attr('cx', (d) => {
            return projection([d.lon, d.lat])[0];
        })
        .attr('cy', (d) => {
            return projection([d.lon, d.lat])[1];
        });
});

var map = svg.append('g')
            .attr('id', 'map')
            .call(zoom_map)
            .call(
                zoom_map.transform, 
                d3.zoomIdentity
                    .translate(chart_width / 2, chart_height / 2)
                    .scale(1)
            );

map.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', chart_width)
    .attr('height', chart_height)
    .attr('opacity', 0);

//Data
d3.json('zombie-attacks.json').then((zombie_data) => {
    color.domain([
        d3.min(zombie_data, (d) => {
            return d.num;
        }),
        d3.max(zombie_data, (d) => {
            return d.num;
        })
    ])

    d3.json('us.json').then((us_data) => {
        us_data.features.forEach((us_e, us_i) => {
            zombie_data.forEach( (z_e, z_i) => {
                if(us_e.properties.name !== z_e.state){
                    return null;
                }

                us_data.features[us_i].properties.num = parseFloat(z_e.num);
            })
        })
        map.selectAll('path')
            .data(us_data.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('fill', (d) => {
                var num = d.properties.num;
                return num ? color(num) : '#ddd';
            })
            .attr('stroke', '#fff')
            .attr('stroke-width', 1);

        draw_cities();
    });
});

function draw_cities(){  
    d3.json('us-cities.json').then((city_data) => {
        map.selectAll('circle')
            .data(city_data)
            .enter()
            .append('circle')
            .style('fill', '#9D497A')
            .style('opacity', 0.8)
            .attr('cx', (d) => {
                return projection([d.lon, d.lat])[0];
            })
            .attr('cy', (d) => {
                return projection([d.lon, d.lat])[1];
            })
            .attr('r', (d) => {
                return Math.sqrt(parseInt(d.population) * 0.00005);
            })
            .append('title')
            .text((d) => {
                return d.city;
            })
    })
}

d3.selectAll('#buttons button.panning').on('click', function(){
    var distance = 100;

    //This is to select which button is clicked
    var direction = d3.select(this).attr('class').replace('panning ', '');

    var x = 0;
    var y = 0;

    if(direction == "up"){
        y += distance;
    }
    else if (direction =="down"){
        y -= distance;
    }
    else if (direction =="left"){
        x += distance;
    }
    else if (direction =="right"){
        x -= distance;
    }

    map.transition()
        .call(zoom_map.translateBy,x,y);

});

d3.selectAll('#buttons button.zooming').on('click', function(){
    var scale = 1;
    //This is to select which button is clicked
    var direction = d3.select(this).attr('class').replace('zooming ', '');

    if(direction == "in"){
        scale = 1.25;
    }
    else if (direction =="out"){
        scale = 0.75;
    }

    map.transition()
        .call(zoom_map.scaleBy, scale);

});
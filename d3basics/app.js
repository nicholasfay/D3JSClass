d3.csv('data.csv').then((data) => {
    // generate(data.columns)
});

d3.json('data.json').then((data) =>{
    // generate(data)
})

function generate(dataset){
    var el = d3.select('body')
            .selectAll('p')
            .data(dataset)
            .enter()
            //Anything chained after enter will be looped, it will append a paragraph with hello world for each data element in the dataset above
            .append('p')
            .text((d) => {
                return 'This paragraph is binded to the number ' + d;
            })
            // .append('p')
            .attr('class', (d) =>{
                if(d>25){
                    return 'foo'
                }
                else{
                    return null;
                }
            })
            //Classed takes in a class name and true to add it and false to remove it
            // .classed('foo', true)
            .classed('bar', (d) => {
                return d < 25; // 10 returns 10 < 25 = true, 40 < 25 = false
            })
            .style('color', (d) => {
                if(d > 25){
                    return 'red';
                }
                else{
                    return 'blue';
                }
            });
            // .text('Hello World!');

    console.log(el)
}
// Setting footer year
document.getElementById("date").textContent = new Date().getFullYear();

async function main() {
  
//   Getting data from API
  const moviesResp = await fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json");
  
//   Getting the movies
  const movies = await moviesResp.json();

// Creating color shcheme
  const colors = d3.scaleOrdinal(d3.schemeSet2);
  
//   select svg
  const svg = d3.select("svg#treemap")
  
//   Creating a tooltip
  const tooltip = d3.select("body").append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .attr("id", "tooltip");
  
//   creating our root from the data
  const root = d3.hierarchy(movies).sum(d => d.value);

//   Accessing svg height and weight
  const width = svg.attr("width");
  const height = svg.attr("height");
  
//   Creating the treemap
  const treemap = d3.treemap()
                    .size([width, height])
                    .padding(1);
  
//   Callng the treemap with root data
  treemap(root);
  
//   Creating the cells
  const cell = svg.selectAll('g')
                  .data(root.leaves())
                  .enter()
                  .append('g')
                  .attr('class', 'group')
                  .attr('transform', d =>{
                    return 'translate(' + d.x0 + ',' + d.y0 + ')';
                  });
  
  
//   Append rectangles
 cell.append("rect")
     .attr("width", d => d.x1 - d.x0)
     .attr("height", d => d.y1 - d.y0)
     .attr("data-name", d => d.data.name)
     .attr("data-category", d => d.data.category)
     .attr("data-value", d => d.data.value)
     .attr("class", "tile")
     .style("fill", d => colors(d.data.category))
     .on("mouseover", (event, d) => {
          tooltip.style("opacity", 0.9);
          tooltip.attr("data-value", d.data.value);
          tooltip.html("Name : " + d.data.name + "</br>" +
                       "Categoty : "+ d.data.category + "</br>" +
                      "Value : " + d.data.value);
          tooltip.style("left", (event.pageX + 10) + "px");
          tooltip.style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", () => tooltip.style("opacity", 0));
  
//   Append texts  
    cell.append('text')
        .attr('class', 'tile-text')
        .selectAll('tspan')
        .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
        .enter()
        .append('tspan')
        .attr('x', 3)
        .attr('y', (d, i) => 13 + i * 12)
        .text(d => d);
  
//   Create legend
  const {children: movieData} = movies;
  const categories = movieData.map(movie => movie.name);
  
  const legend = d3.select("svg#legend");
  const blockSize = 20;
  const legendHeight = legend.attr("height") / categories.length;
  
  
//   Create rect blocks
//   Generate legend
  legend.selectAll("rect")
        .data(categories)
        .enter()
        .append("rect")
        .attr("id", "legend")
        .attr("class", "legend-item")
        .attr("width", blockSize*1.25)
        .attr("height", blockSize)
        .attr("x",  blockSize)
        .attr("y", (d, i) => 10 + i * (blockSize + 15))
        .attr("fill", d => colors(d))
        
//   Getting the categories
    legend.selectAll("text")
        .data(categories)
        .enter()
        .append("text")
        .attr("class", "legend-text")
        .attr("width", blockSize*1.25)
        .attr("height", blockSize)
        .attr("x",  blockSize*2.75)
        .attr("y", (d, i) => 25 + i * (blockSize + 15))
        .text(d => d)
        .attr("fill", d => colors(d))
//  const legend = svg.append("g").attr("transform", `translate(${width*0.975}, ${height*0.35})`)
//       .attr("id", "legend")
//        .style("fill", "#f4ebc1");
 
//  legend.append("rect")
//       .attr("width", padding*0.65)
//       .attr("height", padding*0.65)
//       .style("fill", "#5eaaa8");
  
//  legend.append("text")
//         .text("No doping allegations")
//         .attr("x", -3.65*padding)
//         .attr("y", padding*0.4);
  
// legend.append("rect")
//       .attr("width", padding*0.65)
//       .attr("height", padding*0.65)
//       .attr("y", padding*0.85)
//       .style("fill", "#ff6f3c");
  
//    legend.append("text")
//         .text("Riders with doping allegations")
//         .attr("x", -5*padding)
//         .attr("y", padding*1.25)
  
}

main();
// Accessing our svg element
// const svg = d3.select("svg");

// function renderPlot(dataset) {

//   const padding = 40;
//   const radius = 7;
  
//   svg.append("text").text("Time in Minute").attr('transform', 'rotate(-90)').attr("x", -height*0.45).attr("y", padding*0.45).style("fill", "#f4ebc1");
  
  
//   const xScale = d3.scaleLinear().domain([d3.min(dataset, d => d.Year-1),d3.max(dataset, d => d.Year+1)]).range([0, width]);
  
//   const xAxis = d3.axisBottom(xScale).tickFormat(d => d);
    
//   svg.append("g")
//      .attr("transform",`translate(${1.5*padding},${height - padding/2})`)
//      .attr("class", "axis")
//      .attr("id", "x-axis")
//      .call(xAxis);
  
//   const yScale = d3.scaleLinear().domain([d3.min(dataset, d => d.Seconds), d3.max(dataset, d => d.Seconds)]).range([0, height - padding]);
  
//   const yAxis = d3.axisLeft(yScale).tickFormat(d => {
//     const format = parseInt(d/60) + ":" + (d%60 === 0 ? "00" : d%60);
//     return format;
//   });
  
//   svg.append("g")
//      .attr("transform", `translate(${1.5*padding}, ${padding/2})`)
//      .attr("class", "axis")
//      .attr("id", "y-axis")
//      .call(yAxis);
 

  
//   svg.selectAll("circle")
//      .data(dataset)
//      .enter()
//      .append("circle")
//      .attr("cx", (d,i) => 1.5*padding + xScale(d.Year))
//      .attr("cy", (d,i) => yScale(d.Seconds) + padding/2)
//      .attr("r", radius)
//      .attr("data-xvalue", d => d.Year)
//      .attr("data-yvalue", d => new Date(1970, 0, 1, 0, d.Time.split(":")[0], d.Time.split(":")[1]))
//      .attr("class", "dot")
//      .attr("fill", d => {
//     return d.Doping ? "#ff6f3c" : "#5eaaa8";
//   })
  
  
//  const legend = svg.append("g").attr("transform", `translate(${width*0.975}, ${height*0.35})`)
//       .attr("id", "legend")
//        .style("fill", "#f4ebc1");
 
//  legend.append("rect")
//       .attr("width", padding*0.65)
//       .attr("height", padding*0.65)
//       .style("fill", "#5eaaa8");
  
//  legend.append("text")
//         .text("No doping allegations")
//         .attr("x", -3.65*padding)
//         .attr("y", padding*0.4);
  
// legend.append("rect")
//       .attr("width", padding*0.65)
//       .attr("height", padding*0.65)
//       .attr("y", padding*0.85)
//       .style("fill", "#ff6f3c");
  
//    legend.append("text")
//         .text("Riders with doping allegations")
//         .attr("x", -5*padding)
//         .attr("y", padding*1.25)

// }


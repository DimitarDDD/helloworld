queue()
    .defer(d3.csv, "data/norway_new_car.csv")
    .await(makeGraph);

function makeGraph(error, carsData) {
  var ndx = crossfilter(carsData);     
  
  carsData.forEach(function(d){ 
      d.cars=parseInt(d.cars);
  

show_make_selector(ndx);
show_quantity_sold(ndx);   
show_average_percentage(ndx)

dc.renderAll();
} 
 function show_make_selector(ndx){
dim=ndx.dimension(dc.pluk("Make")); 
 group=dim.group(); 
 
 dc.SelectMenu("#make_selector") 
   .dimension(dim) 
   .group(group)
}
function show_quantity_sold(ndx){
    var dim=ndx.dimension(dc.pluk("Quantity"));
      var group=dim.group(); 
      
      dc.barChart("#quantity_sold") 
      .height(500)  
      .width(400)
      .margins({top: 10, right: 50, bottom: 30, left: 20}) 
      .dimension(dim) 
      .group(group)
      .transitionDuraton(500)
      .x(d3.ordinal.scale()) 
      .xUnits(dc.units.ordinal) 
      .elasticY(true) 
      .xAxisLabel("Quantity") 
      .yAxis().ticks(30);
        .yAxisLabel("The Y Axis")

    
}    
     function show_average_percentage_sold(ndx){   
         var dim=ndx.dimension(dc.pluk("Pct")); 
         
         function add_item(p,  v) { 
         p.count++;
            p.total += v.percentage;
            p.average = p.total / p.count; 
            return p;
             }    
          
           function remove_item(p,  v) { 
          p.count--; 
          if (p.count==0) { 
              p.total=0 ;
              p.average=0;
          }else {
            p.total -= v.percentage;
            p.average = p.total / p.count; 
          }
            return p;
          
           }
          function initialise() {     
         return { count: 0, total: 0, average: 0 }; 
         
          }
         
         
         
         var averagePercentagebyBrand=dim().reduce(add_item remove_item,initialise); 
         
         
         dc.barChart("#average_percentage_share")
          .height(500)  
          .width(400) 
          .margins({top: 10, right: 50, bottom: 30, left: 20})  
          .dimension(dim) 
          .group(averagePercentagebyBrand) 
          .valueAccessor(function(d)){ 
             return d.value.average; 
          })
    
          .transitionDuraton(500)  
          .x(d3.ordinal.scale()) 
          .xUnits(dc.units.ordinal) 
          .elasticY(true) 
           .xAxisLabel("Quantity")  
           yAxis().ticks(18);
         
         
         
     } 
     
     
 
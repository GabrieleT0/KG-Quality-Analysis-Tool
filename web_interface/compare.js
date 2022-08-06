function compare(ids,metrics){
    document.getElementById('checkbox').style.display = 'none'
    document.getElementById('compare-btn').style.display = 'none'
    document.getElementById('metrics').style.display = 'block'
    document.getElementById('reliablePr').style.display = 'block'
    document.getElementById('container-btn').style.display = 'none'
    document.getElementById('cont-back2').style.display = 'block'

    switch(metrics.value){
        case 'Believability':
            hideDiv()
            document.getElementById('wrapT').style.display = 'block'
            var div = document.getElementById('wrapBeliev')
            div.style.display = 'block'
            for(var i = 0; i< ids.length; i++){
                var newDiv = document.createElement('div')
                newDiv.style.display = 'inline-block'
                if(div.children.length < ids.length)
                    div.appendChild(newDiv);
                    drawBeliev(ids[i],newDiv,kgs)
            }
            break;
        
        case 'Availability':
            hideDiv()
            document.getElementById('exportAv-btn').style.display = 'block'
            divAv = document.getElementById('availability')
            divAv.style.display = 'block'
            table = document.createElement('table')
            table.className = 'center'
            table.id = 'tabAv'
            tr1 = document.createElement('tr')
            thT = document.createElement('th')
            thSPARQL = document.createElement('th')
            thRDF = document.createElement('th')
            thDef = document.createElement('th')
            thHelp = document.createElement('th')
            thT.innerHTML = 'KG name'
            thSPARQL.innerHTML = 'SPARQL endpoint'
            thRDF.innerHTML = 'RDF dump'
            thDef.innerHTML = 'URIs deferenceability'
            thHelp.innerHTML = '<a href="#popupAv" class="wrapHelp" ><img src="img/ask.png" width="43" height="43"/></a>'
            tr1.appendChild(thT)
            tr1.appendChild(thSPARQL)
            tr1.appendChild(thRDF)
            tr1.appendChild(thDef)
            tr1.appendChild(thHelp)
            table.appendChild(tr1)
            for(var i = 0; i<ids.length; i++){
                tr = document.createElement('tr')
                drawAv(ids[i],tr,kgs)
                table.appendChild(tr)
            }
            if(divAv.children.length <= 0) //IF DIV 
                divAv.appendChild(table)
            
            break;
            
        case 'Licensing':
            hideDiv()
            document.getElementById('exportLic-btn').style.display = 'block'
            var div = document.getElementById('wrapLic')
            div.style.display = 'inline-block'
            table = document.createElement('table')
            table.className = "center"
            table.id = 'tableLic'
            table.style.marginTop = '45px'
            tableRow = document.createElement('tr')
            tableCell1 = document.createElement('th')
            tableCell2 = document.createElement('th')
            tableCell3 = document.createElement('th')
            tableCell4 = document.createElement('th')
            tableCell1.innerHTML = 'KG name'
            tableCell2.innerHTML = 'License Machine-redeable'
            tableCell3.innerHTML = 'License Human-Redeable'
            tableCell4.innerHTML = 'License (metadati)'
            table.appendChild(tableRow)
            tableRow.appendChild(tableCell1)
            tableRow.appendChild(tableCell4)
            tableRow.appendChild(tableCell2)
            tableRow.appendChild(tableCell3)
            for(var i = 0; i< ids.length; i++){  //IF DIV HAS NO OTHER CHILDREN ADD THE TABLE (TO PREVENT THE ADDITION OF MULTIPLE TABLES)
                tableRow = document.createElement('tr')
                table.appendChild(tableRow)
                drawLic(ids[i],tableRow,kgs)
            }
            if(div.children.length <= 0) //IF DIV 
                div.appendChild(table)

            break;
        
        case 'Interlinking':
            hideDiv()
            document.getElementById('exportInt-btn').style.display = 'block'
            div = document.getElementById('interlinking');
            divTab = document.getElementById('wrap-tableInt');
            div.style.display = 'block'
            divTab.style.display = 'block'
            divTab.style.marginTop = '45px'
            divTab.style.marginBottom = '10px'
            table = document.createElement('table') //DYNAMIC CREATIO OF INTERLINKING TABLE
            table.className = "center"
            table.style.marginTop = '45px'
            table.id = 'tabInt'
            tableRow = document.createElement('tr')
            th1 = document.createElement('th')
            th2 = document.createElement('th')
            th3 = document.createElement('th')
            th4 = document.createElement('th')
            th5 = document.createElement('th')
            th6 = document.createElement('th')
            th7 = document.createElement('th')
            th7.innerHTML = '<a href="#popupInter" class="wrapHelp" ><img src="img/ask.png" width="43" height="43"/></a>'
            th1.innerHTML = 'KG name'
            th2.innerHTML = 'Number of sameAs chains'
            th3.innerHTML = 'Degree of connection'
            th4.innerHTML = 'Clustering coefficient'
            th5.innerHTML = 'Centrality'
            th6.innerHTML = 'PageRank'
            table.appendChild(tableRow)
            tableRow.appendChild(th1)
            tableRow.appendChild(th2)
            tableRow.appendChild(th3)
            tableRow.appendChild(th4)
            tableRow.appendChild(th5)
            tableRow.appendChild(th6)
            tableRow.appendChild(th7)
            for(var i = 0; i< ids.length; i++){
                tableRow = document.createElement('tr')
                table.appendChild(tableRow)
                drawTableInt(ids[i],tableRow,kgs)
            }
            if(divTab.children.length <= 0)
                divTab.appendChild(table)
            
            links = buildGraph(ids,kgs)
            console.log(links)
            drawInter(links,div)
                
            break;
        
        case 'Security':
            hideDiv()
            document.getElementById('exportSec-btn').style.display = 'block'
            var div = document.getElementById('wrapSec')
            div.style.display = 'block'
            table = document.createElement('table')
            table.className = 'center'
            table.id = 'tabSec'
            tableRow = document.createElement('tr')
            th1 = document.createElement('th')  //DYNAMIC BUILDING OF SECURITY TABLE
            th2 = document.createElement('th')
            th3 = document.createElement('th')
            th1.innerHTML = 'KG name'
            th2.innerHTML = 'Use HTTPS on the SPARQL endpoint'
            th3.innerHTML = 'Requires authentication to do query'
            table.appendChild(tableRow)
            tableRow.appendChild(th1)
            tableRow.appendChild(th2)
            tableRow.appendChild(th3)
            for(var i = 0; i< ids.length; i++){
                tableRow = document.createElement('tr')
                table.appendChild(tableRow)
                drawTableSec(ids[i],tableRow,kgs)
            }
            if(div.children.length <= 0)
                div.appendChild(table)
            break
        
        case 'Performance':
            hideDiv()
            divL = document.getElementById('performanceL')
            divT = document.getElementById('performanceT')
            divL.style.display = 'block'
            divT.style.display = 'block'
            //CHART FOR LATENCY
            const chartL = Highcharts.chart({
                chart: {
                    renderTo:divL,
                    type: 'boxplot'
                },
                title: {
                    style:{
                        fontSize:'30px',
                        fontWeight:'bold'
                    },
                    text: 'Latency'
                },
                subtitle: {
                    style:{
                        fontSize:'24px'
                    }
                },
                rangeSelector: {
                    enabled:true
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                },
                xAxis: {
                    type:'datetime',
                },
                yAxis: {
                    title: {
                        text: 'Observations'
                    },
                },
            });
              //CHART FOR THROUGHPUT
            const chartT = Highcharts.chart({
                chart: {
                    renderTo:divT,
                    type: 'boxplot'
                },
                title: {
                    style:{
                        fontSize:'30px',
                        fontWeight:'bold'
                    },
                    text: 'Throughput'
                },
                subtitle: {
                    style:{
                    fontSize:'24px'
                    }
                },
                rangeSelector: {
                    enabled:true
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                },
                xAxis: {
                    type:'datetime',
                },
                yAxis: {
                    title: {
                        text: 'Observations'
                    },
                },
            });
            for(var i = 0; i<ids.length;i++){
                drawLatency(ids[i],chartL,kgs)
            }
            for(var i = 0; i <ids.length; i++){
                drawTP(ids[i],chartT,kgs)
            }
            break;
        
        case 'Accuracy':
            hideDiv()
            div = document.getElementById('accuracy')
            div.style.display = 'block'
            const chartAcc = Highcharts.chart(div, {
                chart: {
                    polar: true,
                    type: 'line'
                },
            
                pane: {
                    size: '95%'
                },

                title: {
                    style:{
                        fontSize:'30px',
                        fontWeight:'bold'
                    },
                    text: 'Accuracy'
                },
                xAxis: {
                    categories: ['Void label', 'Whitespace Problem', 'Literal datatype problem',
                        'FP', 'IFP'],
                    lineWidth: 0,
                    tickmarkPlacement: 'on',
                },
            
                yAxis: {
                    gridLineInterpolation: 'polygon',
                    lineWidth: 0,
                    min: 0,
                    max: 1,
                    plotLines: [{ 
                        width:2,
                        value: 1,
                        color: '#28FF49',
                        label: { 
                            style:{
                                color:'#0090eacc',
                                fontSize:'15px',
                                fontWeight:'bold'
                            },
                        text: 'Best value: 1', // Content of the label. 
                        align: 'left', // Positioning of the label. 
                        }
                    }],
                },
                tooltip: {
                    shared: true,
                
                },
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                align: 'center',
                                verticalAlign: 'bottom',
                                layout: 'horizontal'
                            },
                            pane: {
                                size: '70%'
                            }
                        }
                    }]
                }    
            });
            for(var i = 0; i<ids.length; i++){
                drawSingleAcc(ids[i],chartAcc,kgs)
            }
            break;
        
        case 'Consistency':
            hideDiv()
            div = document.getElementById('consistency')
            div.style.display = 'block'
            divTab = document.getElementById('wrapTab-cons')
            document.getElementById('exportCons-btn').style.display = 'block'
            divTab.style.display = 'block'
            const chartCons = Highcharts.chart(div, {
                chart: {
                    polar: true,
                    type: 'line'
                },
                title: {
					style:{
						fontSize:'30px',
						fontWeight:'bold'
					},
					text: 'Consistency'
				},
            
                pane: {
                    size: '95%'
                },
            
                xAxis: {
                    categories: ['Undef.Cls', 'Undef. Prp.', 'Deprecated Cls./Prp.',
                        'Misspl. Cls', 'Misspl. Prp.'],
                    lineWidth: 0,
                    tickmarkPlacement: 'on',
                },
            
                yAxis: {
                    gridLineInterpolation: 'polygon',
                    lineWidth: 0,
                    min: 0,
                    max: 1,
                    plotLines: [{ 
                        width:2,
                        value: 1,
                        color: '#28FF49',
                        label: { 
                            style:{
                                color:'#0090eacc',
                                fontSize:'15px',
                                fontWeight:'bold'
                            },
                        text: 'Best value: 1', // Content of the label. 
                        align: 'left', // Positioning of the label. 
                        }
                    }],
                },
                tooltip: {
                    shared: true,
                
                },
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                align: 'center',
                                verticalAlign: 'bottom',
                                layout: 'horizontal'
                            },
                            pane: {
                                size: '70%'
                            }
                        }
                    }]
                }
            
            });
            for(var i = 0; i<ids.length; i++){
                drawSingleCons(ids[i],chartCons,kgs)
            }  
            if(divTab.children.length > 0)
                document.getElementById('tabCons').remove()
            table = document.createElement('table')
            table.className = "center"
            table.style.marginTop = '45px'
            table.id = 'tabCons'
            tableRow = document.createElement('tr')  //DYNAMIC BUILDING OF CONSISTENCY TABLE
            th = document.createElement('th')
            th1 = document.createElement('th')
            th2 = document.createElement('th')
            th3 = document.createElement('th')
            th.innerHTML = 'KG name'
            th1.innerHTML = 'Ontology hijacking'
            th2.innerHTML = 'Entity as member of disjoint class'
            th3.innerHTML = '<a href="#popupCons" class="wrapHelp" ><img src="img/ask.png" width="43" height="43"/></a>'
            table.appendChild(tableRow)
            tableRow.appendChild(th)
            tableRow.appendChild(th2)
            tableRow.appendChild(th1)
            tableRow.appendChild(th3)
            for(var i = 0; i<ids.length;i++){
                tr2 = document.createElement('tr')
                table.appendChild(tr2)
                drawTabCons(ids[i],tr2,kgs)
            }
            if(divTab.children.length == 0)
                divTab.appendChild(table)
        
        break;
    
        case 'Verifiability':
            hideDiv()
            document.getElementById('exportVerif-btn').style.display = 'block'
            div = document.getElementById('verifiability')
            div.style.display = 'block'
            table = document.createElement('table')
            tr = document.createElement('tr')
            table.appendChild(tr)
            table.id = 'tableVer'
            table.className = 'center' //DYNAMIC BUILDING OF VERIFIABILITY TABLE
            th1 = document.createElement('th')
            th2 = document.createElement('th')
            th3 = document.createElement('th')
            th4 = document.createElement('th')
            th5 = document.createElement('th')
            th6 = document.createElement('th')
            th7 = document.createElement('th')
            th1.innerHTML = 'KG name'
            th2.innerHTML = 'Vocabularies'
            th3.innerHTML = 'Authors'
            th4.innerHTML = 'Publishers'
            th5.innerHTML = 'Contributors'
            th6.innerHTML = 'Sources'
            th7.innerHTML = 'Signed'
            tr.appendChild(th1)
            tr.appendChild(th2)
            tr.appendChild(th3)
            tr.appendChild(th4)
            tr.appendChild(th5)
            tr.appendChild(th6)
            tr.appendChild(th7)
            for(var i = 0; i<ids.length;i++){
                tr1 = document.createElement('tr')
                drawVerif(ids[i],tr1,kgs)
                table.appendChild(tr1)
            }
            if(div.children.length == 0){
                div.appendChild(table)
            }
            break;
    
        case 'Volatility':
            hideDiv()
            document.getElementById('exportVol-btn').style.display = 'block'
            div = document.getElementById('volatility')
            div.style.display = 'block'
            table = document.createElement('table')
            table.className = 'center'
            table.id = 'tabVol'
            tr1 = document.createElement('tr')  //DYNAMIC BUILDING OF VOLATILITY TABLE
            th1 = document.createElement('th')
            th1.innerHTML = 'KG name'
            th2 = document.createElement('th')
            th2.innerHTML = 'Dataset update frequency'
            tr1.appendChild(th1)
            tr1.appendChild(th2)
            table.appendChild(tr1)
            for(var i = 0; i<ids.length; i++){
                tr = document.createElement('tr')
                drawVolatility(ids[i],tr,kgs)
                table.appendChild(tr)
            }
            if(div.children.length == 0){
                div.appendChild(table)
            }
            break;
    
        case 'Currency':
            hideDiv()
            div = document.getElementById('currency')
            div.style.display = 'block'
            document.getElementById('historyCurr').style.display = 'block'
            document.getElementById('exportCurr-btn').style.display = 'block'
            table = document.createElement('table')
            table.className = 'center'
            table.id = 'currTb'
            tr = document.createElement('tr')  //DTNAMIC BUILDING OF CURRENCY TABLE
            th1 = document.createElement('th')
            th2 = document.createElement('th')
            th3 = document.createElement('th')
            th4 = document.createElement('th')
            th5 = document.createElement('th')
            th6 = document.createElement('th')
            th1.innerHTML = 'KG name'
            th2.innerHTML = 'Creation date'
            th3.innerHTML = 'Modification date'
            th4.innerHTML = 'Number of triples updated'
            th5.innerHTML = 'Percentage of data updated'
            th6.innerHTML = 'Time elapsed since last modification'
            tr.appendChild(th1)
            tr.appendChild(th2)
            tr.appendChild(th3)
            tr.appendChild(th4)
            tr.appendChild(th5)
            tr.appendChild(th6)
            table.appendChild(tr)
            for(var i = 0; i< ids.length; i++){
                tr = document.createElement('tr')
                drawCurrency(ids[i],tr,kgs)
                table.appendChild(tr)
            }
            if(div.children.length == 0){
                div.appendChild(table)
            }
            const historyCurr = Highcharts.chart({ //HISTORICAL UPDATE CHART
                chart: {
                    renderTo:'historyCurr',
                    type: 'line'
                },
                title: {
                    style:{
                        fontSize:'30px',
                        fontWeight:'bold'
                    },
                    text: 'Historical updates'
                },
        
                rangeSelector: {
                    selected: 0,
                    enabled:true
                },
                xAxis: {
                    type:'datetime',
                },
                yAxis: {
                    type:'logarithmic',
                    title: {
                        text: 'no. triples'
                    },
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    },
                    series: {
                        marker: {
                            enabled: true
                        }
                    },
                },
            });
            for(var i = 0; i<ids.length; i++){
                drawHistoryCurr(ids[i],historyCurr,kgs)
            }
            break;
    
        case 'Conciseness':
            hideDiv()
            if(document.getElementById('concisenessTab').children.length > 0 )
                document.getElementById('concTab').remove()
            document.getElementById('exportConc-btn').style.display = 'block'
            document.getElementById('concisenessTab').style.display = 'block'
            table = document.createElement('table')
            table.className = 'center'
            table.id = 'concTab'
            tr = document.createElement('tr')
            th1 = document.createElement('th')
            th2 = document.createElement('th')
            th3 = document.createElement('th')
            th4 = document.createElement('th')
            th1.innerHTML = 'KG name'
            th2.innerHTML = 'Extensional conciseness'
            th3.innerHTML = 'Intensional conciseness'
            th4.innerHTML = '<a href="#popupConc" class="wrapHelp" ><img src="img/ask.png" width="43" height="43"/></a>'
            tr.appendChild(th1)
            tr.appendChild(th2)
            tr.appendChild(th3)
            tr.appendChild(th4)
            table.appendChild(tr)
            for(var i = 0; i<ids.length;i++){
                tr2 = document.createElement('tr')
                drawConcisenessTab(ids[i],tr2,kgs)
                table.appendChild(tr2)
            }
            if(document.getElementById('concisenessTab').children.length == 0){
                divT = document.getElementById('concisenessTab')
                divT.appendChild(table)
            }
            
            break;
        
        case 'Completeness':
            hideDiv()
            divTab = document.getElementById('wrap-compTab')
            if(document.getElementById('wrap-compTab').children.length > 0)
                divTab = document.getElementById('wrap-compTab')
            divTab.style.display = 'block'
            table = document.createElement('table')
            table.className = 'center'
            table.id = 'compTab'
            tr = document.createElement('tr')  //DYNAMIC BUILDING COMPLETENESS TAB (BY DAY)
            th = document.createElement('th')
            th1 = document.createElement('th')
            th2 = document.createElement('th')
            th3 = document.createElement('th')
            th4 = document.createElement('th')
            th5 = document.createElement('th')
            th.innerHTML = 'KG name'
            th1.innerHTML = 'Number of triples'
            th2.innerHTML = 'Number of triples linked'
            th3.innerHTML = 'Interlinking completeness'
            th4.innerHTML = 'Percentage of triples linked'
            th5.innerHTML = '<a href="#popupCompl" class="wrapHelp" ><img src="img/ask.png" width="43" height="43"/></a>'
            tr.appendChild(th)
            tr.appendChild(th1)
            tr.appendChild(th2)
            tr.appendChild(th3)
            tr.appendChild(th4)
            tr.appendChild(th5)
            table.appendChild(tr)
            for(var i = 0; i<ids.length; i++){
                tr2 = document.createElement('tr')
                drawCompletenessTab(ids[i],tr2,kgs)
                table.appendChild(tr2)
            }
            if(divTab.children.length == 0)
                divTab.appendChild(table)
            
            break;
    
        case 'Amount':
            hideDiv()
            divAmount = document.getElementById('amountOfData')
            divAmount.style.display = 'block'
            const chartAmount = Highcharts.chart({ //AMOUNT OF DATA CHART (BY DAY)
                chart: {
                    renderTo: divAmount,
                    type: 'column'
                }, 
                title: {
                    style:{
                        fontSize:'30px',
                        fontWeight:'bold'
                    },
                    text: 'Amount of data'
                },
                xAxis: {
                    type:'datetime',
                },
        
                yAxis: {
                    stackLabels: {
                    enabled: true,
                    formatter: function() {
                            return this.stack;
                    }
                    },
                    title: {
                        text: 'Amount of data'
                    },
                },
                tooltip: {
                    style: {
                        fontSize: '16px',
                        fontWeight: 'bold',
                    },
                    formatter: function () {
                        return '<b>' + this.series.options.id + '</b><br/>' + //KG NAME WHEN OVER IT WITH MOUSE
                            this.series.name + ': ' + this.y + '<br/>'
                        
                    }
                },
                series: [
                {
                    name: 'entities',
                    id: 'entities',
                    color: '#00ff83'
                },
                {
                    name: 'properties',
                    id: 'properties',
                    color: '#404552'
                },
                {
                    name: 'triples',
                    id: 'triples',
                    color: '#7CA9F4'
                },
                ],

                legend:{
                    enabled: true
                },
                plotOptions: {
                    series:{
                        minPointLength:3
                    },
                    column: {
                        stacking: 'normal'
                    }
                },
            });
            for(var i = 0; i<ids.length; i++){
                drawAmount(ids[i],chartAmount,kgs)
            }
            break;
    
        case 'RepresentationalConciseness':
            hideDiv()
            document.getElementById('wrap-repConc').style.display = 'block'
            const chartS = Highcharts.chart({ //REP. CONCISENESS BOXPLOT
                chart: {
                    renderTo:'lengthS',
                    type: 'boxplot'
                },
                title: {
                    style:{
                        fontSize:'30px',
                        fontWeight:'bold'
                    },
                    text: 'URIs length (subject)'
                },
                subtitle: {
                    style:{
                        fontSize:'24px'
                    }
                },
        
                rangeSelector: {
                    enabled:true
                },
            
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                },
            
                xAxis: {
                    type:'datetime',
                },
            
                yAxis: {
                    plotLines: [{
                        value: 80,
                        color: 'red',
                        width: 1,
                        label: {
                            text: 'Optimal value: 80',
                            align: 'center',
                            style: {
                                color: 'gray'
                            }
                        }
                    }],
                    title: {
                        text: 'Observations'
                    },
                },
            });

            const chartP = Highcharts.chart({
                chart: {
                    renderTo:'lengthP',
                    type: 'boxplot'
                } ,
                title: {
                    style:{
                        fontSize:'30px',
                        fontWeight:'bold'
                    },
                    text: 'URIs length (predicate)'
                },
        
                subtitle: {
                    style:{
                        fontSize:'24px'
                    }
                },
        
                rangeSelector: {
                    enabled:true
                },
            
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                },
            
                xAxis: {
                    type:'datetime',
                },
            
                yAxis: {
                    plotLines: [{
                        value: 80,
                        color: 'red',
                        width: 1,
                        label: {
                            text: 'Optimal value: 80',
                            align: 'center',
                            style: {
                                color: 'gray'
                            }
                        }
                    }],
                    title: {
                        text: 'Observations'
                    },
                },
            });
            const chartO = Highcharts.chart({
                chart: {
                    renderTo:'lengthO',
                    type: 'boxplot'
                },
                title: {
                    style:{
                        fontSize:'30px',
                        fontWeight:'bold'
                    },
                    text: 'URIs length (object)'
                },

                subtitle: {
                    style:{
                        fontSize:'24px'
                    }
                },

                rangeSelector: {
                    enabled:true
                },
        
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                },
        
                xAxis: {
                    type:'datetime',
                },
        
                yAxis: {
                    plotLines: [{
                        value: 80,
                        color: 'red',
                        width: 1,
                        label: {
                            text: 'Optimal value: 80',
                            align: 'center',
                        style: {
                            color: 'gray'
                        }
                        }
                    }],
                title: {
                    text: 'Observations'
                },
                },
            });
            for(var i = 0; i<ids.length; i++){
                drawLengthS(ids[i],chartS,kgs)
                drawLengthP(ids[i],chartP,kgs)
                drawLengthO(ids[i],chartO,kgs)
            }
            break;

        case 'RepresentationalConsistency':
            hideDiv()
            divTab = document.getElementById('wrap-repCons')
            document.getElementById('exportRepCons-btn').style.display = 'block'
            divTab.style.display = 'block'
            table = document.createElement('table')
            table.className = 'center'
            table.id = 'tabRepCons'
            tr = document.createElement('tr')  //DYNAMIC BUILDING OF REP. CONDIDTENCY TABLE
            th1 = document.createElement('th')
            th2 = document.createElement('th')
            th3 = document.createElement('th')
            th4 = document.createElement('th')
            th1.innerHTML = 'KG name'
            th2.innerHTML = 'New vocabularies defined in the dataset'
            th3.innerHTML = 'New terms defined in the dataset'
            th4.innerHTML = '<a href="#popupRepCons" class="wrapHelp" ><img src="img/ask.png" width="43" height="43"/></a>'
            table.appendChild(tr)
            tr.appendChild(th1)
            tr.appendChild(th2)
            tr.appendChild(th3)
            tr.appendChild(th4)
            for(var i = 0; i<ids.length; i++){
                tr2 = document.createElement('tr')
                drawRepCons(ids[i],tr2,kgs)
                table.appendChild(tr2)
            }
            if(divTab.children.length == 0){
                divTab.appendChild(table)
            }
            break;
        
        case 'Understendability':
            hideDiv()
            document.getElementById('wrap-tabUnd2').style.display = 'block'
            if(document.getElementById('wrap-tabUnd').children.length > 0)
                document.getElementById('UnderComp').remove()
            document.getElementById('understendability').style.display = 'none'
            document.getElementById('exportUnd1').style.display = 'block'
            document.getElementById('exportUnd2').style.display = 'none'
            document.getElementById('wrap-tabUnd').style.display = 'block'
            table = document.createElement('table')  //DYNAMIC BUILDING OF UNDERSTENDABILITY TABLE (BY DAY)
            table.id = 'UnderComp'
            tr = document.createElement('tr')
            th1 = document.createElement('th')
            th2 = document.createElement('th')
            th3 = document.createElement('th')
            th4 = document.createElement('th')
            th5 = document.createElement('th')
            th6 = document.createElement('th')
            th7 = document.createElement ('th')
            th1.innerHTML = 'KG name'
            th2.innerHTML = 'Number of labels'
            th3.innerHTML = 'Percentage of triples with label'
            th4.innerHTML = 'URI regex'
            th5.innerHTML = 'Example'
            th6.innerHTML = 'Vocabulary used in the KG'
            th7.innerHTML = '<a href="#popupUnder" class="wrapHelp" ><img src="img/ask.png" width="43" height="43"/></a>'
            table.appendChild(tr)
            table.className = 'center'
            tr.appendChild(th1)
            tr.appendChild(th2)
            tr.appendChild(th3)
            tr.appendChild(th4)
            tr.appendChild(th5)
            tr.appendChild(th6)
            tr.appendChild(th7)
            divTab = document.getElementById('wrap-tabUnd')
            for(var i = 0; i<ids.length; i++){
                tr2 = document.createElement('tr')
                drawUnderTab1(ids[i],tr2,kgs)
                table.appendChild(tr2)
            }
            if(divTab.children.length == 0){
                divTab.appendChild(table)
            }
            
            break;
    
        case 'Interpretability':
            hideDiv()
            document.getElementById('interpretability').style.display = 'block'
            document.getElementById('exportInterp').style.display = 'block'
            const chartInterp = Highcharts.chart({  //INTERPRETABILITY CHART (BY DAY)
                chart: {
                    renderTo: 'interpretability',
                    type: 'column'
                }, 
                title: {
                    style:{
                        fontSize:'30px',
                        fontWeight:'bold'
                    },
                    text: 'Interpretability'
                },
                subtitle: {
                    style:{
                        fontSize:'18px',
                    },
                    align: 'center',
                    text: 'The number of blank nodes should be 0 to have a KG with a hight interpretability.'
                },              
                xAxis: {
                    type:'datetime',
                },
        
                yAxis: {
                    type: 'logarithmic',
                    stackLabels: {
                        enabled: true,
                        formatter: function() {
                            return this.stack;
                        }
                    },
                    title: {
                        text: 'no. triples'
                    },
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                },
                tooltip: {
                    style: {
                        fontSize: '16px',
                        fontWeight: 'bold',
                    },
                    formatter: function () {
                        return '<b>' + this.series.options.id + '</b><br/>' + //KG NAME WHEN OVER IT WITH MOUSE
                            this.series.name + ': ' + this.y + '<br/>'
                        
                    }
                },
                legend:{
                    enabled: true
                },
                series: [{
                    name: 'Blank nodes',
                    id: 'blank',
                    color: '#FF9648'
                },
                {
                    name: 'Triples',
                    id: 'triples',
                    color: '#7CA9F4'
                }],
            });
            for(var i = 0; i<ids.length; i++){
                drawInterp(ids[i],chartInterp,kgs)
            }
            if(document.getElementById('wrapTabInter').children.length > 0)
                document.getElementById('interpTab').remove()
            divTab = document.getElementById('wrapTabInter')
            divTab.style.display = 'block'
            table = document.createElement('table')  //DYNAMIC BUILDING OF INTERPRETABILITY TABLE (USE OF RDF STRUCTURES)
            table.className = 'center'
            table.id = 'interpTab'
            tr = document.createElement('tr')
            th1 = document.createElement('th')
            th2 = document.createElement('th')
            th3 = document.createElement('th')
            th1.innerHTML = 'KG name'
            th2.innerHTML = 'Use RDF structures'
            th3.innerHTML = '<a href="#popupInterp" class="wrapHelp" ><img src="img/ask.png" width="43" height="43"/></a>'
            tr.appendChild(th1)
            tr.appendChild(th2)
            tr.appendChild(th3)
            table.appendChild(tr)
            for(var i = 0; i<ids.length; i++){
                tr2 = document.createElement('tr')
                drawTabInterp(ids[i],tr2,kgs)
                table.appendChild(tr2)
            }
            if(divTab.children.length == 0)
                divTab.appendChild(table)

            break;
        
        case 'Versatility':
            hideDiv()
            document.getElementById('exportVers').style.display = 'block'
            divVers = document.getElementById('versatility')
            divVers.style.display = 'block'
            table = document.createElement('table')
            table.id = 'versTab'  //DYNAMIC BUILDING OF VERSATILITY TABLE
            table.className = 'center'
            tr = document.createElement('tr')
            th1 = document.createElement('th')
            th2 = document.createElement('th')
            th3 = document.createElement('th')
            th4 = document.createElement('th')
            th5 = document.createElement('th')
            th6 = document.createElement('th')
            th1.innerHTML = 'KG name'
            th2.innerHTML = 'Serialization formats'
            th3.innerHTML = 'Available languages'
            th4.innerHTML = 'Link SPARQL endpoint'
            th5.innerHTML = 'Link for download as RDF dump'
            th6.innerHTML = '<a href="#popupVers" class="wrapHelp" ><img src="img/ask.png" width="43" height="43"/></a>'
            table.appendChild(tr)
            tr.appendChild(th1)
            tr.appendChild(th2)
            tr.appendChild(th3)
            tr.appendChild(th4)
            tr.appendChild(th5)
            tr.appendChild(th6)
            for(var i = 0; i<ids.length; i++){
                tr2 = document.createElement('tr')
                drawVersatility(ids[i],tr2,kgs)
                table.appendChild(tr2)
            }
            if(divVers.children.length == 0)
                divVers.appendChild(table)
            break;

        case 'Score':
            hideDiv()
            document.getElementById('wrapSwitchScore').style.display = 'block'
            s = getNormalizedScore(ids[0],kgs)
            if(!document.getElementById('typeScore').checked){
                if (document.body.contains(document.getElementById('scoreTab')) == true){
                    tab = document.getElementById('scoreTab')
                    tab.remove()
                }
                document.getElementById('exportScore-btn').style.display = 'block'
                wrapTab = document.getElementById('wrapScore')
                wrapTab.style.display = 'block'
                table = document.createElement('table')
                table.id = 'scoreTab' 
                table.className = 'center'
                thN = document.createElement('th')
                thV = document.createElement('th')
                th3 = document.createElement('th')
                thN.innerHTML = 'KG name'
                thV.innerHTML = 'Score'
                th3.innerHTML = '<a href="#popupScore" class="wrapHelp" ><img src="img/ask.png" width="43" height="43"/></a>'
                tr1 = document.createElement('tr')
                tr1.appendChild(thN)
                tr1.appendChild(thV)
                tr1.appendChild(th3)
                table.appendChild(tr1)
                let btn1 = document.createElement('button')
                let btn2 = document.createElement('button')
                btn1.innerHTML = 'Asc'
                btn1.id = 'b1S'
                btn1.onclick = function (){
                    sortTable(1,'scoreTab',true)
                };
                btn2.innerHTML = 'Dsc'
                btn2.id = 'b2S'
                btn2.onclick = function (){
                    sortTable(1,'scoreTab',false)
                };
                thV.appendChild(btn1)
                thV.appendChild(btn2)
                for(i = 0; i<ids.length; i++){
                    tr = document.createElement('tr')
                    drawScoreTab(ids[i],tr,kgs)
                    table.appendChild(tr)
                }
                if(wrapTab.children.length == 0)
                    wrapTab.appendChild(table)
            }
            else{
                tab = document.getElementById('scoreTab')
                tab.remove()
                document.getElementById('exportScore-btn').style.display = 'block'
                ids = Object.keys(kgs)
                wrapTab = document.getElementById('wrapScore')
                wrapTab.style.display = 'block'
                table = document.createElement('table')
                table.id = 'scoreTab' 
                table.className = 'center'
                thN = document.createElement('th')
                thV = document.createElement('th')
                th3 = document.createElement('th')
                thN.innerHTML = 'KG name'
                thV.innerHTML = 'Score'
                th3.innerHTML = '<a href="#popupScore" class="wrapHelp" ><img src="img/ask.png" width="43" height="43"/></a>'
                tr1 = document.createElement('tr')
                tr1.appendChild(thN)
                tr1.appendChild(thV)
                tr1.appendChild(th3)
                table.appendChild(tr1)
                let btn1 = document.createElement('button')
                let btn2 = document.createElement('button')
                btn1.innerHTML = 'Asc'
                btn1.id = 'b1S'
                btn1.onclick = function (){
                    sortTable(1,'scoreTab',true)
                };
                btn2.innerHTML = 'Dsc'
                btn2.id = 'b2S'
                btn2.onclick = function (){
                    sortTable(1,'scoreTab',false)
                };
                thV.appendChild(btn1)
                thV.appendChild(btn2)
                for(i = 0; i<ids.length; i++){
                    tr = document.createElement('tr')
                    drawScoreTab(ids[i],tr,kgs)
                    table.appendChild(tr)
                }
                if(wrapTab.children.length == 0)
                    wrapTab.appendChild(table)
            }
            break;
        
        default:
            alert('Error')
    }    
}

function drawInter(data,div){
    console.log(data)
    Highcharts.chart({
        chart:{
            type : 'networkgraph',
            renderTo: div,
          },
          title: {
              style:{
                  fontSize:'30px',
                  fontWeight:'bold'
              },
              text: 'Interlinking',
          },
          plotOptions: {
              networkgraph: {
                  keys: ['from', 'to'],
                  layoutAlgorithm: {
                      enableSimulation: true,
                      friction: -0.9
                  }
              }
          },
          series: [{
              dataLabels: {
                  enabled: true,
                  linkFormat: ''
              },
              id: 'Graph',
              marker: {
                  radius: 20
              },
              data: data,
          }]
    });
}

function drawScoreTab(id,tr,kgs){
    kg = getJSONQuality(id,kgs)
    score = getNormalizedScore(id,kgs)
    tdN = document.createElement('td')
    tdV = document.createElement('td')
    tdN.innerHTML = kg.believability.title
    tdV.innerHTML = score.toFixed(2)
    tr.appendChild(tdN)
    tr.appendChild(tdV)
}

function getNormalizedScore(id,kgs){
    k = Object.keys(kgs)
    scoreList = []
    if(k.length > 1){
        for(var i = 0; i<k.length; i++){
            kg = kgs[k[i]]
            var kg = JSON.parse(kg)
            score = parseFloat(kg.extra.score.replace(',','.'))
            scoreList.push(score)
        }
        max = Math.max.apply(Math,scoreList)
        min = Math.min.apply(Math,scoreList)
        kgSelected = getJSONQuality(id,kgs)
        score = parseFloat(kgSelected.extra.score.replace(',','.'))

        return (score - min) / (max - min) * 100
    }
    else{
        kg = getJSONQuality(id,kgs)
        return kg.extra.score
    }
}

function sortTable(colNo,tableId,IsAsc) {
    var table, rows, switching, i, x, y;
    table = document.getElementById(tableId);
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;  
      for (i = 1; i < (rows.length - 1); i++) {
        if(rows[i].getElementsByTagName("TD")[colNo] != undefined && rows[i + 1].getElementsByTagName("TD")[colNo] != undefined)
        {
          x = rows[i].getElementsByTagName("TD")[colNo].innerHTML.toLowerCase();
          y = rows[i + 1].getElementsByTagName("TD")[colNo].innerHTML.toLowerCase();
          x = parseFloat(x)
          y = parseFloat(y)
          if ((x < y && IsAsc == false) || (x > y && IsAsc == true)) {
            rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
            switching = true;
            break;
          }
        }
      }    
    }
  }

function drawVersatility(id,tr,kgs){
    kg = getJSONQuality(id,kgs)
    td1 = document.createElement('td')
    td2 = document.createElement('td')
    td3 = document.createElement('td')
    td4 = document.createElement('td')
    td5 = document.createElement('td')
    td1.innerHTML = kg.believability.title
    isArr = Array.isArray(kg.versatility.serializationFormats)
    if(isArr == true)
        if(kg.versatility.serializationFormats.length > 0)
            formats = kg.versatility.serializationFormats.join('\r\n')
        else
            formats = 'No serialization formats indicated'
    else
        formats = kg.versatility.serializationFormats
    td2.innerHTML = formats

    isArr = Array.isArray(kg.versatility.languagesQ)
    if(isArr == true)
        if(kg.versatility.languagesQ.length > 0)
            languages = kg.versatility.languagesQ.join('\r\n')
        else
            languages = 'No languages indicated'
    else
        languages = kg.versatility.languagesQ

    td3.innerHTML = languages

    if(kg.extra.endpointUrl.search('http')!=-1)
        td4.innerHTML = '<a href="' + kg.extra.endpointUrl+'" target="_blank">'+kg.extra.endpointUrl + '</a>'
    else
        td4.innerHTML = kg.extra.endpointUrl

    isArr = Array.isArray(kg.extra.downloadUrl)
    if(isArr == true)
        if(kg.extra.downloadUrl.length > 0){
            for(var i = 0; i<kg.extra.downloadUrl.length; i++){
                if(kg.extra.downloadUrl[i]!= 'Not provided'){
                    link = document.createElement('a')
                    title = document.createTextNode(kg.extra.downloadUrl[i])
                    link.appendChild(title)
                    link.title = kg.extra.downloadUrl[i]
                    link.href = kg.extra.downloadUrl[i]
                    link.target = '_blank'
                    link.style.marginBottom = '3px'
                    td5.appendChild(link)
                } 
                else {
                    td5.appendChild(document.createTextNode(links[i]))
                }
            }
        }
        else{
            downloadUrl = 'No serialization formats indicated'
            td5.innerHTML = downloadUrl
        }
    else{
        downloadUrl = kg.extra.downloadUrl
        td5.innerHTML = downloadUrl
    }
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
}

function drawTabInterp(id,tr,kgs){
    kg = getJSONQuality(id,kgs)
    td = document.createElement('td')
    td2 = document.createElement('td')
    td.innerHTML = kg.believability.title
    td2.innerHTML = kg.interpretability.RDFStructures
    tr.appendChild(td)
    tr.appendChild(td2)

}

function drawInterp(id,chart,kgs){
    kg = getJSONQuality(id,kgs)
    today = getTodayDate()
    triples = kg.amountOfData.numTriplesQ
    if(!isNaN(parseInt(triples)))
        triples = parseInt(triples)
    else
        triples = kg.amountOfData.numTriplesM
    bn = parseInt(kg.interpretability.numBN)
    dataTriples = [[today,triples]]
    dataBlank = [[today,bn]]

    chart.addSeries({
        id: kg.believability.title,
        data:dataBlank,
        name: 'Blank nodes',
        stack: kg.extra.KGid,
        linkedTo: 'blank',
        color: '#FF9648'
    },false)

    chart.addSeries({
        id: kg.believability.title,
        data:dataTriples,
        name: 'Triples',
        stack: kg.extra.KGid,
        linkedTo: 'triples',
        color: '#7CA9F4'
    },false)

    chart.redraw()
}

function drawUnderTab1(id,tr,kgs){
    kg = getJSONQuality(id,kgs)
    td1 = document.createElement('td')
    td2 = document.createElement('td')
    td3 = document.createElement('td')
    td4 = document.createElement('td')
    td5 = document.createElement('td')
    td6 = document.createElement('td')
    isArr = Array.isArray(kg.understendability.regexUri)
    if(isArr == true)
        if(kg.understendability.regexUri.length > 0)
            regexUri = kg.understendability.regexUri.join('\r\n')
        else
            regexUri = 0
    else
        regexUri = kg.understendability.regexUri
    
    isArr = Array.isArray(kg.understendability.vocabularies)
    if(isArr == true)
        if(kg.understendability.vocabularies > 0)
            vocabs = kg.understendability.vocabularies.join('\r\n')
        else
            vocabs = 0
    else
        vocabs = kg.understendability.vocabularies
    triples = kg.amountOfData.numTriplesQ
            if(!isNaN(parseInt(triples)))
                triples = parseInt(triples)
            else
                triples = kg.amountOfData.numTriplesM
    td1.innerHTML = kg.believability.title
    td2.innerHTML = kg.understendability.numLabel
    percentage =  (parseInt(kg.understendability.numLabel)/parseInt(triples)) * 100
    if(!isNaN(parseFloat(percentage))){
        percentage = percentage.toFixed(2)
        percentage = percentage+'%' 
        td3.innerHTML = percentage
    }else
        td3.innerHTML = '-'
    
    td4.innerHTML = regexUri
    td5.innerHTML = kg.understendability.example
    td6.innerHTML = vocabs
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)


}


function drawRepCons(id,tr,kgs){
    kg = getJSONQuality(id,kgs)
    td1 = document.createElement('td')
    td2 = document.createElement('td')
    td3 = document.createElement('td')
    newVocabs = kg.rConsistency.newVocab
    if(!isNaN(parseInt(newVocabs)))
        newVocabs = parseInt(kg.rConsistency.newVocab)
    else
        newVocabs = kg.rConsistency.newVocab
    newTerms = kg.rConsistency.useNewTerms
    if(!isNaN(parseInt(newTerms)))
        newTerms = parseInt(kg.rConsistency.useNewTerms)
    else
        newTerms = kg.rConsistency.useNewTerms
    td1.innerHTML = kg.believability.title
    td2.innerHTML = newVocabs
    td3.innerHTML = newTerms
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
}

function drawLengthO(id,chart,kgs){
    kg = getJSONQuality(id,kgs)
    today = getTodayDate()
    lengthO = [[today,parseFloat(kg.rConciseness.minLengthO.replace(',','.')),parseFloat(kg.rConciseness.percentile25LengthO.replace(',','.')),parseFloat(kg.rConciseness.medianLenghtO.replace(',','.')),parseFloat(kg.rConciseness.percentile75LengthO.replace(',','.')),parseFloat(kg.rConciseness.maxLengthO.replace(',','.'))]]

    chart.addSeries({
        name: kg.believability.title,
        data: lengthO,
    })

}

function drawLengthP(id,chart,kgs){
    kg = getJSONQuality(id,kgs)
    today = getTodayDate()
    lengthP = [[today,parseFloat(kg.rConciseness.minLengthP.replace(',','.')),parseFloat(kg.rConciseness.percentile25LengthP.replace(',','.')),parseFloat(kg.rConciseness.medianLenghtP.replace(',','.')),parseFloat(kg.rConciseness.percentile75LengthP.replace(',','.')),parseFloat(kg.rConciseness.maxLengthP.replace(',','.'))]]

    chart.addSeries({
        name: kg.believability.title,
        data: lengthP,
    })

}

function drawLengthS(id,chart,kgs){
    kg = getJSONQuality(id,kgs)
    today = getTodayDate()
    lengthS = [[today,parseFloat(kg.rConciseness.minLengthS.replace(',','.')),parseFloat(kg.rConciseness.percentile25LengthS.replace(',','.')),parseFloat(kg.rConciseness.medianLenghtS.replace(',','.')),parseFloat(kg.rConciseness.percentile75LengthS.replace(',','.')),parseFloat(kg.rConciseness.maxLengthS.replace(',','.'))]]
    
    chart.addSeries({
        name: kg.believability.title,
        data: lengthS,
    })
}

function drawAmount(id,chart,kgs){
    kg = getJSONQuality(id,kgs)
    triplesQ = parseInt(kg.amountOfData.numTriplesQ)
    today = getTodayDate
    if(!isNaN(triplesQ))    
        triples = [[today,triplesQ]]
    else
        triples = [[today,parseInt(kg.amountOfData.numTriplesM)]]
    entities = [[today,parseInt(kg.amountOfData.numEntities)]]
    properties = [[today,parseInt(kg.amountOfData.numProperty)]]

    chart.addSeries({
        id: kg.believability.title,
        minPointLength: 5,
        name: 'Entities',
        data: entities,
        stack: kg.extra.KGid,
        linkedTo: 'entities',
        color: '#00ff83'
    },false)

    chart.addSeries({
        id: kg.believability.title,
        minPointLength: 5,
        name: 'Properties',
        data: properties,
        stack: kg.extra.KGid,
        linkedTo:'properties',
        color:'#404552'
    },false)

    chart.addSeries({
        id: kg.believability.title,
        minPointLength: 5,
        name: 'Triples',
        data: triples,
        stack: kg.extra.KGid,
        linkedTo: 'triples',
        color: '#7CA9F4'
    },false)

    chart.redraw();

}

function drawCompletenessTab(id,tr,kgs){
    kg = getJSONQuality(id,kgs)
    td = document.createElement('td')
    td1 = document.createElement('td')
    td2 = document.createElement('td')
    td3 = document.createElement('td')
    td4 = document.createElement('td')
    td.innerHTML = kg.believability.title
    td1.innerHTML = kg.completeness.numTriples
    td2.innerHTML = kg.completeness.numTriplesL
    td3.innerHTML = kg.completeness.interlinkingC
    numLinked = parseInt(kg.completeness.numTriplesL)
    numTriples = parseInt(kg.completeness.numTriples)
    percentage = (numLinked/numTriples) * 100
    percentage = percentage.toFixed(2)
    if(!isNaN(percentage) && numTriples > 0){
        td4.innerHTML = percentage + '%'
    }
    else{
        td4.innerHTML = 'Insufficient data'
    }
    tr.appendChild(td)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
}

function drawConcisenessTab(id,tr,kgs){
    kg = getJSONQuality(id,kgs)
    exC = (kg.conciseness.exC).split(' ')[0]
    intC = (kg.conciseness.intC).split(' ')[0]
    exC = parseFloat(exC).toFixed(3)
    intC = parseFloat(intC).toFixed(3)
    td1 = document.createElement('td')
    td2 = document.createElement('td')
    td3 = document.createElement('td')
    if(!isNaN(intC)){
        td1.innerHTML = kg.believability.title
        td3.innerHTML = intC
    }else{
        td1.innerHTML = kg.believability.title
        td3.innerHTML = '-'
    }
    if(!isNaN(exC)){
        td1.innerHTML = kg.believability.title
        td2.innerHTML = exC
    }     
    else{
        td1.innerHTML = kg.believability.title
        td2.innerHTML = '-'
    }
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)

}

function drawHistoryCurr(id,chart,kgs){
    kg = getJSONQuality(id,kgs)
    historicalUp = kg.currency.historicalUp
    dataHistorical = []
    for(var i = 0; i<historicalUp.length; i++){
        date = historicalUp[i].split('|')[0]
        triples = historicalUp[i].split('|')[1]
        date = date.trim()
        if (triples != undefined)
            triples = triples.trim()
        var tab_date = date.split('-')
        var date_utc = Date.UTC(parseInt(tab_date[0]),parseInt(tab_date[1])-1,parseInt(tab_date[2]));
        data = [date_utc,parseInt(triples)]
        dataHistorical.push(data)
    }

    chart.addSeries({
        name: kg.believability.title,
        data: dataHistorical
    })

}

function drawCurrency(id,tr,kgs){
    kg = getJSONQuality(id,kgs)
    td1 = document.createElement('td')
    td2 = document.createElement('td')
    td3 = document.createElement('td')
    td4 = document.createElement('td')
    td5 = document.createElement('td')
    td6 = document.createElement('td')
    td1.innerHTML = kg.believability.title
    td2.innerHTML = kg.currency.creationDate
    td3.innerHTML = kg.currency.modificationDate
    td4.innerHTML = kg.extra.numTriplesUpdated
    percentageUp = (parseInt(kg.extra.numTriplesUpdated)/parseInt(kg.amountOfData.numTriplesQ)) * 100 
    percentageUp = percentageUp.toFixed(2)
    if (!isNaN(percentageUp))
        percentageUp = percentageUp + '%'
    else
        percentageUp = 'Insufficient data'
    td5.innerHTML = percentageUp
    days = parseInt(kg.currency.timePassed) 
    days = parseInt(days)
    if(isNaN(days))
        td6.innerHTML = 'Insufficient data'
    else
        td6.innerHTML = days + ' (days)'
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)
}

function drawVolatility(id,tr,kgs){
    kg = getJSONQuality(id,kgs)
    td = document.createElement('td')
    td2 = document.createElement('td')
    td.innerHTML = kg.believability.title
    isArr = Array.isArray(kg.volatility.frequency)
    if (isArr == true){
        if(kg.volatility.frequency.length == 0)
            td2.innerHTML = 'Not indicated'
        else
            td2.innerHTML = kg.volatility.frequency
    }
    else
        td2.innerHTML = kg.volatility.frequency 
    tr.appendChild(td)
    tr.appendChild(td2)

}

function drawVerif(id,tr,kgs){
    kg = getJSONQuality(id,kgs)
    td1 = document.createElement('td')
    td2 = document.createElement('td')
    td3 = document.createElement('td')
    td4 = document.createElement('td')
    td5 = document.createElement('td')
    td6 = document.createElement('td')
    td7 = document.createElement('td')
    td1.innerHTML = kg.believability.title
    vocabs = kg.verifiability.vocabularies
    if (vocabs.length == 0){
        vocabs = 0
    }
    isArr = Array.isArray(vocabs)
    if (isArr == true){
        td2.innerHTML = vocabs.length
    }
    else
        td2.innerHTML = kg.verifiability.vocabularies

    td3.innerHTML = kg.verifiability.authorM
    td4.innerHTML = kg.verifiability.publisher
    td5.innerHTML = kg.verifiability.contributor
    sources = `email: ${kg.verifiability.sources.email} name: ${kg.verifiability.sources.name} web: ${kg.verifiability.sources.web}`
    td6.innerHTML = sources
    td7.innerHTML = kg.verifiability.sign
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)
    tr.appendChild(td7)
}

function drawTabCons(id,tr,kgs){
    kg = getJSONQuality(id,kgs)
    tableCell = document.createElement('td')
    tableCell2 = document.createElement('td')
    tableCell3 = document.createElement('td')
    tableCell3.innerHTML = kg.believability.title
    tableCell.innerHTML = kg.consistency.oHijacking
    tableCell2.innerHTML = kg.consistency.disjointClasses
    tr.appendChild(tableCell3)
    tr.appendChild(tableCell2)
    tr.appendChild(tableCell)


}

function drawSingleCons(id,chart,kgs){
    kg = getJSONQuality(id,kgs)
    today = getTodayDate()
    undefC = kg.consistency.undefinedClass.toString()
    undefP = kg.consistency.undefinedProperties.toString()
    missC = kg.consistency.triplesMC.toString()
    missP = kg.consistency.triplesMP.toString()
    deprecated = kg.consistency.deprecated.toString()
    undefC = undefC.slice(0,(undefC.indexOf('.'))+2)
    undefP = undefP.slice(0,(undefP.indexOf('.'))+2)
    missC = missC.slice(0,(missC.indexOf('.'))+2)
    missP = missP.slice(0,(missP.indexOf('.'))+2)
    deprecated = deprecated.slice(0,(deprecated.indexOf('.'))+2)
    data = [parseFloat(undefC),parseFloat(undefP),parseFloat(deprecated),parseFloat(missC),parseFloat(missP)]

    chart.addSeries({
        name : kg.believability.title,
        data: data,
    },false)

    chart.redraw()

}

function drawSingleAcc(id,chart,kgs){
    kg = getJSONQuality(id,kgs)
    today = getTodayDate()
    kg.accuracy.emptyAnn = kg.accuracy.emptyAnn.slice(0,(kg.accuracy.emptyAnn.indexOf('.'))+2)
    kg.accuracy.wSA =  kg.accuracy.wSA.slice(0,( kg.accuracy.wSA.indexOf('.'))+2)
    kg.accuracy.malformedDataType = kg.accuracy.malformedDataType.slice(0,(kg.accuracy.malformedDataType.indexOf('.'))+2)
    kg.accuracy.FPvalue = kg.accuracy.FPvalue.slice(0,(kg.accuracy.FPvalue.indexOf('.'))+2)
    kg.accuracy.IFPvalue = kg.accuracy.IFPvalue.slice(0,(kg.accuracy.IFPvalue.indexOf('.'))+2)
    data = [parseFloat(kg.accuracy.emptyAnn),parseFloat( kg.accuracy.wSA),parseFloat(kg.accuracy.malformedDataType),parseFloat( kg.accuracy.FPvalue),parseFloat( kg.accuracy.IFPvalue)]

    chart.addSeries({
        name:kg.believability.title,
        data: data,
    },false)

    chart.redraw()
}

function drawLatency(id,chart,kgs){
    kg = getJSONQuality(id,kgs)
    today = getTodayDate()
    data = [[today,parseFloat(kg.performance.minLatency.replace(',','.')),parseFloat(kg.performance.percentile25L.replace(',','.')),parseFloat(kg.performance.medianL.replace(',','.')),parseFloat(kg.performance.percentile75L.replace(',','.')),parseFloat(kg.performance.maxLatency.replace(',','.'))]]
    chart.addSeries({
        name : kg.believability.title,
        data: data
    })
}

function drawTP(id,chart,kgs){
    kg = getJSONQuality(id,kgs)
    today = getTodayDate()
    dataTP = [[today,parseFloat(kg.performance.minThroughput),parseFloat(kg.performance.percentile25T),parseFloat(kg.performance.medianT),parseFloat(kg.performance.percentile75T),parseFloat(kg.performance.maxThroughput)]]
    chart.addSeries({
        name : kg.believability.title,
        data: dataTP
    })
}

function drawTableSec(id,tr,kgs){
    kg = getJSONQuality(id,kgs)
    td1 = document.createElement('td')
    td2 = document.createElement('td')
    td3 = document.createElement('td')
    td1.innerHTML = kg.believability.title
    td2.innerHTML = kg.security.useHTTPS
    td3.innerHTML = kg.security.requiresAuth
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
}


function drawTableInt(id,tr,kgs){
    kg = getJSONQuality(id,kgs)
    td1 = document.createElement('td')
    td2 = document.createElement('td')
    td3 = document.createElement('td')
    td4 = document.createElement('td')
    td5 = document.createElement('td')
    td6 = document.createElement('td')
    td1.innerHTML = kg.believability.title
    td2.innerHTML = parseFloat(kg.interlinking.sameAs)
    td3.innerHTML = kg.interlinking.degreeConnection
    td4.innerHTML = kg.interlinking.clustering
    td5.innerHTML = kg.interlinking.centrality
    td6.innerHTML = kg.reputation.pageRank
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)

}

function drawLic(id,tr,kgs){
    kg = getJSONQuality(id,kgs)
    KGName = document.createElement('td')
    metadati = document.createElement('td')
    mr = document.createElement('td')
    hr = document.createElement('td')
    KGName.innerHTML = kg.believability.title
    metadati.innerHTML = kg.licensing.licenseMetadata
    if(!isNaN(kg.licensing.licenseQuery))
        if (kg.licensing.licenseQuery > 0)
            mr.innerHTML = true
        else
            mr.innerHTML = false
    else
        mr.innerHTML = kg.licensing.licenseQuery
    hr.innerHTML = kg.licensing.licenseHR
    tr.appendChild(KGName)
    tr.appendChild(metadati)
    tr.appendChild(mr)
    tr.appendChild(hr)
}


function drawAv(id,tr,kgs){
    kg = getJSONQuality(id,kgs)
    tdT = document.createElement('td')
    tdSPARQL = document.createElement('td')
    tdRDF = document.createElement('td')
    tdDef = document.createElement('td')
    tdT.innerHTML = kg.believability.title
    tdSPARQL.innerHTML = kg.availability.sparqlEndpoint
    rdfQ = kg.availability.RDFDumpQ
    rdfM = kg.availability.RDFDumpM
    if (rdfQ == true || rdfM == true){
        dumpAv = 'Online'
    } else{
        dumpAv = kg.availability.RDFDumpM
    }
    tdRDF.innerHTML = dumpAv
    if(!isNaN(parseFloat(kg.availability.uriDef)))
        tdDef.innerHTML = parseFloat(kg.availability.uriDef).toFixed(2)
    else
        tdDef.innerHTML = kg.availability.uriDef
    tr.appendChild(tdT)
    tr.appendChild(tdSPARQL)
    tr.appendChild(tdRDF)
    tr.appendChild(tdDef)
}

function drawBeliev(id,div,kgs){
    kg = getJSONQuality(id,kgs)
    trustValue = kg.believability.trustValue.replace(',','.')
    trustValue = parseFloat(trustValue)
    Highcharts.chart({
        chart:{
            type : 'solidgauge',
            renderTo: div,
        },
        title: {
            style:{
                fontSize:'22px',
                fontWeight:'bold'
            },
            text: kg.believability.title,
            },

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        yAxis: {
            stops: [
                [-1, '#eb4034'], // red
                [0,'#7dd5ed'], // light blue
                [0.5, '#DDDF0D'], // yellow
                [0.75,'#c6eb34'], //green-yellow
                [1, '#90ed7d'] // green
            ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
                min: -1,
                max: 1,
            title: {
                text: 'Trust value'
            }
        },
        series: [{
            name: 'Trust value',
            data: [trustValue],
            dataLabels: {
                format:
              '<div style="text-align:center">' +
              '<span style="font-size:25px">{y}</span><br/>' +
              '<span style="font-size:12px;opacity:0.4"></span>' +
              '</div>'
            },
        }]
    });
}

function getJSONQuality(id,kgsObj){
    var kg = kgsObj[id]
    var kgObj = JSON.parse(kg)

    return kgObj
}


function hideDiv(){
    document.getElementById('exportAv-btn').style.display = 'none'
    document.getElementById('wrapSwitchScore').style.display = 'none'
    document.getElementById('exportScore-btn').style.display = 'none'
    document.getElementById('wrapScore').style.display = 'none'
    document.getElementById('historyCurr').style.display = 'none'
    document.getElementById('exportVers').style.display = 'none'
    document.getElementById('understendability').style.display = 'none'
    document.getElementById('wrap-tabUnd').style.display = 'none'
    document.getElementById('amountOfData').style.display = 'none'
    document.getElementById('exportComp-btn').style.display = 'none'
    document.getElementById('wrap-compTab').style.display = 'none'
    document.getElementById('concisenessTab').style.display = 'none'
    document.getElementById('currency').style.display = 'none'
    document.getElementById('exportCurr-btn').style.display = 'none'
    document.getElementById('exportSec-btn').style.display = 'none'
    document.getElementById('exportInt-btn').style.display = 'none'
    document.getElementById('exportLic-btn').style.display = 'none'
    document.getElementById('wrapSec').style.display = 'none'
    document.getElementById('wrapT').style.display = 'none'
    document.getElementById('wrapBeliev').style.display = 'none'
    document.getElementById('availability').style.display = 'none'
    document.getElementById('wrapLic').style.display = 'none'
    document.getElementById('interlinking').style.display = 'none'
    document.getElementById('wrap-tableInt').style.display = 'none'
    document.getElementById('performanceL').style.display = 'none'
    document.getElementById('performanceT').style.display = 'none'
    document.getElementById('accuracy').style.display = 'none'
    document.getElementById('wrapTab-cons').style.display = 'none'
    document.getElementById('exportCons-btn').style.display = 'none'
    document.getElementById('consistency').style.display = 'none'
    document.getElementById('exportVerif-btn').style.display = 'none'
    document.getElementById('verifiability').style.display = 'none'
    document.getElementById('exportVol-btn').style.display = 'none'
    document.getElementById('volatility').style.display = 'none'
    document.getElementById('exportConc-btn').style.display = 'none'
    document.getElementById('conciseness').style.display = 'none'
    document.getElementById('wrap-repConc').style.display = 'none'
    document.getElementById('exportComp-btn').style.display = 'none'
    document.getElementById('exportRepCons-btn').style.display = 'none'
    document.getElementById('wrap-repCons').style.display = 'none'
    document.getElementById('wrap-tabUnd2').style.display = 'none'
    document.getElementById('exportUnd1').style.display = 'none'
    document.getElementById('exportUnd2').style.display = 'none'
    document.getElementById('interpretability').style.display = 'none'
    document.getElementById('exportInterp').style.display = 'none'
    document.getElementById('wrapTabInter').style.display = 'none'
    document.getElementById('versatility').style.display = 'none'
}

function getTodayDate(){
    let today = new Date()
    today = today.toISOString().split('T')[0]
    var tab_date = today.split('-')
    var date_utc = Date.UTC(parseInt(tab_date[0]),parseInt(tab_date[1])-1,parseInt(tab_date[2]));

    return date_utc
}

function buildGraph(ids,kgs){
    links = []
    for(j = 0; j<ids.length; j++){
        kg = getJSONQuality(ids[j],kgs)
        console.log(kg)
        exLinks = kg.interlinking.externalLinks
        for(var i = 0; i<exLinks.length; i++){
            nameLink = exLinks[i].nameKG
            link = [kg.extra.KGid,nameLink]
            links.push(link)
        }
    }
    return links
}

function downloadCSV(csv, filename) {
	var csvFile;
    var downloadLink;
    // CSV file
	csvFile = new Blob([csv], {type: "text/csv"});
      
	// Download link
	downloadLink = document.createElement("a");
      
	// File name
	downloadLink.download = filename;
      
	// Create a link to the file
	downloadLink.href = window.URL.createObjectURL(csvFile);
      
	// Hide download link
	downloadLink.style.display = "none";
      
	// Add the link to DOM
	document.body.appendChild(downloadLink);
      
	// Click download link
	downloadLink.click();
}

function exportTableToCSV(filename,id) {
    var csv = [];
    var c = document.getElementById(id)
    var rows = c.querySelectorAll('table tr')
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++){
            if((cols[j].innerText) != '?' )
                row.push(cols[j].innerText);
        }
            
        
        csv.push(row.join(","));        
  }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}
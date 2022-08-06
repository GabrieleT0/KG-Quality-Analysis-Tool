function passValue(x,metric){
    var id = x
    idKG = x
    metric = document.querySelector('input[type="radio"][name="metric"]:checked')
    elements = document.getElementsByClassName("KGbutton")
    for(var i = 0; i< elements.length;i++){
        elements[i].style.backgroundColor = "white"
        elements[i].style.color = "black"
        addClick(elements[i])
    }
    li = document.getElementById(x)
    li.style.backgroundColor = "#00ea89cc"
    li.style.color = "white"
    li.style.borderRadius = "5px"
    //kgs is a JSON obj that contains kgs quality
    //console.log(x,metric.value)
    //console.log(kgs)
    
    switch(metric.value){
        case 'Availability':
            hideDiv()
            document.getElementById('containerAv').style.display = 'block';;
            kg = getJSONQuality(id,kgs) //kgs is a JSON obj that contains kgs quality
            console.log(kg)
            statusE = document.getElementById('statusE')
            statusDump = document.getElementById('statusDump')
            defValue = document.getElementById('defValue')
            if(kg.availability.sparqlEndpoint == 'Available'){
                statusEnd = 'Online'
            } else 
            statusEnd = kg.availability.sparqlEndpoint
            statusE.innerHTML = statusEnd
            rdfQ = kg.availability.RDFDumpQ
            rdfM = kg.availability.RDFDumpM
            if (rdfQ == true || rdfM == true){
                dumpAv = 'Online'
            } else{
                dumpAv = kg.availability.RDFDumpM
            }
            statusDump.innerHTML = dumpAv
            defValue.innerHTML = (kg.availability.uriDef).toFixed(2)

            break;

        case 'Licensing':
            hideDiv()
            document.getElementById(`containerLicense`).style.display = 'block';
            kg = getJSONQuality(id,kgs)
            var header1 = document.getElementById('hmr');
		    var header2 = document.getElementById('hhr');
            header1.innerHTML = 'License Machine-Redeable'
			header2.innerHTML = 'License Human-Redeable'
            licenseM.innerHTML = kg.licensing.licenseMetadata
            if(!isNaN(kg.licensing.licenseQuery))
                if (kg.licensing.licenseQuery > 0)
                    licenseMR.innerHTML = 'true'
                else
                    licenseMR.innerHTML = 'false'
            else
                licenseMR.innerHTML = kg.licensing.licenseQuery
			licenseHR.innerHTML = kg.licensing.licenseHR
            
            break;
        
        case 'Believability':
            hideDiv()
            document.getElementById(`reliablePr`).style.display = 'block';
            document.getElementById(`containerTrust`).style.display = 'block';
            document.getElementById(`containerBeliev`).style.display = 'block';
            believ = document.getElementById('containerBeliev')
            kg = getJSONQuality(id,kgs)
            believ.innerHTML = '<p id="title">'+kg.believability.title+'</p><br><a id="urlD" href='+kg.believability.URI+' target="_blank">'+kg.believability.URI+'</a><br><p id="description">'+kg.believability.description+'</p> ';
            trustValue = kg.believability.trustValue.replace(',','.')
            trustValue = parseFloat(trustValue);
            
            Highcharts.chart({  //CHART FOR THE TRUST VALUE
                chart:{
                    type : 'solidgauge',
                    renderTo: 'containerTrust',
                },
                title: null,
                subtitle: {
                    style:{
                        fontSize:'18px',
                    },
                    align: 'center',
                    text: 'The trust value is a value between -1 and 1. <br> Where 1: absolute belief, -1: absolute disbelief and 0:lack of belief/disbelief'
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
            break;

        case 'Interlinking':
            hideDiv()
            document.getElementById('interlinking').style.display = 'block';
            document.getElementById(`intPie`).style.display = 'block';
            document.getElementById(`tableInt`).style.display = 'block';
            document.getElementById(`wrap-tbInt`).style.display = 'block';
            kg = getJSONQuality(id,kgs)
            links = kg.interlinking.externalLinks
            graph = buildGraph(id,links)
            console.log(graph)
            Highcharts.chart({
                chart:{
                    type : 'networkgraph',	
                    renderTo: 'interlinking',
                },
                title: {
                    style:{
                        fontSize:'30px',
                        fontWeight:'bold'
                    },
                    text: 'External links',
                },
                subtitle: {
                    text:id,
                    style:{
                        fontSize:'24px'
                    }
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
                    data: graph,
                }]
            });
            sameAs = parseFloat(kg.interlinking.sameAs)
            numTriples = parseInt(kg.amountOfData.numTriplesQ)
            dc = kg.interlinking.degreeConnection
            ccl = kg.interlinking.clustering
            centr = kg.interlinking.centrality
            var td1 = document.getElementById('dc');
            var td2 = document.getElementById('ccl');
            var td3 = document.getElementById('cent');
            var td4 = document.getElementById('pr')
            td1.innerHTML = dc;
            td2.innerHTML = ccl;
            td3.innerHTML = centr;
            td4.innerHTML = kg.reputation.pageRank
            Highcharts.chart({  //CHART FOR SAMEAS CHAINS
                chart: {
                    renderTo:'intPie',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    style:{
                        fontSize:'30px',
                        fontWeight:'bold'
                    },
                    text: 'SameAs chains'
                },

                subtitle: {
                    text:id,
                    style:{
                        fontSize:'24px'
                    },
                },

                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    name: 'Data in the graph',
                    
                    data: [{
                        name: 'Number of sameAs chains',
                        color:'#90ed7d',
                        y: sameAs,
                        sliced: true,
                        selected: true
                    }, {
                        name: 'Other triples',
                        y: numTriples,
                        color:'#0090eacc'
                    }
                ]}]
            });
            break;
        
        case 'Performance':
            hideDiv()
            document.getElementById(`performance`).style.display = 'block';
    		document.getElementById(`performanceT`).style.display = 'block';
            kg = getJSONQuality(id,kgs)
            today = getTodayDate()
            dataLatency = [[today,parseFloat(kg.performance.minLatency.replace(',','.')),parseFloat(kg.performance.percentile25L.replace(',','.')),parseFloat(kg.performance.medianL.replace(',','.')),parseFloat(kg.performance.percentile75L.replace(',','.')),parseFloat(kg.performance.maxLatency.replace(',','.'))]]
            dataTP = [[today,parseFloat(kg.performance.minThroughput),parseFloat(kg.performance.percentile25T),parseFloat(kg.performance.medianT),parseFloat(kg.performance.percentile75T),parseFloat(kg.performance.maxThroughput)]]
            Highcharts.chart({ //BOXPLOT FOR LATENCY
                chart: {
                    renderTo:'performance',
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
                    text:kg.believability.title,
                    style:{
                        fontSize:'24px'
                    }
                }	,

                legend: {
                    enabled: false
                },
        
                xAxis: {
                    type:'datetime',
                },
        
                yAxis: {
                    title: {
                        text: 'Observations'
                    },
                },
        
                series: [{
                    name: 'Observations',
                    data: dataLatency,
                    tooltip: {
                        headerFormat: '<em>Date: {point.key}</em><br/>'
                    }
                }, {
                    name: 'Outliers',
                    color: Highcharts.getOptions().colors[0],
                    type: 'scatter',
                    data: [ // x, y positions where 0 is the first category
                ],
                marker: {
                    fillColor: 'white',
                    lineWidth: 1,
                    lineColor: Highcharts.getOptions().colors[0]
                },
                tooltip: {
                    pointFormat: 'Observation: {point.y}'
                }
                }]
            });
            Highcharts.chart({  //BOXPLOT FOR THROUGHPUT
                chart: {
                    renderTo:'performanceT',
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
                    text:kg.believability.title,
                    style:{
                        fontSize:'24px'
                    }
                },
            
                legend: {
                    enabled: false
                },
            
                xAxis: {
                    type:'datetime',
                },
            
                yAxis: {
                    title: {
                        text: 'Observations'
                    },
                },
            
                series: [{
                    name: 'Observations',
                    data: dataTP,
                    tooltip: {
                        headerFormat: '<em>Date: {point.key}</em><br/>'
                    }
                }, {
                    name: 'Outliers',
                    color: Highcharts.getOptions().colors[0],
                    type: 'scatter',
                    data: [ // x, y positions where 0 is the first category
                        
                    ],
                    marker: {
                        fillColor: 'white',
                        lineWidth: 1,
                        lineColor: Highcharts.getOptions().colors[0]
                    },
                    tooltip: {
                        pointFormat: 'Observation: {point.y}'
                    }
                }]
            });
            break;
        
        case 'Security':
            hideDiv()
            document.getElementById('wrapSec').style.display = 'block';
            kg = getJSONQuality(id,kgs)
            var td1 = document.getElementById('https'); //DYNAMIC CREATION OF SECURITY TABLE
            var td2 = document.getElementById('auth')
            td1.innerHTML = kg.security.useHTTPS
            td2.innerHTML = kg.security.requiresAuth
            
            break;
        
        case 'Accuracy':
            hideDiv()
    	    document.getElementById('accuracy').style.display = 'block';
            kg = getJSONQuality(id,kgs)
            today = getTodayDate()
            kg.accuracy.emptyAnn = kg.accuracy.emptyAnn.slice(0,(kg.accuracy.emptyAnn.indexOf('.'))+2)
            kg.accuracy.wSA = kg.accuracy.wSA.slice(0,(kg.accuracy.wSA.indexOf('.'))+2)
            kg.accuracy.malformedDataType = kg.accuracy.malformedDataType.slice(0,(kg.accuracy.malformedDataType.indexOf('.'))+2)
            kg.accuracy.FPvalue =  kg.accuracy.FPvalue.slice(0,( kg.accuracy.FPvalue.indexOf('.'))+2)
            kg.accuracy.IFPvalue = kg.accuracy.IFPvalue.slice(0,(kg.accuracy.IFPvalue.indexOf('.'))+2)
            console.log( kg.accuracy.IFPvalue)
            data = [parseFloat(kg.accuracy.emptyAnn),parseFloat( kg.accuracy.wSA),parseFloat(kg.accuracy.malformedDataType),parseFloat( kg.accuracy.FPvalue),parseFloat( kg.accuracy.IFPvalue)]
            Highcharts.chart('accuracy', {
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

                legend: {
                    align: 'right',
                    verticalAlign: 'middle',
                    layout: 'vertical'
                },
                tooltip: {
                    shared: true,
                
                },
                series:[{
                    name: kg.believability.title,
                    data: data 
                }],
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
            break;
        
        case 'Consistency':
            hideDiv()
            document.getElementById('const-tab').style.display = 'block'
            td = document.getElementById('OHValue')
            td2 = document.getElementById('disjValue')
            var div = document.getElementById('consistency')
            div.style.display = 'block'
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
            td.innerHTML = kg.consistency.oHijacking
            td2.innerHTML = kg.consistency.disjointClasses
            Highcharts.chart(div, {
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
                series:[{
                    name: kg.believability.title,
                    data: data 
                }],
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
            break;

        case 'Verifiability':
            hideDiv()
            document.getElementById('verifiability').style.display = 'block'
            div = document.getElementById('verifiability')
            kg = getJSONQuality(id,kgs)  
            //BUILDING TABLE FOR VERIFIABILITY
            td1 = document.getElementById('vocabs')
            td2 = document.getElementById('auths')
            td3 = document.getElementById('pubs')
            td4 = document.getElementById('contribs')
            td5 = document.getElementById('sources')
            td6 = document.getElementById('signed')
            h2 = document.getElementById('headVoc')
            vocabs = kg.verifiability.vocabularies
            if (vocabs.length == 0){
                vocabs = 0
            }
            isArr = Array.isArray(vocabs)
            if (isArr == true){
                h2.innerHTML = `Vocabularies (${vocabs.length})`
                vocabs = vocabs.join('\r\n')
            }
            else
                h2.innerHTML = `Vocabularies (0)`
            
            td1.innerHTML = vocabs
            td2.innerHTML = kg.verifiability.authorM
            td3.innerHTML = kg.verifiability.publisher
            td4.innerHTML = kg.verifiability.contributor
            sources = `email: ${kg.verifiability.sources.email} name: ${kg.verifiability.sources.name} web: ${kg.verifiability.sources.web}`
            td5.innerHTML = sources
            td6.innerHTML = kg.verifiability.sign

            break;

        case 'Volatility':
            hideDiv()
            document.getElementById('volatility').style.display = 'block'
            kg = getJSONQuality(id,kgs)
            td = document.getElementById('frequency')
            
            isArr = Array.isArray(kg.volatility.frequency)
            if (isArr == true){
                if(kg.volatility.frequency.length == 0)
                    td.innerHTML = 'Not indicated'
                else
                    td.innerHTML = kg.volatility.frequency
            }
            else
                td.innerHTML = kg.volatility.frequency

            break;
        
        case 'Currency':
            hideDiv()
            document.getElementById('currency').style.display = 'block'
            document.getElementById('currTimeline').style.display = 'block'
            kg = getJSONQuality(id,kgs)
            if (typeof kg.amountOfData.numTriplesQ == int)
                triples = kg.amountOfData.numTriplesQ
            else
                triples = kg.amountOfData.numTriplesM
            
            otherT = triples - parseInt(kg.extra.numTriplesUpdated)
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
            Highcharts.chart({  //CHART FOR HISTORICAL UPDATE
                chart: {
                    renderTo:'currTimeline',
                    type: 'line'
                },
                title: {
                    style:{
                        fontSize:'30px',
                        fontWeight:'bold'
                    },
                    text: 'Historical updates'
                },
                subtitle:{
                    text: kg.believability.title
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
                series: [
                    {
                        name:'Triples updated',
                        data:dataHistorical
                    },
                ]
            });
        
            td1 = document.getElementById('creation')
            td2 = document.getElementById('modification')
            td3 = document.getElementById('lastM')
            td4 = document.getElementById('updated')
            td1.innerHTML = kg.currency.creationDate
            td2.innerHTML = kg.currency.modificationDate
            td3.innerHTML = kg.currency.timePassed 
            td4.innerHTML = kg.extra.numTriplesUpdated
            
            break;
        
        case 'Conciseness':
            hideDiv()
            div = document.getElementById('conciseness')
            div.style.display = 'block'
            today = getTodayDate()
            kg = getJSONQuality(id,kgs)
            exC = (kg.conciseness.exC).split(' ')[0]
            intC = (kg.conciseness.intC).split(' ')[0]
            console.log(exC)
            console.log(intC)
            exC = parseFloat(exC).toFixed(3)
            intC = parseFloat(intC).toFixed(3)
            data1 = [[today,parseFloat(exC)]]
            data2 = [[today,parseFloat(intC)]]
            Highcharts.chart(div, {  //CONCISENESS BAR-CHART
                chart: {
                    type: 'column'
                },
                title: {
                    style:{
                        fontSize:'30px',
                        fontWeight:'bold'
                    },
                    text: kg.believability.title
                },
                xAxis: {
                    type:'datetime',
                },
                yAxis: {
                    min:0,
                    max:1,
                    title: {
                        text: 'Values conciseness'
                    },
                    plotLines: [{ 
                        width:2,
                        value: 1,
                        color: '#0090eacc',
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
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: true,
                            crop: false,
                            overflow: 'none'
                        }
                    }
                },
                series: [{
                    name:'Extensional conciseness',
                    data:data1
                },
                {
                    name:'Intensional conciseness',
                    data:data2
                }]
            });

            break;

        case 'Completeness':
            hideDiv()
            kg = getJSONQuality(id,kgs)
            document.getElementById('tabC').style.display = 'block'
            td1 = document.getElementById('numTriplesComp')  //DYNAMIC CREATION OF TABLE FOR INTERLINKING COMLETENESS (BY DAY)
            td2 = document.getElementById('numTriplesLinked')
            td3 = document.getElementById('percentageLinked')
            tdInt = document.getElementById('interlinkingC')
            td1.innerHTML = kg.completeness.numTriples
            td2.innerHTML = kg.completeness.numTriplesL
            if(kg.completeness.numTriples > 0)
                percentage = (parseInt(kg.completeness.numTriplesL)/parseInt(kg.completeness.numTriples)) * 100
            else
                percentage = 'Insufficient data'
           
            if(!isNaN(percentage)){
                percentage = percentage.toFixed(2)
                percentage = percentage+'%'
            }else
                percentage = '-'
            td3.innerHTML = percentage
            tdInt.innerHTML = kg.completeness.interlinkingC

            break;
        
        case 'Amount':
            hideDiv()
            divAmount = document.getElementById('amountOfData')
            divAmount.style.display = 'block'
            kg = getJSONQuality(id,kgs)
            today = getTodayDate()
            triplesQ = parseInt(kg.amountOfData.numTriplesQ)
            if(!isNaN(triplesQ))    
                triples = [[today,triplesQ]]
            else
                triples = [[today,parseInt(kg.amountOfData.numTriplesM)]]
            entities = [[today,parseInt(kg.amountOfData.numEntities)]]
            properties = [[today,parseInt(kg.amountOfData.numProperty)]]
            Highcharts.chart(divAmount, {  //AMOUNT OF DATA CHART (BY DAY)
                chart: {
                    type: 'bar'
                },
                title: {
                    style:{
                        fontSize:'30px',
                        fontWeight:'bold'
                    },
                    text: kg.believability.title
                }, 
                xAxis: {
                    type:'datetime'
                },
                yAxis: {
                    title: {
                        text: 'Amount of data',
                        align: 'high'
                    },
                    labels: {
                    overflow: 'justify',
                    }	
                },
                tooltip: {	
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: false,
                    borderWidth: 1,
                    backgroundColor:
                        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    minPointLength: 10,
                    name: 'Triples',
                    data: triples
                }, {
                minPointLength: 10,
                    name: 'Entities',
                    data: entities
                }, {
                minPointLength: 10,
                    name: 'Properties',
                    data: properties
                }]
            });
            break;
        
        case 'RepresentationalConciseness':
            hideDiv()
            divRepConc = document.getElementById('wrap-repConc')
            divRepConc.style.display = 'block'
            kg = getJSONQuality(id,kgs)
            today = getTodayDate()
            lengthS = [[today,parseFloat(kg.rConciseness.minLengthS.replace(',','.')),parseFloat(kg.rConciseness.percentile25LengthS.replace(',','.')),parseFloat(kg.rConciseness.medianLenghtS.replace(',','.')),parseFloat(kg.rConciseness.percentile75LengthS.replace(',','.')),parseFloat(kg.rConciseness.maxLengthS.replace(',','.'))]]
            lengthP = [[today,parseFloat(kg.rConciseness.minLengthP.replace(',','.')),parseFloat(kg.rConciseness.percentile25LengthP.replace(',','.')),parseFloat(kg.rConciseness.medianLenghtP.replace(',','.')),parseFloat(kg.rConciseness.percentile75LengthP.replace(',','.')),parseFloat(kg.rConciseness.maxLengthP.replace(',','.'))]]
            lengthO = [[today,parseFloat(kg.rConciseness.minLengthO.replace(',','.')),parseFloat(kg.rConciseness.percentile25LengthO.replace(',','.')),parseFloat(kg.rConciseness.medianLenghtO.replace(',','.')),parseFloat(kg.rConciseness.percentile75LengthO.replace(',','.')),parseFloat(kg.rConciseness.maxLengthO.replace(',','.'))]]
            Highcharts.chart({ //BOXPLOT FOR URIs LENGTH
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
                    text:kg.believability.title,
                    style:{
                        fontSize:'24px'
                    }
                },
                rangeSelector: {
                    enabled:true
                },     
                legend: {
                    enabled: false
                },        
                xAxis: {
                    type:'datetime',
                },
                yAxis: {
                    title: {
                        text: 'Observations'
                    },
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
                    }]
                },   
                series: [{
                    name: 'Observations',
                    data: lengthS,
                    tooltip: {
                        headerFormat: '<em>Date: {point.key}</em><br/>'
                    }
                    }, 
                    {
                    name: 'Outliers',
                    color: Highcharts.getOptions().colors[0],
                    type: 'scatter',
                    data: [ // x, y positions where 0 is the first category
                        
                    ],
                    marker: {
                        fillColor: 'white',
                        lineWidth: 1,
                        lineColor: Highcharts.getOptions().colors[0]
                    },
                    tooltip: {
                        pointFormat: 'Observation: {point.y}'
                    }
                }]
            });
            Highcharts.chart({
                chart: {
                    renderTo:'lengthP',
                    type: 'boxplot'
                },
                title: {
                    style:{
                        fontSize:'30px',
                        fontWeight:'bold'
                    },
                    text: 'URIs length (predicate)'
                },
                subtitle: {
                    text:kg.believability.title,
                    style:{
                        fontSize:'24px'
                    }
                },
                rangeSelector: {
                    enabled:true
                },     
                legend: {
                    enabled: false
                },        
                xAxis: {
                    type:'datetime',
                },
                yAxis: {
                    title: {
                        text: 'Observations'
                    },
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
                    }]
                },   
                series: [{
                    name: 'Observations',
                    data: lengthP,
                    tooltip: {
                        headerFormat: '<em>Date: {point.key}</em><br/>'
                    }
                }, {
                    name: 'Outliers',
                    color: Highcharts.getOptions().colors[0],
                    type: 'scatter',
                    data: [ // x, y positions where 0 is the first category
                    ],
                    marker: {
                        fillColor: 'white',
                        lineWidth: 1,
                        lineColor: Highcharts.getOptions().colors[0]
                    },
                    tooltip: {
                        pointFormat: 'Observation: {point.y}'
                    }
                }]
            });
            Highcharts.chart({
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
                    text:kg.believability.title,
                    style:{
                        fontSize:'24px'
                    }
                },
                rangeSelector: {
                    enabled:true
                },     
                legend: {
                    enabled: false
                },        
                xAxis: {
                    type:'datetime',
                },
                yAxis: {
                    title: {
                        text: 'Observations'
                    },
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
                    }]
                },   
                series: [{
                    name: 'Observations',
                    data: lengthO,
                    tooltip: {
                        headerFormat: '<em>Date: {point.key}</em><br/>'
                    }
                }, {
                    name: 'Outliers',
                    color: Highcharts.getOptions().colors[0],
                    type: 'scatter',
                    data: [ // x, y positions where 0 is the first category
                        
                    ],
                    marker: {
                        fillColor: 'white',
                        lineWidth: 1,
                        lineColor: Highcharts.getOptions().colors[0]
                    },
                    tooltip: {
                        pointFormat: 'Observation: {point.y}'
                    }
                }]
            });
            break;
        
        case 'RepresentationalConsistency':
            hideDiv()
            kg = getJSONQuality(id,kgs)
            document.getElementById('wrap-repCons').style.display = 'block'
            th1 = document.getElementById('numNewV')
            th2 = document.getElementById('numNewT')
            th1.innerHTML = 'New vocabularies defined'
            th2.innerHTML = 'New terms defined'
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

            tdV = document.getElementById('newVocabs')
            tdT = document.getElementById('newTerms')
            tdV.innerHTML = newVocabs
            tdT.innerHTML = newTerms

            break;
        
        case 'Understendability':
            hideDiv()
            document.getElementById('wrap-und').style.display = 'block'
            kg = getJSONQuality(id,kgs)
            triples = kg.amountOfData.numTriplesQ
            if(!isNaN(parseInt(triples)))
                triples = parseInt(triples)
            else
                triples = parseInt(kg.amountOfData.numTriplesM)
            labels = kg.understendability.numLabel
            if(!isNaN(parseInt(labels)))
                otTriples = triples - parseInt(labels)
            else
                otTriples = '-'

            Highcharts.chart({  //UNDERSTENDABILITY CHART (BY DAY)
                chart: {
                    renderTo:'understendability',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    style:{
                        fontSize:'30px',
                        fontWeight:'bold'
                    },
                    text: 'Percentage of labels'
                },
                subtitle: {
                    text: 'The number of labels should be as close as possible to the number of triples.',
                    style:{
                        fontSize:'24px'
                    },
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    name: 'Triples',	
                    data: [{
                        name: 'Number of triples with label',
                        color:'#90ed7d',
                        y: labels,
                        sliced: true,
                        selected: true
                    }, {
                        name: 'Number of triples without label',
                        y: otTriples,
                        color:'#0090eacc'
                    }]
                }]
            });
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

            regex = document.getElementById('regex')
            vocabulary = document.getElementById('vocablurayU')
            example = document.getElementById('example')
            regex.innerHTML = regexUri
            vocabulary.innerHTML = vocabs
            example.innerHTML = kg.understendability.example
            
            break;
        
        case 'Interpretability':
            hideDiv()
            document.getElementById('wrapInterp').style.display = 'block'
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
            Highcharts.chart('interpretability', {  //INTERPRETABILITY CHART (BY DAY)
                chart: {
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
                    type: 'datetime',
                },
                yAxis: [{
                    type:'logarithminc',
                    title: {
                    text: 'no. triples'
                },
                    labels: {
                        overflow: 'justify',
                    },
                },
                {
                    id: 'second-y-axis',
                    opposite:true,
                    min:0,
                }],
                plotOptions: { //TO SHOW 0 VALUES
                    series:{
                    minPointLength:3
                    },
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                tooltip: {
                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                },
                series: [{
                    name: 'Triples',
                    data: dataTriples
                },
                {
                name: 'Blank nodes',
                data: dataBlank,
                // yAxis:'second-y-axis'
                }]
            });
            td = document.getElementById('rdfInt')
            td.innerHTML = kg.interpretability.RDFStructures

            break;
        
        case 'Versatility':
            hideDiv()
            document.getElementById('wrapVers').style.display = 'block'
            kg = getJSONQuality(id,kgs)
            td1 = document.getElementById('serializations')  //DYNAMIC CONSTRUCTION OF VERSATILITY TABLE
            td2 = document.getElementById('languages')
            td3 = document.getElementById('linkSPARQL')
            td4 = document.getElementById('linkRDF')
            while (td4.hasChildNodes()) {
                td4.removeChild(td4.lastChild);
            }

            isArr = Array.isArray(kg.versatility.serializationFormats)
            if(isArr == true)
                if(kg.versatility.serializationFormats.length > 0)
                    formats = kg.versatility.serializationFormats.join('\r\n')
                else
                    formats = 'No serialization formats indicated'
            else
                formats = kg.versatility.serializationFormats
            td1.innerHTML = formats

            isArr = Array.isArray(kg.versatility.languagesQ)
            if(isArr == true)
                if(kg.versatility.languagesQ.length > 0)
                    languages = kg.versatility.languagesQ.join('\r\n')
                else
                    languages = 'No languages indicated'
            else
                languages = kg.versatility.languagesQ

            td2.innerHTML = languages

            if(kg.extra.endpointUrl.search('http')!=-1)
                td3.innerHTML = '<a href="' + kg.extra.endpointUrl+'" target="_blank">'+kg.extra.endpointUrl + '</a>'
            else
                td3.innerHTML = kg.extra.endpointUrl

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
                            td4.appendChild(link)
                        } 
                        else {
                            td4.appendChild(document.createTextNode(links[i]))
                        }
                    }
                }
                else{
                    downloadUrl = 'No serialization formats indicated'
                    td4.innerHTML = downloadUrl
                }
            else{
                downloadUrl = kg.extra.downloadUrl
                td4.innerHTML = downloadUrl
            }
        break;
    
        case 'Score':
            hideDiv()
            scoreCont = document.getElementById('scoreCont')
            scoreCont.style.display = 'block'
            kg = getJSONQuality(id,kgs)
            score = parseFloat(kg.extra.score.replace(',','.'))
            Highcharts.chart({  
                chart:{
                    type : 'solidgauge',
                    renderTo: 'scoreChart',
                },
                title: null,	
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
                        [0, '#32ff96'], // green
                        ],
                    lineWidth: 0,
                    tickWidth: 0,
                    minorTickInterval: null,
                    tickAmount: 0,
                    min: 0,
                    max: 10,
                    title: {
                        text: 'Score'
                    }
                },
                series: [{
                    
                    name: 'Score',
                    data: [score],
                    dataLabels: {
                    format:
                        '<div style="text-align:center">' +
                        '<span style="font-size:25px">{y}</span><br/>' +
                        '<span style="font-size:12px;opacity:0.4"></span>' +
                        '</div>'
                    },
                }]
            });
            break;

    default:
        alert('Error, select a valid metric');
    }
}

function getTodayDate(){
    let today = new Date()
    today = today.toISOString().split('T')[0]
    var tab_date = today.split('-')
    var date_utc = Date.UTC(parseInt(tab_date[0]),parseInt(tab_date[1])-1,parseInt(tab_date[2]));

    return date_utc
}

function getJSONQuality(id,kgsObj){
    var kg = kgsObj[id]
    var kgObj = JSON.parse(kg)

    return kgObj
}

function buildGraph(id,exLinks){
    links = []
    for(var i = 0; i<exLinks.length; i++){
        nameLink = exLinks[i].nameKG
        link = [id,nameLink]
        links.push(link)
    }
    return links
}

function hideDiv(){
    document.getElementById('containerAv').style.display = 'none'
	document.getElementById('scoreCont').style.display = 'none'
	document.getElementById('currTimeline').style.display = 'none'
	document.getElementById('wrapVers').style.display = 'none'
	document.getElementById('tabC').style.display = 'none'
	document.getElementById('tabC').style.display = 'none'
	document.getElementById('tabC').style.display = 'none'
	document.getElementById(`wrap-tbInt`).style.display = 'none';
	document.getElementById(`reliablePr`).style.display = 'none';
	document.getElementById(`containerTrust`).style.display = 'none';
	document.getElementById(`containerBeliev`).style.display = 'none';
	document.getElementById(`containerLicense`).style.display = 'none';
	document.getElementById('interlinking').style.display = 'none';
	document.getElementById(`intPie`).style.display = 'none';
	document.getElementById(`tableInt`).style.display = 'none';
	document.getElementById(`performance`).style.display = 'none';
	document.getElementById(`performanceT`).style.display = 'none';
	document.getElementById('wrapSec').style.display = 'none';
	document.getElementById('accuracy').style.display = 'none';
	document.getElementById('const-tab').style.display = 'none'
	document.getElementById('consistency').style.display = 'none'
	document.getElementById('verifiability').style.display = 'none'
	document.getElementById('volatility').style.display = 'none'
	document.getElementById('currency').style.display = 'none'
	document.getElementById('conciseness').style.display = 'none'
	document.getElementById('amountOfData').style.display = 'none'
	document.getElementById('wrap-repConc').style.display = 'none'
	document.getElementById('wrap-repCons').style.display = 'none'
	document.getElementById('wrap-und').style.display = 'none'
	document.getElementById('wrapInterp').style.display = 'none'
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

function myFunction() {
	var input, filter, ul, li, a, i;
	input = document.getElementById("mySearch");
	filter = input.value.toUpperCase();
	ul = document.getElementById("myMenu");
	li = ul.getElementsByTagName("li");
	for (i = 0; i < li.length; i++) {
	  a = li[i].getElementsByTagName("button")[0];
	  if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
		li[i].style.display = "";
	  } else {
		li[i].style.display = "none";
	  }
	}
}

function addClick(li){
    li.addEventListener("click",function(){
        li.style.backgroundColor = "#00ea89cc"
        li.style.color = "white"
    });
}
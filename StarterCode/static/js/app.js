function Data(sample) {
    
    d3.json("samples.json").then((data) => {
        //console.log(data) check data

        // set variables & filter metadata to sample selection
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampobj => sampobj.id == sample);
        var result = resultArray[0];
        var CHART = d3.select("#sample-metadata");
        //start blank chart
        CHART.html("");
        //append chart to show metadata for sample
        Object.entries(result).forEach(([key, value]) => {
            CHART.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}
// bubble and bar chart
function Charts(sample){
    d3.json('samples.json').then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampObj => sampObj.id == sample);
        var result = resultArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        //set format bubble chart
        var layout_b = {
            title: "Bacterias per Sample",
            margin: { t: 0},
            xaxis: { title: "OTU ID"},
            margin: {t: 30}

        };
        //set data bubble chart
        var data_b = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: 'Electric'

                }
            }
        ];
        //bubble chart
        Plotly.newPlot("bubble", data_b, layout_b);
        //filter bar chart to 10
        var yvalues = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        //set bar data
        var barData = [
            {
                y: yvalues,
                x: sample_values.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
            }
        ];
        // set bar format
        var barLayout = {
            title: "Top 10 Bacterias",
            margin: { t:30, 1:159}
        };
        // bar chart
        Plotly.newPlot("bar", barData, barLayout);

    });
}

function Info() {
    //select drop down information
    var selector = d3.select("#selDataset");
    // pull sample numbers from json
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;
        //populate drop down items
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        // set first number in sample as starter
        var fvalue = sampleNames[0];
        Charts(fvalue);
        Data(fvalue);

    });
}


function optionChanged(newsample) {
    Charts(newsample);
    Data(newsample);
}

Info();
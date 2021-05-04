//Create a list of IDs to pass to the dropdown
d3.json("data/samples.json").then(function (data) {
    console.log(data);
    //Populate the dropdown
    var dropdown = d3.selectAll("#selDataset")
    var idlist = data.samples.map(d => d.id)
    idlist.forEach(d => {
        var o = dropdown.append("option");
        o.text(d);
    })

});

buildPage("940")

// On change to the dropdown, call getData()
d3.selectAll("#selDataset").on("change", handleSubmit);

// Submit Button handler
function handleSubmit() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input value from the form
    var idselected = d3.select("#selDataset").node().value;
    // console.log(`User selected ${idselected}`);

    // Build the page with the ID values
    buildPage(idselected);
}

//Run function with selected value
function buildPage(idselected) {

    // 1. Use the D3 library to read in samples.json.
    d3.json("../data/samples.json").then(function (data) {

        var values = data.samples.filter(o => o.id == idselected)[0].sample_values.slice(0, 10).reverse();
        // console.log(values);
        var ids = data.samples.filter(o => o.id == idselected)[0].otu_ids.slice(0, 10).reverse().map((id) => {
            return `OTU ${id}`
        });
        // console.log(ids);
        var labels = data.samples.filter(o => o.id == idselected)[0].otu_labels.slice(0, 10).reverse();
        // console.log(labels);

        // 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
        // Use sample_values as the values for the bar chart.
        // Use otu_ids as the labels for the bar chart.
        // Use otu_labels as the hovertext for the chart.
        // Create your trace.
        var tracebar = {
            x: values,
            y: ids,
            hovertext: labels,
            type: "bar",
            orientation: "h"
        };

        // Create the data array for our plot
        var databar = [tracebar];

        // Define the plot layout
        var layout = {
            title: "Top 10 OTUs found in individual selected",
            xaxis: { title: "# of things" },
            yaxis: { title: "OTUs" }
        };

        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", databar, layout);



        // 3. Create a bubble chart that displays each sample.
        // Use otu_ids for the x values.
        // Use sample_values for the y values.
        // Use sample_values for the marker size.
        // Use otu_ids for the marker colors.
        // Use otu_labels for the text values.

        var tracebubble = {
            x: data.samples.filter(o => o.id == idselected)[0].otu_ids,
            y: data.samples.filter(o => o.id == idselected)[0].sample_values,
            text: data.samples.filter(o => o.id == idselected)[0].otu_labels,
            mode: 'markers',
            marker: {
                size: data.samples.filter(o => o.id == idselected)[0].sample_values,
                color: data.samples.filter(o => o.id == idselected)[0].otu_ids,
            }
        };

        var databubble = [tracebubble];

        var layout = {
            title: 'Bubble Chart',
            showlegend: false,
            height: 600,
            width: 1200
        };

        Plotly.newPlot("bubble", databubble, layout);

        // 4. Display the sample metadata, i.e., an individual's demographic information.
        // 5. Display each key - value pair from the metadata JSON object somewhere on the page.
        var selection = d3.select("#sample-metadata").selectAll("h5").data(data.metadata.filter(o => o.id == idselected))

        selection.enter()
            .append("h5")
            .merge(selection)
            .html(function (d) {
                // console.log(d);
                return `<h5>id: ${d.id}</h5><h5> Ethnicity: ${d.ethnicity}</h5><h5> Gender: ${d.gender}</h5><h5> Age: ${d.age}</h5><h5> Location: ${d.location}</h5><h5> Wash Freq: ${d.wfreq}</h5>`
            })
        var speeddata = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: data.metadata.filter(o => o.id == idselected)[0].wfreq,
                title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per week" },
                gauge: {
                    axis: { range: [0, 10] },
                    steps: [
                        { range: [0, 1], color: "rgb(165,0,38)" },
                        { range: [1, 2], color: "rgb(215,48,39)" },
                        { range: [2, 3], color: "rgb(244,109,67)" },
                        { range: [3, 4], color: "rgb(253,174,97)" },
                        { range: [4, 5], color: "rgb(254,224,144)" },
                        { range: [5, 6], color: "rgb(224,243,248)" },
                        { range: [6, 7], color: "rgb(171,217,233)" },
                        { range: [7, 8], color: "rgb(116,173,209)" },
                        { range: [8, 9], color: "rgb(69,117,180)" },
                        { range: [9, 10], color: "rgb(49,54,149)" },
                    ],
                },
                type: "indicator",
                mode: "gauge+number"
            }
        ];

        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', speeddata, layout);

    });
}
// 6. Update all of the plots any time that a new sample is selected.

// Advanced Challenge Assignment(Optional)
// The following task is advanced and therefore optional.
// Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot the weekly washing frequency of the individual.
// You will need to modify the example gauge code to account for values ranging from 0 through 9.
// Update the chart whenever a new sample is selected.
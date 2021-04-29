// 1. Use the D3 library to read in samples.json.

d3.json("../data/samples.json").then(function (data) {
    //check console
    // console.log(data);
    // console.log(data.samples[0].sample_values);
    // console.log(data.samples[0].otu_ids);
    // console.log(data.samples[0].otu_labels);


    //store then in a variable
    // var NewArray = newData.filter(SortandSlice);
    // console.log(NewArray)

    var values = data.samples[0].sample_values.slice(0, 10).reverse();
    console.log(values);
    var ids = data.samples[0].otu_ids.slice(0, 10).reverse().map((id) => {
        return `OTU ${id}`
    });
    console.log(ids);
    var labels = data.samples[0].otu_labels.slice(0, 10).reverse();
    console.log(labels);

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
        x: data.samples[0].otu_ids,
        y: data.samples[0].sample_values,
        text: data.samples[0].otu_labels,
        mode: 'markers',
        marker: {
            size: data.samples[0].sample_values,
            color: data.samples[0].otu_ids,
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

});

// 4. Display the sample metadata, i.e., an individual's demographic information.

// 5. Display each key - value pair from the metadata JSON object somewhere on the page.

// 6. Update all of the plots any time that a new sample is selected.

// Advanced Challenge Assignment(Optional)
// The following task is advanced and therefore optional.
// Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot the weekly washing frequency of the individual.
// You will need to modify the example gauge code to account for values ranging from 0 through 9.
// Update the chart whenever a new sample is selected.
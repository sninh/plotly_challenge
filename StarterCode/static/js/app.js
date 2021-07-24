// Use the D3 library to read in samples.json
d3.json("data/samples.json").then((rawData) => {
	console.log(rawData);
	var data = rawData;
	
	var names = data.names;
	names.forEach((name) => {
		d3.select("#selDataset").append("option").text(name);
	})

	function init() {
		
		DataSet = data.samples.filter(sample => sample.id === "953")[0];
		console.log(DataSet);
		// Select all sample_values, otu_ids and otu_labels of the selected test ID
		sample_values = DataSet.sample_values;
		otu_ids = DataSet.otu_ids;
		otu_labels = DataSet.otu_labels;

    // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
		// Create your trace.
    var trace1 = {
			x: sample_values,
			y: otu_ids.map(outId => `OTU ${outId}`),
			text: otu_labels,
			type: "bar",
			orientation: "h"
		};
    // Create the data array for our plot
		var barData = [trace1];
     // Define the plot layout
		var barlayout = {
			autosize: false,
			width: 450,
			height: 600
		}
		Plotly.newPlot("bar", barData, barlayout);

		// Create a bubble chart that displays each sample.
     // Create your trace
		var trace2 = {
			x: otu_ids,
			y: sample_values,
			text: otu_labels,
			mode: 'markers',
			marker: {
				color: otu_ids,
				size: sample_values
			}
		};
     // Create the data array for our plot
		var bubbleData = [trace2];
      // Define the plot layout
		var bubbleLayout = {
			xaxis: { title: "OTU ID"},
			showlegend: false,
		};
		Plotly.newPlot('bubble', bubbleData, bubbleLayout);
		// Display the sample metadata, i.e., an individual's demographic information.
		demoDefault = data.metadata.filter(sample => sample.id === 953)[0];
		console.log(demoDefault);
		Object.entries(demoDefault).forEach(
			([key, value]) => d3.select("#sample-metadata")
													.append("p").text(`${key.toUpperCase()}: ${value}`));
	}
	init();
	// Call updatePlotly() when a change takes place to the DOM
	d3.selectAll("#selDataset").on("change", updatePlot);
	// This function is called when a dropdown menu item is selected
	function updatePlot() {
		
        var inputElement = d3.select("#selDataset");
		
        var inputValue = inputElement.property("value");
        console.log(inputValue);
		
        dataset = data.samples.filter(sample => sample.id === inputValue)[0];
        console.log(dataset);
		
        plot_sample_values = dataset.sample_values;
        plot_otu_ids = dataset.otu_ids;
        plot_otu_labels = dataset.otu_labels;
		
		top10Values = plot_sample_values.slice(0, 10).reverse();
		top10Ids = plot_otu_ids.slice(0, 10).reverse();
		top10Labels = plot_otu_labels.slice(0, 10).reverse();
		
		Plotly.restyle("bar", "x", [top10Values]);
		Plotly.restyle("bar", "y", [top10Ids.map(outId => `OTU ${outId}`)]);
		Plotly.restyle("bar", "text", [top10Labels]);
		
		Plotly.restyle("bar", "x", [top10Values]);
		Plotly.restyle("bar", "y", [top10Ids.map(outId => `OTU ${outId}`)]);
		Plotly.restyle("bar", "text", [top10Labels]);
		
		Plotly.restyle('bubble', "x", [plot_otu_ids]);
		Plotly.restyle('bubble', "y", [plot_sample_values]);
		Plotly.restyle('bubble', "text", [plot_otu_labels]);
		Plotly.restyle('bubble', "marker.color", [plot_otu_ids]);
		Plotly.restyle('bubble', "marker.size", [plot_sample_values]);
		
		metainfo = data.metadata.filter(sample => sample.id == inputValue)[0];
		d3.select("#sample-metadata").html("");
		Object.entries(metainfo).forEach(([key, value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`));
	}
});
// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("data/samples.json").then((importedData) => {

	console.log(importedData);

	var data = importedData;


	var names = data.names;

	names.forEach((name) => {
		d3.select("#selDataset").append("option").text(name);
	})


	function init() {

		// Choose data for test ID No. 940 plotted as default
		DataSet = data.samples.filter(sample => sample.id === "940")[0];
		console.log(DataSet);

		// Select all sample_values, otu_ids and otu_labels of the selected test ID
		sample_values = DataSet.sample_values;
		otu_ids = DataSet.otu_ids;
		otu_labels = DataSet.otu_labels;



    //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
		var trace1 = {
			x:ten,
			y: ten_otu_ids.map(outId => `OTU ${outId}`),
			text: ten_otu_labels,
			type: "bar",
			orientation: "h"
		};

		
		var barData = [trace1];

		
		var barlayout = {
			title: `<b>Top 10 OTUs found in selected Test Subject ID No<b>`,
			xaxis: { title: "Sample Value"},
			yaxis: { title: "OTU ID"},
			autosize: false,
			width: 450,
			height: 600
		}

		
		Plotly.newPlot("bar", barData, barlayout);

		// Create a bubble chart that displays each sample.
		var trace2 = {
			x: otu_ids,
			y: sample_values,
			text: allten_otu_labels,
			mode: 'markers',
			marker: {
				color: otu_ids,
				size: sample_values
			}
		};
		
		var bubbleData = [trace2];
		
		var bubbleLayout = {
			title: '<b>Bubble Chart displaying sample values of OTU IDs of the selected individual<b>',
			xaxis: { title: "OTU ID"},
			yaxis: { title: "Sample Value"}, 
			showlegend: false,
		};
		
		Plotly.newPlot('bubble', bubbleData, bubbleLayout);

		// Display the sample metadata, i.e., an individual's demographic information.
		demoDefault = data.metadata.filter(sample => sample.id === 940)[0];
		console.log(demoDefault);

		// Display each key-value pair from the metadata JSON object somewhere on the page.
		Object.entries(demoDefault).forEach(
			([key, value]) => d3.select("#sample-metadata")
													.append("p").text(`${key.toUpperCase()}: ${value}`));

	}
});
var synaptic = require('synaptic');
var fs = require('fs');
var Layer = synaptic.Layer,
    Network = synaptic.Network;


// set up neural network
var inputLayer = new Layer(4);
var hiddenLayer = new Layer(5);
var outputLayer = new Layer(3);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

var network = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
});



// read training data file
fs.readFile('iris.txt','utf8',function(err, data){
	if(err) throw err;

	// load data into training data array
	var lines = data.split("\n");
	var trainingData = [];
	for(var i = 0; i < lines.length; i++){
		var line = lines[i].trim();
		var splitLine = line.split(",");
		var input = splitLine.slice(0, 4);

		var output = splitLine[4]=='Iris-virginica' ? [0,0,1] 
					: splitLine[4] == 'Iris-versicolor' ? [0,1,0] 
					: [1,0,0];

		trainingData.push({
			input: input,
			output: output
		});
	}

	// train the network
	var learningRate = .01;
	for (var i = 1; i <= 10000; i++)
	{
		for(var j = 0; j < trainingData.length; j++){
			network.activate(trainingData[j].input);
			network.propagate(learningRate, trainingData[j].output);
		}
		if(i%1000 == 0)
			console.log("Training... "+i/100+"% complete. ");
	}

	// use the network to classify flowers based on testing data
	fs.readFile('testing_data.txt','utf8',function(err, data){
		if(err) throw err;
		console.log("\n\nResults\n===============================\n");
		var lines = data.split("\n");
		for(var i = 0; i < lines.length; i++){
			var input = lines[i].trim().split(",");
			var result = getFlowerName(network.activate(input));
			console.log(lines[i].trim()+" => "+result);
		}
	});
});

// helper functions
function getLargestIndex(arr){
	var result = 0;
	for(var i = 1; i < arr.length; i++)
		if(arr[i] > arr[result])
			result = i;
	return result;
}

function getFlowerName(arr){
	var index = getLargestIndex(arr);
	if(index == 0)
		return "Iris-setosa";
	if(index == 1)
		return "Iris-versicolor";
	return "Iris-virginica"
}
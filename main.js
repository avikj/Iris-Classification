var synaptic = require('synaptic');

var Layer = synaptic.Layer,
    Network = synaptic.Network;

var fs = require('fs');
fs.readFile('training_data.txt','utf8',function(err, data){
	if(err) throw err;

	// read data from training data file and set up training data array
	var lines = data.split("\n");
	var training_data = [];
	for(var i = 0; i < lines.length; i++){
		var line = lines[i].trim();
		var split_line = line.split(",");
		var data_point = {};
		var input = split_line.slice(0, 4);

		var output = split_line[4]=='Iris-virginica' ? [0,0,1] 
					: split_line[4] == 'Iris-versicolor' ? [0,1,0] 
					: [1,0,0];

		training_data.push({
			input: input,
			output: output
		});
	}

	//set up neural network
	var inputLayer = new Layer(4);
	var hiddenLayer = new Layer(3);
	var outputLayer = new Layer(3);

	inputLayer.project(hiddenLayer);
	hiddenLayer.project(outputLayer);

	var network = new Network({
	    input: inputLayer,
	    hidden: [hiddenLayer],
	    output: outputLayer
	});


	// train the network
	var learningRate = .3;
	for (var i = 0; i < 1000; i++)
	{
		for(var j = training_data.length-1; j >= 0; j--){
			network.activate(training_data[j].input);
			network.propagate(learningRate, training_data[j].output);
		}
		if(i%1000 == 0)
			console.log(i/100+"% done.");
	}


	fs.readFile('training_data.txt','utf8',function(err, data){
		if(err) throw err;
			
		var lines = data.split("\n");

		for(var i = 0; i < lines.length; i++){
			var line = lines[i].trim();
			var split_line = line.split(",");
			var data_point = {};
			var input = split_line.slice(0, 4);

			var output = split_line[4]=='Iris-virginica' ? [0,0,1] 
						: split_line[4] == 'Iris-versicolor' ? [0,1,0] 
						: [1,0,0];

			testNetwork(network, input, output);
		}
	});
	
});

function testNetwork(network, inputs, expectedOutput){
	console.log("output:"+network.activate(inputs)+"\nshould be:"+expectedOutput+"\n\n");
}

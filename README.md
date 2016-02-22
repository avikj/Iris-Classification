# Iris Classification
Using the [Iris flower data set](https://en.wikipedia.org/wiki/Iris_flower_data_set) to predict whether a flower is an Iris setosa, Iris versicolor, or Iris virginica based on its sepal and petal lengths and widths. This is my submission for MVCS Club's competition for February 2016.

## Testing
1. Clone the repo onto your computer and move into the directory.
2. Move into the Iris-Classification directory.
3. Install necessary Node modules using npm.
  ```shell
  git clone https://github.com/avikj/Iris-Classification.git
  cd Iris-Classification
  npm install
  ```
4. Edit testing_data.txt and replace the existing data with your own tests. Each line should follow this format:
  ```
  <sepal length>,<sepal width>,<petal length>,<petal width>
  ```
5. Run main.js
  ```shell
  node main.js
  ```
6. The results should be printed to the console after a few seconds. Compare these with the actual classifications to verify the accuracy of the program.

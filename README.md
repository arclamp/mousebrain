# mousebrain
Experiments in visualizing mouse brain traces using Candela and JupyterLab

## Build Instructions

### Web app

To build the mousebrain web application, follow these steps.

1. Clone the repository.

2. Install the NPM dependencies: `npm i`.

3. Install the virtual environment: `npm run virtualenv`.

4. Create the test dataset: `npm run data:small`.

5. Build the application: `npm run build`.

6. Serve the application: `PORT=<your port (defaults to 8000)> npm run serve`.

7. Go to http://localhost:8000.

### Jupyter Notebook

To run the mousebrain component in Jupyter Notebook, follow these steps.

1. Follow steps 1 through 4 from the "Web app" instructions above.

2. Build the mousebrain library: `npm run build:lib`.

3. Launch Jupyter Notebook: `./venv/bin/jupyter notebook`.

4. Create your own notebook, starting with `import pymousebrain`; or load
   `Mousebrain Demo.ipynb` to play around with it.


# Exploratory Data Visualisation with Altair : 

In the previous article of Data Visualization , we used Tableau to create a dashboard from places in France. Tableau is a great tool, but it has two primary limitations: 
1) while Tableau is quite powerful—and we've only scratched the surface of what it can do—sometimes you need to do more. 
2) A lot of statistical data work is done programmatically rather than through a drag-n-drop interface.

This week, we will continue to work with the Places-in-France dataset. This time, we will use  [Altair](https://altair-viz.github.io/), a Python library for creating statistical visualizations.

The goals of this lab are:

-   Get a better understanding of grammar of statistical visualisations: spaces, mappings, marks, and encodings,
-   Give you a sense of a complementary, programmatic way of creating an interactive visualisation,
-   Understand the declarative way of thinking used by Altair, Vega-Lite, and D3.

With that in mind, let's get started.

## 1-  Altair 
  
[Altair](https://altair-viz.github.io/)  is a package designed for exploratory visualization in Python that features a  **declarative API**, allowing data scientists to focus more on the data than the incidental details. Altair is based on the  [Vega](https://vega.github.io/)  and  [Vega-Lite](https://vega.github.io/vega-lite/)visualization grammars, and thus automatically incorporates best practices drawn from recent research in effective data visualization.

![](https://cdn-images-1.medium.com/max/800/1*kA5O0LCDM44C8Tnp_DUCfQ.png)


#### Installation

To be able to use Altair we are required to install two sets of tools depending upon the front end we would like to use.

1.  The core Altair Package and its dependencies
2.  The renderer for the frontend we wish to use (i.e.,  [Jupyter Notebook](https://jupyter-notebook.readthedocs.io/en/stable/),  [JupyterLab](http://jupyterlab.readthedocs.io/en/stable/),  [Colab](https://colab.research.google.com/), or  [nteract](https://nteract.io/)).
3.  Additionally, Altair’s documentation makes use of the  [vega_datasets](https://github.com/altair-viz/vega_datasets)package, and so it is included in the installation instructions below.

Since I will be using  **Jupyter Lab(recommended)**, the instructions pertain to it. However, for others, visit the  [installation page](https://altair-viz.github.io/getting_started/installation.html).

    conda install -c conda-forge altair vega_datasets jupyterlab


## 2- Loading data

[Download our Places-in-France dataset](https://github.com/kasamoh/Data-analysis/blob/master/Data%20Visualization/Altair/france.csv) and place it in the same folder as this notebook.

We'll now need to import it into our project.  Altair can manage multiple data formats.  In our case, we'll use a version of last week's data converted into CSV format.  (It can also handle TSV, JSON, and Pandas Dataframes.)

In our case, we're going to just use the name of our CSV file.  You could also use a URL or a full path.


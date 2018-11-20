
## Kaggle Competition - Forest Type Prediction  
Elaborated by Mohamed DHAOUI

In this report we suggest a data science methodology aiming at predictng the forest cover type using the dataset provided in the Kaggle competition which corresponds to cartographic variables collected from US Geological Survey and US Forest Service .

This analysis was done initially on Databricks using PYSPAR.ML package , I tried various method under spark , like LogisticRegression , Kmeans, RandomForest .. and I compared them to the Scikitlearn  package of python . Unfortunately , I obtained very different results while training the models with the same parameters and on the same dataset with the same seed. Also , unlike pyspark , ScikitLearn offers various advanced and powerful methods like extratrees and baggingtrees that deal wiith noisy features , and  using these kind of algorithms has undoubtedly enhanced our analysis .

In this report ,  I have described the different step of forestcover type modelling , starting from reading the dataset , processing it , applying machine learning algorithms and evaluating the model. 
I had split the training dataset in two parts, the first 80% used to train the model and the rest of 20% to validate the predictions and calculate the accuracy.We have applied crossvalidation for parameters tuning  .
The final predictions were done on the test dataset and the best accuracy (0.957) obtained on the Kaggle competition was achieved with the an ensemble learning approach that combines ExtraTreesClassifier , Randomforest and Kmeans .

Below the final ranking and the score I obtained after submission to Kaggle : 

| Rank |Team Name| Score |
|:---------:|:-----------:|:-------:|
| 12        |Mohamed Dhaoui    |   0.95765  |


## In order to launch the notebook :
You need to change the path of the training set and the test set  ( the files are too big to put in github ) 

```
traincsv=pd.read_csv('/home/user/TelecomParistech/TP spark/tp_kaggle/all/train-set.csv', index_col='Id')
testcsv=pd.read_csv('/home/user/TelecomParistech/TP spark/tp_kaggle/all/test-set.csv', index_col='Id') 
```


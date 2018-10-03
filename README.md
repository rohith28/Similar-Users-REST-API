# Similar-Users-REST-API

Building an API for knowing the similarity between the users based on their activity. 

# Technologies :

* Python, Javascript
* MySQL (AWS instance)
* Scikit Learn
* Node js, npm

# Data 

Data files are :

1) coursetags.csv
2) user_assessment_scores.csv
3) user_course_views.csv
4) user_interest.csv

Goal : From the user behaviour, we need to find the similarity 

To run project :

* Install Node js, npm
* go to the directory 
* run `npm install`
* run `node server.js`

For better view please install Postman(https://www.getpostman.com/) or Firefox

Then api will run on `localhost:8080`

For viewing all the users `localhost:8080/users`
(but it wil show first 50 rows from database)

For view particular user and similarity score : `localhost:8080/user/id` 
example: localhost:8080/iuser/1. 

This api also take put and delete methods

Delete method. : `localhost:8080/user/:id` 

Put method : `localhost:8080/user` and params please provide id and score. 






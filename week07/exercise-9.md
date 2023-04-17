# Exercise 9: Forms and state
​
_Goal: Managing forms and related states in the "HeapOverrun" React app developed last week._
​

## To state or not to state?
​
Add a function to sort the table content by clicking on one of its headers. For simplicity, start focusing on the "score" column: a first click will sort the table from the highest value to the lowest and a second click from the lowest to the highest. Do you need a new state? Why (not)? Containing Which information?


## Add a new answer (I part)

Include a form on the question page to add a new answer. The form will appear below the answers' table and will use _controlled input components_. 

Starting from the form, handle the insertion of a new answer in the table. Use the defined state to perform this operation.
​
​
## Edit an answer
​
Add a new "edit" button to the actions available for each answer row. When pressed, re-use the form on the question page to edit the chosen answer. Handle the state update accordingly.
​
What happens when you edit two answers, one after the other, without submitting the form? Why? How can you solve the issue?

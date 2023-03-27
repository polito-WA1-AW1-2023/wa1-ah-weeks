# Exercise 6: Dynamic Q&A Webpage
_Goal: adding dynamic behaviors to the "HeapOverrun" question page, using JavaScript and manipulating the DOM of the webpage developed in Exercise 5._

## Loading the answers

Load the list of answers from a dedicated JavaScript array and display it in the table present on the webpage. Use suitable DOM manipulation methods.

Each answer, in JavaScript, is represented as text, author (respondent), score (negative or positive integer), and date. You can re-use the same data structure created for Exercise 3-4.

In addition, each answer has associated a button to increase the score of the specific answer from the list displayed on the webpage. Be sure to include such a button while building the displayed list.

## Changing the score

Implement the functionality of increasing the answer's score, from the webpage list, in JavaScript. To do so, you have to define an `EventListener` in a suitable place (in the code) for each button.

Please, notice that after reloading the page, all the answers will appear again with the original score (i.e., the change is not persistent).

## Adding a new row

Implement the functionality of the 'Add' button, by adding a new line to the table with the values inserted by the user.

Note: in case the user-provided data are missing or invalid, it should 'refuse' to insert the data and display an error message.

## / (index)

- Layout and navbar
- Welcome text
- List of Questions (on click, goes to /answers/:idQuestion)
- Login/Logout/Profile button

## /answers/:idQuestion

- Layout and navbar
- Question details
- List of Answers
    - DELETE  -> execute and stay on this route
    - ADD -> go to /addAnswer/:idQuestion
    - EDIT -> go to /editAnswer/:idQuestion/:idAnswer

## /addAnswer/:idQuestion

- Layout and navbar
- FORM for entering a new answer
    - ADD -> execute and go to /answers/:idQuestion
    - CANCEL -> go to /answers/:idQuestion

## /editAnswer/:idQuestion/:idAnswer

- Layout and navbar
- FORM for modifying an answer
    - SAVE -> execute and go to /answers/:idQuestion
    - CANCEL -> go to /answers/:idQuestion

## * (no match)

- Layout and navbar
- 404 message
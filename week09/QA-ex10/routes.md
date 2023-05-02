##  /
 - Layout, Navbar
 - List of questions
    - SELECT -> go to /answers/:questionId

## /answers/:questionId

- Layout, Navbar
- Info about the question
- List of answers
    - DELETE -> delete answer
    - VOTE -> change vote
    - EDIT -> go to /editAnswer/:questionId/:answerId
- GO BACK / EXIT -> go to /
- ADD -> go to /addAnswer/:questionId

## /addAnswer/:questionId

- Layout, Navbar
-( ??? list of answwer? with buttons? ... )
- Answer form
    - ADD -> add to state, then go to /answers/:questionId
    - CANCEL -> go to /answers/:questionId

## /editAnswer/:questionId/:answerId

- Layout, Navbar
- Answer form, initiallized with current value of answerId
    - SAVE -> modify inside state, then go to /answers/:questionId
    - CANCEL -> go to /answers/:questionId

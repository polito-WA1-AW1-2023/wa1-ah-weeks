# Exercise 11: API Server

_Goal: Building an API Server for HeapOverrun_


Design and implement and HTTP API server for the HeapOverrun example application.

- Pick the SQLite database developed in Exercise 4 (Week 03), review it and, if necessary, complete it with the information needed for representing the Q&A information
- Define a set of HTTP APIs for each of the elementary operations on the Questions and Answers entities
    - Operations may be list, create, add, modify, ...
    - For each API, define the HTTP method, the URL (with parameters), the Request Body (if any), the Response Body (if any), the status code(s) in case of success or failure (with the corresponding error body)
- Implement an HTTP server using NodeJS + Express, containing the HTTP Routes for the defined APIs, and executing the proper SQL queries on the SQLite database
    - Remember the server-side validation of input values, and ensure database integrity

Note: the API **Design** phase does not have a single solution, there are many options to explore, with their pro's and con's .



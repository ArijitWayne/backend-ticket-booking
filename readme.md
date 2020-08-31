# Readme

> Note: A mongoDB atlas account is required to run this application. 

### To start the project:

```
npm start
```

### Postman Routes and Screenshots:

1. **Book Ticket**<br>

  `POST http://localhost:4000/ticket`

  <img src='./images/create.png' height='400px' width='auto'>

2. **Get all tickets**<br>
  
  `GET http://localhost:4000/ticket`

  <img src='./images/get.png' height='400px' width='auto'>  

3. **Update ticket timing**<br>
    
  `PATCH http://localhost:4000/ticket/:ticket_id`

  <img src='./images/update.png' height='400px' width='auto'>
  
4. **Delete a ticket**<br>
  
  `DELETE http://localhost:4000/ticket/:ticket_id`

  <img src='./images/delete.png' height='400px' width='auto'>

5. **Get all tickets by time**<br>
  
  `GET http://localhost:4000/ticket/:timing`

  <img src='./images/getbytime.png' height='400px' width='auto'>

6. **Show user details by ticket id**<br>

  `GET http://localhost:4000/api/ticket/:ticket_id`

  <img src='./images/getbyid.png' height='400px' width='auto'>

7. **Automated Deletion of tickets**<br>
To delete tickets automatically, cron-job has been used.
It will run every 8 hours to delete tickets that are older than 8 hours by comparing the current time with the ticket timing

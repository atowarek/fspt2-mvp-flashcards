## My flashcards

This is my first **MVP project**, created in a one-week sprint while studying at CodeOp Bootcamp in Barcelona.

The app is called **‘My flashcards’** and it's an educational quiz game built using open Trivia API.

Check out the deployed app on Heroku: [My flashcards](https://mvp-flashcards.herokuapp.com)

![homepage](/client/public/homepage.jpg)

## Technologies

The main technologies used were:

Front-end: React.js, JavaScript ES6, HTML, CSS, Bootstrap & Reactstrap.

Back-end: Node.js & Express.js. MySQL for databases.

Deployment: Heroku.

## Setup

### Dependencies

Run `yarn` on root folder to install dependencies related to Express.

`cd client` and run `yarn` install dependencies related to React.

### Database prep

Create `.env` file in project directory and add:

```
DB_NAME=flashcards
DB_HOST=localhost
DB_PASS=YOUR_PASSWORD
DB_USER=root
PORT=5000
```

(replace YOUR_PASSWORD with your actual password)

### Run Your Development Servers

- Run `yarn dev` in project directory to start both the Express server on port 5000 and client server in development mode with hot reloading in port 3000.
- Client is configured so all API calls will be proxied to port 5000 for a smoother development experience.
- You can test your client app in `http://localhost:3000`
- You can test your API in `http://localhost:5000/api`

## Documentation

### Database schema

![db schema_without_extension](https://user-images.githubusercontent.com/60450533/83950744-51f18980-a82d-11ea-96b7-65b6e54a1864.png)

### User flow diagram

![user_flow](https://user-images.githubusercontent.com/60450533/83950741-4bfba880-a82d-11ea-820a-9868bea770ba.png)

### API routes plan

![api_design](https://user-images.githubusercontent.com/60450533/83950738-4736f480-a82d-11ea-9108-c8f421727f49.png)

### Notes

_This is a student project that was created at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Barcelona._

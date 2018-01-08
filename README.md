# Eviluators API Server

* Recieves the PR request data from Github via webhooks
* Creates a persistent record for each submission via MongoDB (mLab)

### Schema

```
  Sprint -
    Title - String - Indexed
    Url - String - required
  Submission -
    Sprint - Ref
    Student - String - required
    Url - String - required
    Submission Date - Date - default Now()
    Status - String (enum) - required - default “queued”
      “Queued”
      “Running”
      “Finished”
    Results - String
```

### Routes

```
  Sprint
    * standard CRUD routes -- ? Authenticated ?
  Submission
    POST - Pr (this will be the route that the Github hooks post PRs to)
    GET - Status - Retrieves status of individual submissions (If needed)
```

---

### Development requirements

* globally installed Ngrok package (https://www.npmjs.com/package/ngrok)
* mLab database
* globally installed nodemon package

### Starting the dev environment

* Copy the `config-base.js` file and name it `config.js`
* Add your mLab URI (with username and password) to the `config.js` DB_URI property
* Run `ngrok http 3333` in terminal to create an endpoint to point the Github webooks to
* Copy the given ngrok url from the terminal and enter it as the "Payload URL" (adding the '/submission/pr' route at the end) in the webhook setup in Github
* Run the start script `npm start`

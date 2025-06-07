# SE65-Senior-project
CAMT SE65 `senior project` for my group

Members:

      652115001 Karanthaphong Areerak​
      652115002 Krittayot Khueanchan​
      652115013 Narongchai Rongthong​
      652115030 Phiriya Promkaewma

---

<details>
<summary>Starting MySQL on Docker <<<</summary>

## Call docker-compose

      docker-compose up -d

Everything has been setup in `docker-compose.yml`
</details>

---

## You can now `npm run dev` in root folder1
to run both front-end and back-end servers

## You can also calls
`to run frontend`

    npm run fe 

or alternatively

    npm run frontend 

`to run backend`

    npm run be 

or alternatively

    npm run backend 

---

## To start back-end

      cd backend

      npm install
      npx knex migrate:latest

      npm run dev

## To start front-end

      cd frontend/SE65-SENIOR-PROJECT
      npm run dev

`Both uses [ CTRL + C ] to terminate batch job (stop the server)`

---

# How to migrate database
Make sure you're in backend folder

`cd backend`

`npx knex migrate:latest`

---

# To reset database run this
(Be warned, doing this data will all be deleted, to keep data, write a new migration file to update existing tables)

`cd backend`

`npx knex migrate:rollback --all`

`npx knex migrate:latest`

---

# Backend Explained

<details>
  <summary><strong>Users Backend</strong></summary>

### GET `/`
- **Description:** Retrieves all users (for testing purposes).
- **Response:** JSON array of user objects.

---

### GET `/profile`
- **Description:** Retrieves the profile data for the authenticated user.
- **Headers:**
  - `Authorization: Bearer <token>` – The JWT token received from the login.
- **Response:** A JSON object with profile data for the user.

---

### POST `/register`
- **Description:** Creates a new user in the system.
- **Required JSON fields:**
  - **name** (string) – The user’s full name.
  - **email** (string) – The user’s email address (must be unique).
  - **password** (string) – The user’s password (will be hashed before storing).
  - **role** (string, optional) – The role for the user, either `"student"` or `"professor"`.
    - *If omitted, it defaults to `"student"`.*
- **Response:** The created user object with an `id` and other user details.

---

### POST `/login`
- **Description:** Authenticates a user and returns a JWT token.
- **Required JSON fields:**
  - **email** (string) – The user’s email address.
  - **password** (string) – The user’s password.
- **Response:** A JSON object containing:
  - `message` – A success message.
  - `token` – The JWT token for authenticated requests.
  - User details (e.g., `userId`, `name`, `email`, `role`).

</details>

<details>
  <summary><strong>Questions Backend</strong></summary>

### GET `/`
- **Description:** Retrieves all questions in the system.
- **Response:** A JSON array of question objects.

---

### GET `/:id`
- **Description:** Retrieves a specific question by its ID.
- **URL Parameters:**
  - **id** (number) – The ID of the question.
- **Response:** A JSON object representing the question.

---

### POST `/`
- **Description:** Creates a new question in the system.
- **Required JSON fields:**
  - **questionName** (string) – The title of the question.
  - **questionDescription** (string) – A detailed description of the problem.
  - **hint** (string) – A hint to help solve the problem (can be an empty string if not provided).
  - **startingCode** (string) – Starter code provided to the user.
  - **correctAnswerCode** (string) – The correct solution code.
  - **testCases** (array of objects) – Each object should include:
    - **input** (string) – The test case input.
    - **output** (string) – The expected output.
  - **estimatedRuntime** (string) – An estimated runtime (e.g., `"0.002"`).
  - **timeComplexity** (string) – The time complexity (e.g., `"O(1)"`).
- **Response:** The created question object, including its generated `id` and all provided fields.

---

### PUT `/:id`
- **Description:** Updates an existing question.
- **URL Parameters:**
  - **id** (number) – The ID of the question to update.
- **Request JSON Fields:** Any fields that need updating.
- **Response:** The updated question object.

---

### DELETE `/:id`
- **Description:** Deletes a question from the system.
- **URL Parameters:**
  - **id** (number) – The ID of the question to delete.
- **Response:** A success message or status confirming deletion.

</details>

---

# ts-code-runner

### Make sure you have
- **Node.js** v20.x (or later) and **npm**
- **g++** (GNU C++ compiler)

Check `g++` by running

    g++ -v

if `no` do the following

  - **Windows:** Install MinGW-w64 and add its `bin` folder to your PATH (follow the manual)
  - **Linux:** Install `build-essential` (e.g. `sudo apt-get install build-essential`)
  - **macOS:** Install Xcode Command Line Tools (`xcode-select --install`)

After that you should be able to start the server with

    npm run dev

Here's the example payload json request

    {
        "code": "#include <iostream>\nusing namespace std;\nint main() { int x; cin >> x; cout << x * 2; return 0; }",
        "testCases": [
            { "input": "5", "expectedOutput": "10" },
            { "input": "10", "expectedOutput": "20" },
            { "input": "0", "expectedOutput": "0" },
            { "input": "-3", "expectedOutput": "-6" },
            { "input": "100", "expectedOutput": "200" }
        ]
    }

You should get this response

    {
        "results": [
            {
                "input": "5",
                "output": "10",
                "expected": "10",
                "passed": true
            },
            {
                "input": "10",
                "output": "20",
                "expected": "20",
                "passed": true
            },
            {
                "input": "0",
                "output": "0",
                "expected": "0",
                "passed": true
            },
            {
                "input": "-3",
                "output": "-6",
                "expected": "-6",
                "passed": true
            },
            {
                "input": "100",
                "output": "200",
                "expected": "200",
                "passed": true
            }
        ]
    }
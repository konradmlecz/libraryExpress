# Api for lend books in library

It's simple Api build in Express.js. You may create account (signup and login) and lend books.

Online project: [https://api.konradmleczko85.smallhost.pl/](https://api.konradmleczko85.smallhost.pl/)


# Apps test

You can test api use platform Api Client (e.g. Insomnia)

# Apps works

1. SignUp 
- https://api.konradmleczko85.smallhost.pl/reader/signup - POST
- Data JSON: { 
"name":"soneName",
"surname":"someSurname",
"email":"someEmail",
"password": "somePassword",
}
2. Login 
- https://api.konradmleczko85.smallhost.pl/reader/login - POST
- Data JSON: { 
"email":"someEmail",
"password": "somePassword",
}

* Attention - You receive token, which may set in header "authorization", then you can lend books

3. List available books to lend
https://api.konradmleczko85.smallhost.pl/book - GET

4. List of books lend
https://api.konradmleczko85.smallhost.pl/reader/book - GET

5. Method to lend one book for us
https://api.konradmleczko85.smallhost.pl/reader/book - POST
- Data JSON: { 
"bookId":"idFromListPoint4",
}

6. Method to return one book
https://api.konradmleczko85.smallhost.pl/reader/book - DELETE
- Data JSON: { 
"bookId":"idFromListPoint5",
}

# Policy

- Reader may lend only two books
- Data is validated

# Technology

- Express.js
- TypeScript
- JSONWebToken
- Uuid
- Mysql
- Bcryptjs

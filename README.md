# Financal Data Crawler
Financal crawler is the APIs that will return financal cleared data for you.
ROE, ROS, EPS, etc

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install dependencies.

```bash
npm install
```

Install [nodemon] globally to update server realtime.

```bash
npm install -g nodemon
```

## Usage

Firstly, start the server

```bash
nodemon server.js
```

Get (test) data from [Postman](https://www.postman.com/downloads/)

Using get method
```bash
http://localhost:5000/finance/VIC
```

Using post method
```bash
http://localhost:5000/finance/getByPost
```

```json
{
"codex" : "VIC"
}
```
## License
[MIT](https://choosealicense.com/licenses/mit/)

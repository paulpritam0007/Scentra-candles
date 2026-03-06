{
  "functions": {
    "api/login.js": {
      "runtime": "nodejs20.x"
    }
  },
  "routes": [
    { "src": "/api/login", "dest": "/api/login.js" },
    { "src": "/(.*)", "dest": "/$1" }
  ]
}

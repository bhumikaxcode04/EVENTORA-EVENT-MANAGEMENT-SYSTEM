const dns = require("node:dns");

console.log("Before:", dns.getServers());

dns.setServers(["8.8.8.8", "1.1.1.1"]);

console.log("After:", dns.getServers());

dns.promises.resolve4("google.com")
  .then(console.log)
  .catch(console.error);
const express = require("express");
const { json, urlencoded } = express;
const app = express();

app.listen(3002, () => {
  console.log("Remote server is running on port 3002");
});
app.use(urlencoded({ extended: true }));
app.use(json());
app.post("/auth", function (req, res) {
  const token = req.headers["x-auth-key"];
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [username, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");
  res.send({
    remote: true,
    body: {
      token: req.body.token,
      username: req.body.username,
      password: req.body.password,
    },
    header: { username, password, token },
  });
  // res.sendStatus(400);
});

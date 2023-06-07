import fetch from "node-fetch";
import functions from "@google-cloud/functions-framework";

functions.http("directus-warmer", async (req, res) => {
  await fetch("https://cms.lefantan.com/items/blogs").catch((err) =>
    res.send(err)
  );

  res.send("Success!");
});

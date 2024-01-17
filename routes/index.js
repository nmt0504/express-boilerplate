var express = require("express");
var router = express.Router();
const { sendResponse, AppError } = require("../helpers/utils.js");
const fooRouter = require("./foo.api.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("Express BoilerPlate!");
});

router.use("/foo", fooRouter);

router.get("/template/:test", async (req, res, next) => {
  const { test } = req.params;
  try {
    //turn on to test error handling
    if (test === "error") {
      throw new AppError(401, "Access denied", "Authentication Error");
    } else {
      sendResponse(
        res,
        200,
        true,
        { data: "template" },
        null,
        "template success"
      );
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;

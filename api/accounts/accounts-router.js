const router = require("express").Router();
const Accounts = require("./accounts-model");
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkAccountId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const account = await Accounts.getById(id);
    res.status(200).json(account);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  [checkAccountPayload, checkAccountNameUnique],
  async (req, res, next) => {
    req.body.name = req.body.name.trim();
    try {
      const account = await Accounts.create(req.body);
      res.status(201).json(account);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  [checkAccountPayload, checkAccountId],
  async (req, res, next) => {
    const { id } = req.params;
    req.body.name = req.body.name.trim();
    try {
      const updatedAccount = await Accounts.updateById(id, req.body);
      res.status(200).json(updatedAccount);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedAccount = await Accounts.deleteById(id);
    res.status(200).json(deletedAccount);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;

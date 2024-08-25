import { Router } from "express";
import User from "../models/userModel.js";
import auth from "../middleware/authMiddleware.js";
import multer from "multer";
const router = Router();

/**
 * REQUESTS AND ENDPOINTS
 * ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
 * -- GET  -- | /users            | ALL users
 * -- GET  -- | /users/me         | User After Authentication
 * -- GET  -- | /users/:id        | A user
 *                                |
 * -- POST -- | /users/login"     | A user
 * -- POST -- | /users/logout     | A user
 * -- POST -- | /users/logoutAll  | A user log out and reset all tokens
 *                                |
 * -- PATCH - | /users/:me        | Change a single resource partly (or fully)
 *                                |
 * -- DELETE  | /users/:me        | Delete an entire resource
 */

// POST
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

const upload = multer({});

router.post("/users/me/avatar", upload.single("avatar"), (req, res) => {
  res.send();
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password,
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

// GET
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// PATCH
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE
router.delete("/users/me", auth, async (req, res) => {
  try {
    console.log("trying to delete user");
    console.log(req.user);
    await req.user.deleteOne();
    console.log("user deleted");
    console.log(req.user);
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

// import { Router } from "express";
// import User from "../models/userModel.js";
// import auth from "../middleware/authMiddleware.js";
// import sharp from "sharp";
// //import { Resend } from "resend";
// //import { sendWelcomeEmail } from "../emails/emails.js";
// import upload from "../middleware/fileSystemMiddleware.js";
// const router = Router();
//
// const asyncHandler = fn => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch(next);
// };
// /**
//  * REQUESTS AND ENDPOINTS
//  * ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//  * -- GET  -- | /users            | ALL users
//  * -- GET  -- | /users/me         | User After Authentication
//  * -- GET  -- | /users/:id        | A user
//  *                                |
//  * -- POST -- | /users/login"     | A user
//  * -- POST -- | /users/logout     | A user
//  * -- POST -- | /users/logoutAll  | A user log out and reset all tokens
//  *                                |
//  * -- PATCH - | /users/:me        | Change a single resource partly (or fully)
//  *                                |
//  * -- DELETE  | /users/:me        | Delete an entire resource
//  */
//
//
// // POST
// router.post("/users/signup", asyncHandler(async (req, res) => {
//   // Example of route logic that could throw an error
//   const user = new User(req.body);
//   await user.save();
//   const token = await user.generateAuthToken();
//   res.status(201).send({ user, token });
// }));
//
//
// router.post("/users/login", async (req, res) => {
//   try {
//     const user = await User.findByCredentials(
//       req.body.email,
//       req.body.password
//     );
//     const token = await user.generateAuthToken();
//     res.send({ user, token });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });
//
// router.post("/users/logout", auth, async (req, res) => {
//   try {
//     req.user.tokens = req.user.tokens.filter((token) => {
//       return token.token !== req.token;
//     });
//     await req.user.save();
//
//     res.send();
//   } catch (error) {
//     res.status(500).send();
//   }
// });
//
// router.post("/users/logoutAll", auth, async (req, res) => {
//   try {
//     req.user.tokens = [];
//     await req.user.save();
//     res.send();
//   } catch (error) {
//     res.status(500).send();
//   }
// });
//
// router.post("/users/me/avatar", upload.single("avatar"), (req, res) => {
//   res.send();
// });
//
//
// // GET
// router.get("/users/me", auth, async (req, res) => {
//   res.send(req.user);
// });
//
// // PATCH
// router.patch("/users/me", auth, async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "email", "password", "age"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );
//
//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid updates!" });
//   }
//
//   try {
//     updates.forEach((update) => (req.user[update] = req.body[update]));
//     await req.user.save();
//
//     res.send(req.user);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });
//
// // DELETE
// router.delete("/users/me", auth, async (req, res) => {
//   try {
//     console.log("trying to delete user");
//     console.log(req.user);
//     await req.user.deleteOne();
//     console.log("user deleted");
//     console.log(req.user);
//     res.send(req.user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
//
// router.post(
//   "/users/me/avatar",
//   auth,
//   upload.single("avatar"),
//   async (req, res) => {
//     const buffer = await sharp(req.file.buffer)
//       .resize({ width: 250, height: 250 })
//       .png()
//       .toBuffer();
//     req.user.avatar = buffer;
//     await req.user.save();
//     res.send();
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// );
//
// router.delete("/users/me/avatar", auth, async (req, res) => {
//   req.user.avatar = undefined;
//   await req.user.save();
//   res.send();
// });
//
// router.get("/users/:id/avatar", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//
//     if (!user || !user.avatar) {
//       throw new Error();
//     }
//
//     res.set("Content-Type", "image/png");
//     res.send(user.avatar);
//   } catch (error) {
//     res.status(404).send();
//   }
// });
//
// // generateAuthToken
// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   return token;
// };
//
// export default router;
//

import { Router } from "express";
import User from "../models/userModel.js"; // Correctly import the User model
import auth from "../middleware/authMiddleware.js";
import sharp from "sharp";
import upload from "../middleware/fileSystemMiddleware.js";

const router = Router();

const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// POST: Signup a new user
router.post("/users/signup", asyncHandler(async (req, res) => {
  const user = new User(req.body);
  await user.save();
  const token = await user.generateAuthToken();
  res.status(201).send({ user, token });
}));

// POST: Login a user
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// POST: Logout a user
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

// POST: Logout a user from all sessions
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

// GET: Get the authenticated user's profile
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// PATCH: Update the authenticated user's profile
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
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

// DELETE: Delete the authenticated user's profile
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.deleteOne();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST: Upload avatar image
router.post("/users/me/avatar", auth, upload.single("avatar"), async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();
  req.user.avatar = buffer;
  await req.user.save();
  res.send();
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

// DELETE: Delete avatar image
router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

// GET: Serve avatar image by user ID
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

export default router;

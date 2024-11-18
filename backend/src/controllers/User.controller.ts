import express, { Request, Response } from "express";

import { User } from "../models/User.model";

import jwt from "jsonwebtoken";
import { Query } from "../models/Query.middleware";
import { isUserLoggedIn } from "../middlewares/authenticate.middlewares";

const app = express();

app.use(express.json());

export const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({
      success: false,
      message: "Please provide all the field",
    });

  const exist = await User.findOne({ email });

  if (exist)
    return res.json({
      success: false,
      message: "User already exist",
    });

  const newUser = await User.create({
    email,
    password,
  });

  if (newUser) {
    await newUser.save();

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, password: newUser.password },
      process.env.JWT_SECRET || ""
    );

    res.cookie("userToken", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: false,
    });

    return res.json({
      success: true,
      User: newUser,
      token,
    });
  }

  res.json({
    success: false,
    message: "Some error occured",
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({
      success: false,
      message: "please provide all the field",
    });

  const isUser = await User.findOne({ email });

  if (isUser) {
    const passwordExist = isUser.password == password;

    if (passwordExist) {
      const token = jwt.sign(
        { id: isUser.id, email: isUser.email, password: isUser.password },
        process.env.JWT_SECRET || ""
      );

      return res.json({
        success: true,
        isUser,
        token,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } else {
    return res.json({
      success: false,
      message: "Invalid credentials",
    });
  }
});

router.post("/addQuery", async (req: Request, res: Response) => {
  const { email, query } = req.body;
  console.log(email, query);
  if (email && query) {
    const result = await Query.create({
      email,
      query,
    });
    await result.save();
  }
  res.send("done");
});

router.get("/getQuery", isUserLoggedIn, async (req: Request, res: Response) => {
  // @ts-ignore
  const adminId = req.user.id;
  if (adminId == process.env.ADMIN_ID!) {
    const results = await Query.find();
    return res.send(results);
  }
  res.status(401).send("Not allowed");
});

router.get("/getUsersCount", async (req: Request, res: Response) => {
  const results = await User.find();
  return res.json({ users: results.length });
});

import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import JsonWebToken from "jsonwebtoken";
import nodemailer from "nodemailer";
const authController = {
  signUp: async (req, res, next) => {
    // console.log("Inhere_conroller",req.body);
    const { username, email, password } = req.body;
    if (
      !username ||
      !password ||
      !email ||
      username === "" ||
      password === "" ||
      email === ""
    ) {
      // res.status(400).json({message:'Please enter all the field'});
      return next(errorHandler(400, "Please enter all the fields"));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    try {
      const response = await user.save();
      // console.log(response);
      res.status(200).json({ message: "successfully Signed UP!!!" });
    } catch (error) {
      next(error);
    }
  },
  signIn: async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === "" || password === "") {
      // res.status(400).json({message:'Please enter all the field'});
      return next(errorHandler(400, "Please enter all the fields"));
    }
    try {
      const userData = await User.findOne({ email: email });

      if (userData) {
        const PasswordVerify = bcryptjs.compareSync(
          password,
          userData.password
        );

        if (PasswordVerify) {
          const token = JsonWebToken.sign(
            { id: userData._id, isAdmin: userData.isAdmin },
            process.env.JWT_SECRET
          );

          const { password: pass, ...rest } = userData._doc;

          res
            .status(200)
            .cookie("access_token", token, {
              httpOnly: true,
              maxAge: 30 * 24 * 60 * 60 * 1000,
            })
            .json(rest);
        } else {
          next(errorHandler(400, "Invalid Password"));
          return;
        }
      } else {
        next(errorHandler(404, "User not found"));
        return;
      }
    } catch (error) {
      next(error);
    }
  },

  googleSignIn: async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;
    try {
      const userData = await User.findOne({ email: email });

      if (userData) {
        const token = JsonWebToken.sign(
          { id: userData._id, isAdmin: userData.isAdmin },
          process.env.JWT_SECRET
        );

        const { password, ...rest } = userData._doc;
        res
          .status(200)
          .cookie("access_token", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
          })
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const user = new User({
          username:
            name.toLowerCase().split(" ").join("") +
            Math.random().toString(9).slice(-4),
          email: email,
          password: hashedPassword,
          profilePicture: googlePhotoUrl,
        });
        await user.save();
        const token = JsonWebToken.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET
        );

        const { password, ...rest } = user._doc;
        res
          .status(200)
          .cookie("access_token", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
          })
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  },
  facebookSignIn: async (req, res, next) => {
    const { name, email, facebookPhotoUrl } = req.body;
    try {
      const userData = await User.findOne({ email: email });

      if (userData) {
        const token = JsonWebToken.sign(
          { id: userData._id, isAdmin: userData.isAdmin },
          process.env.JWT_SECRET
        );

        const { password, ...rest } = userData._doc;
        res
          .status(200)
          .cookie("access_token", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
          })
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const user = new User({
          username:
            name.toLowerCase().split(" ").join("") +
            Math.random().toString(9).slice(-4),
          email: email,
          password: hashedPassword,
          profilePicture: facebookPhotoUrl,
        });
        await user.save();
        const token = JsonWebToken.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET
        );

        const { password, ...rest } = user._doc;
        res
          .status(200)
          .cookie("access_token", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
          })
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  },

  forgotPassword: async (req, res, next) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return next(errorHandler(401, "User not found"));
      }

      const token = JsonWebToken.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "5m" }
      );

      var transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.forget_user,
          pass: process.env.forget_pass,
        },
      });

      var mailOptions = {
        from: "noreply@voidwrites.com",
        to: `${email}`,
        subject: "Reset Your Password",
        text: `Click on this link to change your Password. Link: ${process.env.FRONTEND_URL}/reset-password/${user._id}/${token}`,
      };
      

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return next(
            errorHandler(400, "Failed to send email. Try again Later.")
          );
        } else {
          res.status(200).json("Email Sent");
        }
      });
    } catch (error) {
      next(error);
    }
  },
  resetPassword: async (req, res, next) => {
    const state = JsonWebToken.verify(
      req.params.token,
      process.env.JWT_SECRET,
      (error, user) => {
        if (error) {
          return "Unauthorized";
        } else {
          req.user = user;
          return "Verifed";
        }
      }
    );

    if (state === "Verifed") {
      if (req.user.id !== req.params.userId) {
        return next(
          errorHandler(403, "You are not allowed to update this user")
        );
      }

      if (req.body.password.length < 6) {
        return next(
          errorHandler(400, "Password must be at least 6 Characters.")
        );
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);

      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.userId,
          {
            $set: {
              password: req.body.password,
            },
          },
          { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json('Password Successfully Reset.');
      } catch (error) {
        next(error);
      }
    } else {
      next(errorHandler(401, `Password reset link expired or is invalid.`));
    }
  },
};

export default authController;

const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const userCtrl = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      //nếu người dùng sai email sẽ báo lỗi
      if (!user) {
        return res.status(400).json({ msg: "User does not exists" });
      }
      //nếu người dùng sai password sẽ báo lỗi
      const isWatch = await bcrypt.compare(password, user.password);
      if (!isWatch) {
        return res.status(400).json({ msg: "Incorrect password" });
      }
      const accesstoken = createAccessToken({ id: user._id });
      // res.json({accesstoken})
      const refreshToken = createRefreshToken({ id: user._id });
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });
      res.json({ accesstoken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  register: async (req, res) => {
    try {
      //Lấy giá trị từ ng dùng
      const { name, email, password } = req.body;
      //email là khóa chính
      const user = await Users.findOne({ email });
      //nếu đăng kí có email trước r thì sẽ báo lỗi
      if (user) {
        return res.status(400).json({ msg: "The email already exists" });
      }
      //nếu mật khẩu dưới 6 kí tự sẽ báo lỗi
      if (password.length < 6) {
        return res.status(400).json({ msg: "password is at the 6 char" });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await Users({
        name,
        email,
        password: passwordHash,
      });
      // res.json({newUser})
      await newUser.save();

      const accesstoken = createAccessToken({ id: newUser._id });
      // res.json({accesstoken})
      const refreshToken = createRefreshToken({ id: newUser._id });
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });
      res.json({ accesstoken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: (req, res) => {
    try {
      res.clearCookie("refresh_token", {
        path: "/user/refresh_token",
      });
      return res.status(400).json({ msg: "Logout" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  refreshToken: (req, res) => {
    try {
     const rf_token=req.cookies.refresh_token;
     //neu chua co refresh_token thi chua dang nhap
     if (!rf_token){
        return res.status(400).json({ msg: "Please Login or Register" });
     }
     jsonwebtoken.verify(rf_token,process.env.REFRESH,(err,user)=>{
         if(err){
            return res.status(400).json({ msg: "Please Login or Register" });
         }
         const accesstoken = createAccessToken({ id: user.id });
         res.json({accesstoken})
     })
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
const createAccessToken = (user) => {
  //tạo mới token dựa theo ACCESS và tồn tại 1d :1 day
  return jsonwebtoken.sign(user, process.env.ACCESS, { expiresIn: "1d" });
};
const createRefreshToken = (user) => {
  //tạo mới lại token dựa theo REFRESH và tồn tại 7d :7 day:7 ngay
  return jsonwebtoken.sign(user, process.env.REFRESH, { expiresIn: "7d" });
};
module.exports = userCtrl;

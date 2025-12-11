export default (req, res, next) => {
    if (req.user.role !== "teacher")
      return res.status(403).json({ msg: "Teacher access only" });
  
    next();
  };
  
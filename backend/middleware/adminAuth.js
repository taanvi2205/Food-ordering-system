import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Login to add items to cart" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log("[DEBUG] token decoded:", token_decode); // ✅ Add this
    req.body.userId = token_decode.userId; // ✅ Use userId, not id

    next();
  } catch (error) {
    console.log("[AUTH ERROR] Error:", error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;

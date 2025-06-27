import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "Unauthorized User" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (
      token_decode.admin !== true ||
      token_decode.userId !== 'admin'
    ) {
      return res.json({ success: false, message: 'User not authorized' });
    }

    next();

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
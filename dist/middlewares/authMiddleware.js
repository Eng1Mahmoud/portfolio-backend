import jwt from "jsonwebtoken";
export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Not authorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin") {
            return res.status(403).json({ error: "Admin access required" });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Not authorized" });
    }
};

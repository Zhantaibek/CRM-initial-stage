"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            if (req.user.role !== requiredRole) {
                return res.status(403).json({ error: "Access denied" });
            }
            next();
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Role middleware error", detail: err });
        }
    };
};
exports.roleMiddleware = roleMiddleware;

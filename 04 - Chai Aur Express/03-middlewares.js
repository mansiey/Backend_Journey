//WRITE YOUR ON MIDDLEWARES

const express = require("express");

function block1_middleWares() {
    const app = express();
    app.use(express.json());

    const logs = [];

    //1. Request logger
    app.use((req, res, next) => {
        const logEntry = `${req.method} : ${req.url}`;
        logs.push(logEntry);
        console.log(`LOG : ${logEntry}`);

        next();
    });

    //2. Adding timer:
    app.use((req, res, next) => {
        req.startTime = Date.now();

        res.on("finish", () => {
            const duration = Date.now() - req.startTime;
            console.log(`TIMER : ${req.method}|${req.url} took ${duration}ms`);
        });

        next();
    });

    //3. Authentication middleware
    function authMe(req, res, next) {
        const token = req.headers["x-auth-token"];

        if (!token) {
            return res.status(401).json({ error: "No Token, please Login!" });
        }
        if (token !== "secret-chaicode") {
            return res.status(403).json({ error: "Invalid Token" });
        }

        //if token => extract data from token => userId, email, Role

        req.user = { id: 1, name: "Mansi", Role: "Developer" };

        next();
    }

    //4. Reusable middleware
    function getRole(role) {
        return (req, res, next) => {
            if (!req.user || req.user.role !== role) {
                return res.status(401).json({ error: `Role ${role} required` });
            }
            next();
        };
    }

    //param is array of roles  ==> for multiple roles
    function getRole(roles) {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return res
                    .status(401)
                    .json({
                        error: `one of these roles is required: ${roles.join(", ")}`,
                    });
            }

            //better way to check if the role is present in roles array
            //   allowedRoles.some(
            //     (role) => role.toLowerCase() === userRole.toLowerCase(),
            //   );
            next();
        };
    }


    //5. Ratelimiter => factory method
    function rateLimiter(maxRequest){
        let count = 0;

        return (req, res, next) => {
            count++;
            if(count > maxRequest){
                return res.status(429).json({error: "Too many requests, try after some time!"});
            }

            next();
        }
    }

    const limitedEndpoint = rateLimiter(3);

    //How the middleware is used

    app.get("/profile", authMe, getRole("admin"), (req, res) => { });
    app.get("/profile", authMe, getRole("Teacher"), (req, res) => { });
    app.get("/profile", authMe, getRole("Engineer"), (req, res) => { });
    app.get(
        "/profile",
        authMe,
        getRole(["Engineer", "Dancer"]),
        (req, res) => { },
    );

    app.get('/limited', limitedEndpoint, () => {});
}

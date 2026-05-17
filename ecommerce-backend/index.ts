// index.ts

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



// ==============================
// JWKS CLIENT
// ==============================

const client = jwksClient({
  jwksUri:
     "https://monocloud-ecommerce-demo.in.monocloud.com/.well-known/openid-configuration/jwks",
});

// ==============================
// GET SIGNING KEY
// ==============================

function getKey(header: any, callback: any) {
  client.getSigningKey(header.kid, function (err, key: any) {
    if (err) {
      callback(err, null);
      return;
    }

    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

// ==============================
// JWT VALIDATION MIDDLEWARE
// ==============================

function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1] as string;

  jwt.verify(
    token,
    getKey,
    {
      audience: "https://ecommerce-api",

      issuer:
        "https://monocloud-ecommerce-demo.in.monocloud.com",

      algorithms: ["RS256"],
    },

    (err: any, decoded: any) => {
      if (err) {
        console.log("JWT ERROR:", err);

        return res.status(401).json({
          error: "Invalid token",
        });
      }

      console.log("TOKEN VALIDATED");

      console.log(decoded);

      // OPTIONAL SCOPE CHECK
      if (
        !decoded.scope ||
        !decoded.scope.includes("products:read")
      ) {
        return res.status(403).json({
          error: "Missing scope",
        });
      }

      next();
    }
  );
}

// ==============================
// PROTECTED PRODUCTS ROUTE
// ==============================

app.get(
  "/products",

  validateToken,

  (req: Request, res: Response) => {
    console.log("AUTHORIZED SUCCESS");

    res.json([
      {
        id: 1,
        name: "Gaming Laptop",
        price: "$1200",
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      },
      {
        id: 2,
        name: "Wireless Headphones",
        price: "$199",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      },
      {
        id: 3,
        name: "Smart Phone",
        price: "$899",
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      },
      {
        id: 4,
        name: "Smart Watch",
        price: "$299",
        image:
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      },
      {
        id: 5,
        name: "Mechanical Keyboard",
        price: "$149",
        image:
          "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
      },
      {
        id: 6,
        name: "Gaming Mouse",
        price: "$89",
        image:
          "https://images.unsplash.com/photo-1527814050087-3793815479db",
      },
    ]);
  }
);

// ==============================
// START SERVER
// ==============================

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
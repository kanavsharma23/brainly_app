// src/types/express/index.d.ts
import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: string; // or whatever type you need
  }
}

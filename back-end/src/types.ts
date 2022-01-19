import { EntityManager, MongoEntityManager } from "@mikro-orm/mongodb";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";

export type ContextType = {
  em: EntityManager<any> & MongoEntityManager<any>;
  req: Request;
  userId: string;
  token: string;
  loggedIn: boolean;

  res: Response;
};

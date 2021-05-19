import { EntityManager, MongoEntityManager } from "@mikro-orm/mongodb";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";

export type ContextType = {
  em: EntityManager<any> & MongoEntityManager<any>;
  req: Request & { session: Session & Partial<SessionData> & {userId: string} };
  res: Response;
};
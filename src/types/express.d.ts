declare namespace Express {
  export interface Request {
    user?: {
      _id: string;
      // add more fields if needed
    };
  }
}

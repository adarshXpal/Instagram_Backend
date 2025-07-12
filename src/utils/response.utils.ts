import { Request, Response } from "express";

class ResponseService {
  static success<T>(
    res: Response,
    data: T,
    message: string = "Success",
    statusCode: number = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
    });
  }

  static error(
    res: Response,
    message: string,
    statusCode: number = 400,
    error?: unknown
  ) {
    const response: any = {
      success: false,
      statusCode,
      message,
    };

    if (process.env.NODE_ENV === "development" && error) {
      response.error = error instanceof Error ? error.message : error;
    }

    return res.status(statusCode).json(response);
  }

  static paginate<T>(
    res: Response,
    data: T[],
    meta: { page: number; limit: number; total: number },
    message: string = "Paginated results"
  ) {
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message,
      data,
      meta,
    });
  }
}

export default ResponseService;

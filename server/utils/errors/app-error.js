class AppError extends Error{
  constructor(message , statuscode){
    super(message);
    this.statuscode = statuscode;
    this.explanation = this.explanation;
  }
}

export const appError = AppError;
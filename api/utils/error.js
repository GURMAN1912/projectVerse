//for genrating custom errors
export const errorHandler=(statusCode,message)=>{
    const error=new Error()
    error.statusCode=statusCode;
    error.message;
    return error;
}
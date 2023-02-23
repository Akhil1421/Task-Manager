const functionWrapper = (fn)=>{
    return async(req,res,next)=>{
        try {
            await fn(req,res,next)
        } catch (error) {
            next(error)
        }
    }
}

const errorHandler = (error,req,res,next)=>{
    if(error.status==404){
        return res.status(404).json({error: error.message})
    }
    res.status(500).json({error: 'Something went wrong'})
}

module.exports = {functionWrapper, errorHandler}
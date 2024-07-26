const asyncHandler=(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>{next(err)})
    }
}

export {asyncHandler}


// // so basically it a pice of that that is generally used on routes where
//  database is being connected. since database is being connected, we need to 
//  catch the errors if something goes wrong, so this must be implemented on many 
//  routes, so to simplify it we create a seperate file and export it 

function apiKey(req, res, next) {
    const api_key = '1234567';
    const user_api_key = req.query.api_key;
    // console.log(req.query);
    if( user_api_key && (user_api_key === api_key)){
        next();
    }else{
        res.json({message: 'not allowed'})
    }
}


module.exports = apiKey;
import jwt from "jsonwebtoken";

export const createAccessToken = (userId, res) => { 
    
    //Crear token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    // Mandar el token atraves de una cookie
    res.cookie("jwt_", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "None", // None, Lax o strict
        secure: true
    }); 

    return token;

};
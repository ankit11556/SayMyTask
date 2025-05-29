const sendTokenToCookie = (res,accessToken,refreshToken) =>{
  const isProd = process.env.NODE_ENV === "production";
  const options = {
    httpOnly: true,
    secure: isProd,                           
    sameSite: "lax",
    path: "/"
  };

  res.cookie("access_token",accessToken,{
    ...options,
    maxAge: parseInt(process.env.JWT_ACCESS_EXPIRY_MS)|| 15*60*1000
  });

  res.cookie("refresh_token",refreshToken,{
    ...options,
    maxAge: parseInt(process.env.JWT_REFRESH_EXPIRY_MS)|| 7*24*60*60*1000
  })
}

module.exports = sendTokenToCookie
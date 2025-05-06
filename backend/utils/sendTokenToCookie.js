const sendTokenToCookie = (res,accessToken,refreshToken) =>{
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  };

  res.cookie("access_token",accessToken,{
    ...options,
    maxAge: 15*60*1000
  });

  res.cookie("refresh_token",refreshToken,{
    ...options,
    maxAge: 7*24*60*60*1000
  })
}

module.exports = sendTokenToCookie
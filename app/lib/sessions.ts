import { createCookieSessionStorage } from "remix";

let { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "auth_cookie",
      expires: new Date(Date.now() + 604800), 
      httpOnly: true,
      maxAge: 604800,
      path: "/",
      sameSite: "lax",
      secrets: ["WIfkzbQjXMO3LicBhfDu5HqbnAE=", "7AGqGLf5k/QTjDIQjD/uCojXTRY="],
      secure: true
    }
  });

export { getSession, commitSession, destroySession };
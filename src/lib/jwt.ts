import jwt from "jsonwebtoken";
export default class JWT {
  static generateToken(data: { username: string; password: string }): string {
    return jwt.sign(data, process.env.PRIVATE_KEY as string, {
      expiresIn: "1h",
      algorithm: "HS256",
    });
  }
  static verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY as string);
      return decoded;
    } catch (error) {
      console.log("Error verify token:", error);
      return null;
    }
  }
}

const jwt = require('jsonwebtoken');

export class JWTHelper {
  public options: JWTissuer;
  
  constructor() {
    this.options = { issuer: process.env.JWT_ISSUER };
  }

  /**
   * @description Signs a JWT
   * @param {LoginPayload} payload - the user login response.
   * @access public
   * @returns - the signed JWT object.
   */
  public sign(payload: LoginPayload) {
    return jwt.sign(payload, process.env.JWT_SECRET, this.options);
  }

  /**
   * @description Verifies a JWT
   * @param {string} token - the JWT.
   * @access public
   * @returns - the verified JWT object.
   */
  public verify(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET, this.options);
  }
}

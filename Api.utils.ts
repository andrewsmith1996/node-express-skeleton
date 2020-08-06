import axios, { AxiosResponse } from 'axios';
import { ApiResponse } from '../models/api/generic-responses/ApiResponse.model';
import { isBlank } from './General.utils';
import { CONFIG } from '../enums/config.enum';
import { JWTHelper } from '../models/jwt/JWTHelper.model';
import { ERRORS } from '../enums/errors.enum';

export interface APIData {
  status: number,
  data: any;
}

export class APIUtils {

  /**
   * Returns whether the .ENV file config has loaded properly or not.
   * if unsuccessful then don't do ANY API operations, as they'll fail without config.
   * @memberof APIUtils
   * @access private
   * @returns {boolean}
   */
  private static configLoaded() : boolean {
    return !isBlank(process.env.USERNAME) && !isBlank(process.env.PASSWORD)
  }

  /**
   * Generic GET method, takes a generic type T and maps the response to this type.
   * @param {string} url the URL we'll be calling
   * @memberof APIUtils
   * @access public
   * @returns {T} the return data, mapped to the type T.
   */
  public static async get<T>(url: string): Promise<APIData> { 
    if(!this.configLoaded()) return { status: 403, data: null } as APIData;
    const response: AxiosResponse = await axios.get(url, { auth: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD
    }});
    return { status: response.status, data: response.data as T } as APIData;
  }

  /**
   * Generic POST method, takes a generic type T and maps the response to this type.
   * @param {string} url the URL we'll be posting to
   * @param {U} body the REQUEST body we'll be using.
   * @memberof APIUtils
   * @access public
   * @returns {T} the RESPONSE body return data, mapped to the type T.
   */
  public static async post<U, T>(url: string, body: U): Promise<APIData> { 
    if(!this.configLoaded()) return { status: 403, data: null } as APIData;
    const response: AxiosResponse = await axios.post(url, body, { auth: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD
    }});
    return { status: response.status, data: response.data as T } as APIData;
  }

  /**
   * Generic PUT method, takes a generic type T and maps the response to this type.
   * @param {string} url the URL we'll be 'putting' to
   * @param {U} body the post body we'll be using.
   * @memberof APIUtils
   * @access public
   * @returns {T} the return data, mapped to the type T.
   */
  public static async put<U, T>(url: string, body: U): Promise<APIData> { 
    if(!this.configLoaded()) return { status: 403, data: null } as APIData;
    const response: AxiosResponse = await axios.put(url, body, { auth: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD
    }
    });

    return { status: response.status, data: response.data as T } as APIData;
  }

  /**
   * Validates a JWT token
   * @memberof APIUtils
   * @access public
   * @returns {void}
   */
  public static validateToken(req, res, next) : void {
    const authorizationHeader = req.headers.authorization;    
    if (authorizationHeader) {
      const token: string = authorizationHeader.split(' ')[1];
      try {
        const JWT: JWTHelper = new JWTHelper();
        req.decoded = JWT.verify(token);
        next(); // Call next to pass execution to the NEXT middleware.
      } catch (err) {
        res.status(401).send(new ApiResponse(null, 'Invalid Authentication error', 1));
      }
    } else res.status(401).send(new ApiResponse(null, 'Invalid Authentication error', 1));
  }

  public static getPage(req) : number {
    return isBlank(req.query.page) || req.query.page <= 0 ? 1 : req.query.page;
  }

  public static validateFields(requestFields: object, fields: string[]) : { valid: boolean, message: string } {
    let missingFields = [];
    for (const fieldName of fields) if(!requestFields.hasOwnProperty(fieldName)) missingFields.push(fieldName);
    if (missingFields.length === 0) return { valid: true, message: "" };
    else return { valid: false, message: `${ERRORS.MISSING_PARAMETER.MESSAGE}: ${missingFields.join(', ')}`};
  }
}

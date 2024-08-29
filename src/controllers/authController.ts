import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import joiValidate from "../utils/joiValidation";
import { registerSchema } from "../validationSchema/authValidation";
/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *       required:
 *         - username
 *         - email
 *         - password
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 */

export const register = async (req: Request, res: Response) => {
  try {
    const validationResult = joiValidate(req, registerSchema);
    if (validationResult.error) {
      return res.status(400).json({ errors: validationResult.details }); // Return field-specific errors
    }
    const { username, email, password } = req.body;
    const user = await registerUser(username, email, password);
    res
      .status(201)
      .json({ status: true, data: user, message: "Signup Sucess" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    res
      .status(200)
      .json({ status: true, data: { token, user }, message: "Login Sucess" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

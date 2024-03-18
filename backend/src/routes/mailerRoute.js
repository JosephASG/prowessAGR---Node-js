import express from 'express';
import * from "../helpers/mailer.js"; 
router.post('/send', mailer.sendEmail);

module.exports = router;



import * as tokencontroller from "../middleware/verifyToken.js";
import express from 'express';

const authRoute = express.Router();
//Retornar Datos de Token
authRoute.get('/',tokencontroller.getUserDataFromToken);

export default authRoute;

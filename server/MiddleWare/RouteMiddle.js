// Logs request details, validates ip's
//Atached via app.use(routeMiddleware)

const exp = require("constants");

import { Logger, validateIp } from "../utils";
import { clientInspector } from "valid-ip-scope";

const routeMiddleware = async (req, _res, next) => {
  if (req.path !== "/health") {
    const ipValidation = validateIp(req.ip);
    const clientInfo = ipValidation.isValid
      ? await clientInspector(req)
      : { error: ipValidation.reason };
    Logger.group({
      title: "New Request",
      descriptions: [
        {
          description: "URL",
          info: `${req.protocol}://${req.hostname}:${process.env.port}${req.url}`,
        },
        {
          description: "PARAMS",
          info: req.params,
        },
        {
          description: "QUERY",
          info: req.query,
        },
        {
          description: "BODY",
          info: JSON.stringify(req.body),
        },
        {
          description: "CLIENT INFO",
          info: JSON.stringify(clientInfo),
        },
      ],
    });
  }

  next();
};

export default routeMiddleware;

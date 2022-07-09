import ResponseModel from "../app/ResponseModel.js";

export default function notFoundRouteHandlingMiddleware(req, res, next) {
  res.status(404).json(new ResponseModel("Route not found", 404));
}

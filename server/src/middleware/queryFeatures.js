// server/src/middleware/queryFeatures.js

export default function queryFeatures(
  req,
  res,
  next
) {
  const page = Math.max(
    parseInt(req.query.page || "1", 10),
    1
  );

  const limit = Math.min(
    Math.max(
      parseInt(req.query.limit || "20", 10),
      1
    ),
    100
  );

  const skip = (page - 1) * limit;

  const sortBy = req.query.sortBy || "createdAt";

  const order =
    req.query.order === "asc"
      ? 1
      : -1;

  const search = (
    req.query.search || ""
  ).trim();

  req.queryOptions = {
    page,
    limit,
    skip,
    search,
    sort: {
      [sortBy]: order
    }
  };

  next();
}

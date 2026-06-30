// server/src/utils/paginatedResponse.js

export function paginatedResponse({
  data,
  total,
  page,
  limit,
  message = "Success"
}) {
  const totalPages =
    total === 0
      ? 0
      : Math.ceil(total / limit);

  return {
    success: true,

    message,

    data,

    pagination: {
      totalRecords: total,
      totalPages,
      currentPage: page,
      pageSize: limit,

      hasPrevious:
        page > 1,

      hasNext:
        page < totalPages
    },

    timestamp:
      new Date().toISOString()
  };
}

export function successResponse(
  data = null,
  message = "Success"
) {
  return {
    success: true,
    message,
    data,
    timestamp:
      new Date().toISOString()
  };
}

export function errorResponse(
  message,
  code,
  errors = []
) {
  return {
    success: false,
    code,
    message,
    errors,
    timestamp:
      new Date().toISOString()
  };
}

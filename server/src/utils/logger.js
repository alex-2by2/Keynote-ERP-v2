export function logInfo(message, meta = {}) {
  console.log(
    JSON.stringify({
      level: "info",
      timestamp: new Date().toISOString(),
      message,
      ...meta
    })
  );
}

export function logError(message, meta = {}) {
  console.error(
    JSON.stringify({
      level: "error",
      timestamp: new Date().toISOString(),
      message,
      ...meta
    })
  );
}

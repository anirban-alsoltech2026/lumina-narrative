import { createRequestHandler } from "@tanstack/react-start/server";

export default createRequestHandler(async (request) => {
  const handler = await import("@tanstack/react-start/server-entry").then(
    (m) => m.default ?? m,
  );
  return handler(request);
});

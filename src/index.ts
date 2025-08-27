import APIRoutes from "@infrastructure/routes/api_routes.js";
import HTTPServerAdapter from "./infrastructure/adapters/http_server.js";

const server = HTTPServerAdapter.init();

server.get("/", async (req) => {
  return {
    status: 200,
    body: "Hello, World!",
  };
});

const routes = new APIRoutes(server)
routes.setup();


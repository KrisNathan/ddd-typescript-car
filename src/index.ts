import OpenAPIRoutes from "@infrastructure/routes/openapi_routes.js";
import HTTPServerAdapter from "./infrastructure/adapters/http_server.js";

const server = HTTPServerAdapter.init();

server.getApp().get("/", async (c) => {
  return c.json({
    message: "Welcome to Car Sales API!",
    docs: "Visit /doc for OpenAPI documentation",
    ui: "Visit /ui for Swagger UI"
  });
});

const routes = new OpenAPIRoutes(server)
routes.setup();


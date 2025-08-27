import { serve } from "@hono/node-server";
import { Hono } from "hono";

enum HTTPStatus {
  OK = 200,
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500,
}

export interface HTTPResponse {
  status: HTTPStatus;
  body: any;
}

export interface HTTPRequest {
  method: string;
  path: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  params: Record<string, string>;
  body?: unknown;
}

export type HTTPHandler = (req: HTTPRequest) => Promise<HTTPResponse> | HTTPResponse;

export default class HTTPServerAdapter {
  constructor(private app: Hono) { }
  static init() {
    const app = new Hono();

    return new HTTPServerAdapter(app);
  }

  get(path: string, handler: HTTPHandler) {
    this.app.get(path, async (c) => {
      const req: HTTPRequest = {
        method: c.req.method,
        path: c.req.path,
        headers: c.req.header(),
        query: c.req.query(),
        params: c.req.param(),
        body: await c.req.json().catch(() => null),
      }
      const res = await handler(req);
      return c.json(res.body, res.status);
    });
  }
  post(path: string, handler: HTTPHandler) {
    this.app.post(path, async (c) => {
      const req: HTTPRequest = {
        method: c.req.method,
        path: c.req.path,
        headers: c.req.header(),
        query: c.req.query(),
        params: c.req.param(),
        body: await c.req.json().catch(() => null),
      }
      const res = await handler(req);
      return c.json(res.body, res.status);
    });
  }

  route(path: string, node: HTTPServerAdapter) {
    this.app.route(path, node.app);
  }

  listen(port: number, callback?: () => void) {
    serve({
      fetch: this.app.fetch,
      port
    }, callback);
  }
}
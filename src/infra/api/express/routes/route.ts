import { Request, Response } from "express";

export type HttpMethod = 'GET' | 'POST';

export const HttpMethod = {
    GET: "GET" as HttpMethod,
    POST: "POST" as HttpMethod,
} as const;

export interface Route {
    getHandler(): (request: Request, response: Response) => Promise<void>;
    getPath(): string;
    getMethod(): HttpMethod;
}
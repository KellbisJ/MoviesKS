import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { LanguagesInterface } from "./types";
import { endpointVerifier } from "../../utils/endpointVerifier";
import { customReqMediaDataUtil } from "../../utils/customReqMediaDataUtil";

dotenv.config();

const ConfigurationsAPI = express.Router();
const api_key: string | undefined = process.env.API_KEY;
const FETCH_TIMEOUT_MS = 10000;

const configurationsRoutes: Array<{ path: string }> = [
  { path: "configuration/languages" },
  { path: "configuration/primary_translations" },
];

const getAddons = async (req: Request, res: Response, pathToGet: string) => {
  const currentPath = req.originalUrl;
  let api_url: string = "";

  api_url = endpointVerifier(currentPath, pathToGet, api_key);

  try {
    const response = await customReqMediaDataUtil(api_url, FETCH_TIMEOUT_MS);

    if (!response.ok) {
      let statusMessage = "Unknown error";
      try {
        const errorData = await response.json();
        statusMessage =
          (errorData as { status_message?: string }).status_message ||
          statusMessage;
      } catch {
        // Ignore JSON parse errors on error responses
      }

      res.status(response.status).json({
        message: `Error: ${statusMessage}`,
        error: `HTTP ${response.status} ${response.statusText}`,
      });
      return;
    }

    const { data }: { data: LanguagesInterface[] | string[] } =
      await response.json();
    res.json(data);
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === "AbortError";
    const errorMessage = isTimeout
      ? "Request timed out"
      : error instanceof Error
        ? error.message
        : "An unexpected error occurred";

    res.status(isTimeout ? 504 : 500).json({
      message: isTimeout
        ? "Request timed out"
        : "No response received from the server",
      error: errorMessage,
    });
  }
};

configurationsRoutes.forEach(({ path }) => {
  ConfigurationsAPI.get(`/${path}`, (req: Request, res: Response) => {
    getAddons(req, res, path);
  });
});

export { ConfigurationsAPI };

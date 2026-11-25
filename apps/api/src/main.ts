import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const cookieParser = require("cookie-parser");
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
      contentSecurityPolicy: false,
    }),
  );

  app.use(cookieParser(process.env.COOKIE_SECRET || "dev-cookie-secret-change-me"));

  const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
  app.enableCors({
    origin: corsOrigin.split(",").map((o) => o.trim()),
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
  });

  app.setGlobalPrefix("api");

  const port = Number(process.env.API_PORT || 4000);
  await app.listen(port);
  logger.log(`VLEARNIN API listening on http://localhost:${port}/api`);
}

bootstrap();

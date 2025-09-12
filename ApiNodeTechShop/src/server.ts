import { env } from "./config/env";
import { app } from "./app";
import {
  startEmailVerificationConsumer,
  startForgotPasswordConsumer,
  startResertPasswordConsumer,
} from "./messages/consumers/auth.consumers";
import { startCreateStoreRequest } from "./messages/consumers/store.consumers";

const dataEnv = env();

async function bootstrap() {
  await startEmailVerificationConsumer();
  await startForgotPasswordConsumer();
  await startResertPasswordConsumer();
  await startCreateStoreRequest();

  await app.listen(dataEnv.port, () => {
    console.log("servido rodando!!!");
  });
}
bootstrap();
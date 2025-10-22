import { env } from "./config/env";
import { app } from "./app";
import {
  startEmailVerificationConsumer,
  startForgotPasswordConsumer,
  startResertPasswordConsumer,
} from "./messages/consumers/auth.consumers";
import { startCreateStoreRequest } from "./messages/consumers/store.consumers";
import { startOrderCreateConsumer } from "./messages/consumers/orders.consumers";
import { startPaymentsCreateConsumer } from "./messages/consumers/payments.consumers";
import { startAllJobs } from "./database/jobs";
import { startCreateProductRequest } from "./messages/consumers/product.consumers";

const dataEnv = env();

startAllJobs();

async function bootstrap() {
  await startEmailVerificationConsumer();
  await startForgotPasswordConsumer();
  await startResertPasswordConsumer();
  await startCreateStoreRequest();
  await startOrderCreateConsumer();
  await startPaymentsCreateConsumer();
  await startCreateProductRequest()

  app.listen(dataEnv.port, () => {
    console.log("servido rodando!!!");
  });
}
bootstrap();

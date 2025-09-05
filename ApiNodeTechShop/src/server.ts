import { env } from "./config/env";
import { app } from "./app";
import { startEmailVerificationConsumer } from "./messages/consumers/auth.consumers";

const dataEnv = env();

async function bootstrap() {

  await startEmailVerificationConsumer();

  await app.listen(dataEnv.port, () => {
    console.log("servido rodando!!!");
  });
}
bootstrap();

import authenticationRouter from "./auth/index.js";
import userRouter from "./user/index.js";
import artistRouter from "./artist/index.js";
import albumRouter from "./album/index.js";
import trackRouter from "./track/index.js";
import favoriteRouter from "./favorite/index.js";
export function registerApps(apiRouter) {
  apiRouter.use("/", authenticationRouter);
  apiRouter.use("/users", userRouter);
  apiRouter.use("/artists", artistRouter);
  apiRouter.use("/tracks", trackRouter);
  apiRouter.use("/albums", albumRouter);
  apiRouter.use("/favorites", favoriteRouter);
}

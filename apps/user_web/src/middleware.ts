import withLocale from "./_middlewares/withLocale";
import { chainMiddlewares } from "./_middlewares/chain";

export default chainMiddlewares([withLocale]);

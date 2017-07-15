import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

Reactotron
  .configure()
  .use(reactotronRedux())
  .connect();

export function devStore(r, m) {
  return Reactotron.createStore(r, m);
}

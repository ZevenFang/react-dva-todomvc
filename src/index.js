import './index.html';
import './index.less';
import 'todomvc-app-css/index.css';
import dva from 'dva';
import todo from './models/todo';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use();

// 3. Model
app.model(todo);

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

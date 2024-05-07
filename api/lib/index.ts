
import DataController from './controllers/data.controller';
import App from './app';
import IndexController from './controllers/index.controller';
import DataService from "./modules/services/data.service";
import UserController from './controllers/user.controller';


const dataService = new DataService();
const app: App = new App([
    new UserController(),
    new DataController(),
    new IndexController()
]);

app.listen();

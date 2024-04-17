
import DataController from './controllers/data.controller';
import App from './app';
import IndexController from './controllers/index.controller';
import DataService from "./modules/services/data.service";


const dataService = new DataService();
const app: App = new App([
    new DataController(),
    new IndexController()
]);

app.listen();

import { checkIdParam } from "../middlewares/deviceIdParam.middleware";
import Controller from "../interfaces/controller.interface";
import { Request, Response, NextFunction, Router } from 'express';
import DataService from "../modules/services/data.service";
import Joi from "joi";

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();
    public dataService = new DataService;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
        this.router.post(`${this.path}/:id`, checkIdParam, this.addData);
        this.router.get(`${this.path}/:id/latest`, checkIdParam, this.getPeriodData);
        this.router.get(`${this.path}/:id`, checkIdParam, this.getAllDeviceData);
        this.router.get(`${this.path}/:id/:num`, checkIdParam, this.getPeriodData);
        this.router.delete(`${this.path}/all`, this.cleanAllDevices);
        this.router.delete(`${this.path}/:id`, checkIdParam, this.cleanDeviceData);
    }

    private getLatestReadingsFromAllDevices = async (request: Request, response: Response, next: NextFunction) => {
        const newestData = await this.dataService.getAllNewset();
        response.status(200).json(newestData);
    }

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { air } = request.body;
        const { id } = request.params;

        const schema = Joi.object({
            air: Joi.array()
                .items(
                    Joi.object({
                        id: Joi.number().integer().positive().required(),
                        value: Joi.number().positive().required()
                    })
                )
                .unique((a, b) => a.id === b.id),
            deviceId: Joi.number().integer().positive().valid(parseInt(id, 10)).required()
         });

        const data = {
            temperature: parseInt(air[0].value),
            pressure: parseInt(air[1].value),
            humidity: parseInt(air[2].value),
            deviceId: parseInt(id)
        }

        try {
            await this.dataService.createData(data);
            response.status(200).json(data);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Invalid input data.' });
        }
    };

    private getPeriodData = async (request: Request, response: Response, next: NextFunction) => {
        const { id, num } = request.params;

        try {
            if (num) {
                const data = await this.dataService.query(id);
                const startIndex = Math.max(0, data.length - Number(num));
                const endIndex = Math.min(data.length, startIndex + Number(num));
                const array = data.slice(startIndex, endIndex);
                response.status(200).json(array);
            } else {
                const latestEntry = await this.dataService.get(id);
                response.status(200).json(latestEntry);
            }
        } catch (error) {
            console.error(`Error occurred while fetching data: ${error}`);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    };

    private getAllDeviceData = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.query(id);
        response.status(200).json(allData);
    };

    private cleanAllDevices = async (request: Request, response: Response, next: NextFunction) => {
        try {
            await this.dataService.deleteData("all");
            response.status(200).json({ message: 'All devices data deleted successfully.' });
        } catch (error) {
            console.error(`Error occurred while cleaning all devices data: ${error}`);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    };

    private cleanDeviceData = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;

        try {
            await this.dataService.deleteData(id);
            response.status(200).json({ message: `Data for device with ID ${id} deleted successfully.` });
        } catch (error) {
            console.error(`Error occurred while cleaning data for device with ID ${id}: ${error}`);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    };
 }

 export default DataController;

import { Api } from "../api";
import express, { Express } from 'express';
import { Route } from "./routes/route";

export class ApiExpress implements Api {

    private app: Express;

    private constructor(routes: Route[]) {
        this.app = express();
        this.app.use(express.json());
        this.addRoutes(routes);
    }

    public static create(routes: Route[]) {
        return new ApiExpress(routes);
    }

    private addRoutes(routes: Route[]) {
        routes.forEach(route => {
            const path = route.getPath();
            const method = route.getMethod().toLowerCase();
            const handler = route.getHandler();

            console.log(`Registrando rota: [${method.toUpperCase()}] ${path}`);
            (this.app as any)[method](path, handler)
        });
    }

    public start(port: number) {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`); 
            this.listRoutes();  
        });
    }

    private listRoutes() {
        const appAny = this.app as any;
        if (!appAny._router || !appAny._router.stack) {
            console.log('Nenhuma rota registrada.');
            return;
        }
        const routes = appAny._router.stack
            .filter((route: any) => route.route)
            .map((route: any) => {
                return {
                    path: route.route.path,
                    method: route.route.stack[0].method
                }
            });

        console.log(routes);      
    }
}
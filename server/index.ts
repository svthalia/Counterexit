import express, { Request, Response } from "express";
import next from "next";
import * as socketio from 'socket.io';

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
    try {
        await app.prepare();
        const server = express();
        const io: socketio.Server = new socketio.Server();
        // @ts-ignore
        io.attach(server);

        io.on('connection', (socket: socketio.Socket) => {
            console.log('connection');
            socket.emit('status', 'Hello from Socket.io');

            socket.on('disconnect', () => {
                console.log('client disconnected');
            })
        });

        server.all("*", (req: Request, res: Response) => {
            return handle(req, res);
        });
        server.listen(port, (err?: any) => {
            if (err) throw err;
            console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
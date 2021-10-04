const {Server} = require('socket.io')


export const startWebServer = (server) => {
    const s = Server(server, {
        cors: {
            origin: '*',
        }});
    
        io.on('connection', function (socket) {
            console.log("a user connected!");
        });

}
import Server from "./server";

const server = Server();
const instance = server.listen(80, () => {
    console.log("Server is live!");
});

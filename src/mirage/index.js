import { createServer } from "miragejs";

export default function () {
  let arr = [{ id: "1", text: "hello" }];
  let users = [{ name: "Hina", age: "18" }];

  createServer({
    routes() {
      this.namespace = "/fakeapi";
      this.get("/getTodos", { todos: arr });
      this.get("/getUsers", { users });

      this.post("/addTodos", (_, req) => {
        console.log("req", req);
        arr.push(req.requestBody);
      });
    },
  });
}

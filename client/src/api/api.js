import axios from "axios";

let url;

if (process.env.NODE_ENV === "production") {
  url = "api";
}
if (process.env.NODE_ENV === "development") {
  url = "http://localhost:8080/api";
}

export default axios.create({
  baseURL: url,
});

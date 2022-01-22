import axios from "axios";

let url;

if (process.env.NODE_ENV === "production") {
  url = "https://bankmahmood.herokuapp.com/api";
}
if (process.env.NODE_ENV === "development") {
  url = "http://localhost:8080/api";
}

export default axios.create({
  baseURL: url,
});

import bcrypt from "bcryptjs";
const users = [
 {
  name : "Admin User", 
  email : "admin@admin.com", 
  password : bcrypt.hashSync("admin"),
  isAdmin : true
 }, 
 {
  name : "John Doe", 
  email : "john@email.com", 
  password : bcrypt.hashSync("admin"),
  isAdmin : false
 }, 
 {
  name : "Jane Doe", 
  email : "jane@email.com", 
  password : bcrypt.hashSync("admin"),
  isAdmin : false
 } 
]
export default users
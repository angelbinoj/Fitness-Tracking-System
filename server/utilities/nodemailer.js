import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();


export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  
});

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

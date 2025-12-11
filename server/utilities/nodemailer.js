import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: { 
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  }
});

console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Loaded" : "Missing");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

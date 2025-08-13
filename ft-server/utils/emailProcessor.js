import nodemailer from "nodemailer";

//send email
export const processEmail = async (obj) => {
  //create a transporter
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Team Financial Tracker" <${process.env.EMAIL_USER}>`,
      ...obj,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
};

//create email body

export const sendEmailVerificationTemplate = async ({ to, url, userName }) => {
  const obj = {
    to,
    subject: "Email Verification",
    text: `Please verify your email by copy and peasting the link to your browser. ${url}`,
    html: `<h1>Welcome ${userName}</h1>
             <br />
    <br /> <br />
    <br />
              
               <a href="${url}" target="_blank" style="background: green; color: white; padding: 2rem; border-radius: 10px">Verify Email</a>
                  <br />
    <br />
    <br />
    <p>Thank you for registering with us!</p>
    <p>Best regards,</p>
    <p>Team Financial Tracker</p>`,
  };

  await processEmail(obj);
};

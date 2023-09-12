const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
// const { sendEmail } = require("./services/email.service");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);
mongoose.connect("mongodb://localhost:27017/health-for-seniors", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());
const port = 3000;
const adminEmail = "admin@gmail.com";
const adminPassword = "admin@123";
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.post("/schedule-email", async (req, res) => {
  try {
    const scheduleEmail = await ScheduledEmail.create({
      scheduledTime: req.body.scheduledTime,
      recepients: req.body.recepients,
      emailText: req.body.emailText,
      subject: req.body.subject,
    });
    res.send(scheduleEmail);
  } catch (error) {
    res.send(error);
  }
});

app.get("/schedule-email", async (req, res) => {
  try {
    const scheduleEmail = await ScheduledEmail.find();
    await scheduleEmails();

    res.send(scheduleEmail);
  } catch (error) {
    res.send(error);
  }
});

app.post("/send-email", async (req, res) => {
  const msg = {
    to: req.body.recepients,
    from: "marketing@healthforseniors.us",
    subject: req.body.subject,
    html: req.body.emailText,
  };
  sgMail
    .send(msg)
    .then(async () => {
      const now = new Date();

      // Get the current hour (0-23)
      const currentHour = now.getHours();

      // Get the current minutes (0-59)
      const currentMinutes = now.getMinutes();
      await ScheduledEmail.create({
        scheduledTime: `${currentHour}:${currentMinutes}`,
        recepients: req.body.recepients,
        emailText: req.body.emailText,
        subject: req.body.subject,
        status: "sent",
      });
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
  res.send("email sent!");
});

exports.sendEmail = async (event, context) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    const requestBody = JSON.parse(event.body);

    const msg = {
      to: requestBody.recipients,
      from: process.env.SENDER_EMAIL,
      ...(requestBody?.scheduledTime && {
        send_at: requestBody?.scheduledTime,
      }),
      subject: requestBody.subject,
      html: requestBody.emailText,
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};

exports.login = async (event, context) => {
  try {
    const requestBody = JSON.parse(event.body);
    if (
      requestBody.email === process.env.ADMIN_EMAIL &&
      requestBody.password === process.env.ADMIN_PASSWORD
    ) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Logged in" }),
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid email or password" }),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
// exports.getEmailHistory = async (event, context) => {
//   try {
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//     const queryParams = {
//       query: 'from_email="marketing@healthforseniors.us"',
//     };

//     const request = {
//       url: `/v3/messages`,
//       method: "GET",
//       qs: queryParams,
//     };

//     const response = await sgMail.request(request);

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ data: response }),
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ message: "Internal Server Error" }),
//     };
//   }
// };

// app.get("/getEmailHistory", async (req, res) => {
//   console.log("called");
//   const queryParams = {
//     query: 'from_email="marketing@healthforseniors.us"',
//   };

//   const request = {
//     url: `/v3/messages`,
//     method: "GET",
//     qs: queryParams,
//   };

//   const response = await sgMail.request(request);
//   res.send(response);
// });

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if the provided email and password match the admin credentials
  if (email === adminEmail && password === adminPassword) {
    // Successful login
    res.json({ message: "Login successful" });
  } else {
    // Invalid credentials
    res.status(401).json({ message: "Invalid email or password" });
  }
});

const ScheduledEmail = mongoose.model("ScheduledEmail", {
  scheduledTime: { type: String, required: true },
  recepients: [String],
  subject: String,
  emailText: String,
  status: { type: String, default: "pending" },
});

const scheduleEmails = async () => {
  try {
    console.log("Starting email scheduling...");

    // Find all the scheduled email documents
    const scheduledEmails = await ScheduledEmail.find();

    scheduledEmails.forEach((scheduledEmail) => {
      if (scheduledEmail && scheduledEmail.scheduledTime) {
        const cronExpression = `0 ${
          scheduledEmail.scheduledTime.split(":")[1]
        } ${scheduledEmail.scheduledTime.split(":")[0]} * * *`;
        console.log(`Scheduling email with cron expression: ${cronExpression}`);

        cron.schedule(cronExpression, () => {
          console.log(`Executing cron job for email: ${scheduledEmail._id}`);

          const email = {
            to: scheduledEmail.recepients,
            from: "marketing@healthforseniors.us",
            subject: scheduledEmail.subject,
            html: scheduledEmail.emailText,
          };
          if (scheduledEmail.status === "pending") {
            sgMail
              .send(email)
              .then(async () => {
                console.log(
                  `Scheduled Email sent at ${scheduledEmail.scheduledTime}`
                );
                await ScheduledEmail.findByIdAndUpdate(
                  {
                    _id: scheduledEmail._id,
                  },
                  { status: "sent" },
                  { new: true }
                );
              })
              .catch((error) => {
                console.error("Error sending scheduled email:", error);
              });
          }
        });
      }
    });

    console.log("Email scheduling complete.");
  } catch (error) {
    console.error("Error scheduling emails:", error);
  }
};

// Start scheduling the emails
scheduleEmails();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

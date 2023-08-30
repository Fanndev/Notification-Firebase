// with redis
// const admin = require('firebase-admin');
// const { initializeApp } = require("firebase-admin/app");
// const express = require('express');
// const cors = require('cors');
// const Redis = require('ioredis');

// const app = express();
// const port = 3000;
// app.use(express.json());

// app.use(
//   cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
//   })
// );

// app.use(function(req, res, next) {
//   res.setHeader('Content-Type', 'application/json');
//   next();
// });

// // Firebase initialization
// const serviceAccount = require("./psychic-medley-354310-firebase-adminsdk-3i9cs-106fcd6742.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   projectId: 'potion-for-creators',
// });
// const messaging = admin.messaging();

// // Redis initialization
// const redis = new Redis(); // Assumes Redis server is running on default host and port

// // Queue processing function
// async function processQueue() {
//   while (true) {
//     const token = await redis.lpop('notification_queue');
//     if (!token) {
//       break;
//     }

//     const message = {
//       notification: {
//         title: 'Notif',
//         body: 'This is a Test Notification',
//       },
//       token: token,
//     };

//     try {
//       const response = await messaging.send(message);
//       console.log('Successfully sent message:', response);
//     } catch (error) {
//       console.log('Error sending message:', error);
//     }
//   }
// }

// app.post('/send', async function(req, res) {
//   const receivedToken = req.body.fcmToken;
  
//   // Push token to the Redis queue
//   await redis.rpush('notification_queue', receivedToken);
  
//   res.status(200).json({
//     message: 'Message added to the queue',
//     token: receivedToken,
//   });
// });

// // Start processing the queue
// processQueue();

// app.listen(port, () => {
//   console.log('Server started on port 3000');
// });

// no redis
// const admin = require('firebase-admin');
// // const serviceAccount = require('./path/to/serviceAccountKey.json'); // Ganti dengan path yang sesuai
// const { initializeApp,applicationDefault } = require("firebase-admin/app");

// process.env.GOOGLE_APPLICATION_CREDENTIALS

// const serviceAccount = require("./psychic-medley-354310-firebase-adminsdk-3i9cs-106fcd6742.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   projectId: 'potion-for-creators',
// });

// const messaging = admin.messaging();
// const express = require('express');
// const cors = require('cors');

// const app = express();
// const port = 3000;
// app.use(express.json());

// app.use(
//   cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
//   })
// );

// app.use(function(req, res, next) {
//   res.setHeader('Content-Type', 'application/json');
//   next();
// });

// app.post('/send', function(req, res) {
//   const receivedToken = req.body.fcmToken;

//   const message = {
//     notification: {
//       title: 'Notif',
//       body: 'This is a Test Notification',
//     },
//     token: 'AAAA3dYMsTY:APA91bHCtvtywzKH8lH0vOK_7w77PoJXjqeXEGPdqI0SxZ_l5ST-c-AxV7FJTQaAalqP5hyalow8uGKli7YzkcqimuYv4sgt-thbP3wiLlA5eoNtxA1B6eEtZ0Gdh15N2gKCLx_StNtF ' // Ganti dengan token FCM yang sesuai
//   };

  

//   messaging
//     .send(message)
//     .then((response) => {
//       res.status(200).json({
//         message: 'Successfully sent message',
//         token: receivedToken,
//       });
//       console.log('Successfully sent message:', response);
//     })
//     .catch((error) => {
//       res.status(400).send(error);
//       console.log('Error sending message:', error);
//     });
// });

// app.listen(port, () => {
//   console.log('Server started on port 3000');
// });
// with redis
const admin = require('firebase-admin');
const { initializeApp } = require("firebase-admin/app");
const express = require('express');
const cors = require('cors');
const Redis = require('ioredis');

const app = express();
const port = 3000;
app.use(express.json());

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  })
);

app.use(function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Firebase initialization
const serviceAccount = require("./psychic-medley-354310-firebase-adminsdk-3i9cs-106fcd6742.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'potion-for-creators',
});
const messaging = admin.messaging();

// Redis initialization
const redis = new Redis(); // Assumes Redis server is running on default host and port

// Queue processing function
async function processQueue() {
  while (true) {
    const token = await redis.lpop('notification_queue');
    if (!token) {
      break;
    }

    const message = {
      notification: {
        title: 'Notif',
        body: 'This is a Test Notification',
      },
      token: token,
    };

    try {
      const response = await messaging.send(message);
      console.log('Successfully sent message:', response);
    } catch (error) {
      console.log('Error sending message:', error);
    }
  }
}

app.post('/send', async function(req, res) {
  const receivedToken = req.body.fcmToken;
  
  // Push token to the Redis queue
  await redis.rpush('notification_queue', receivedToken);
  
  res.status(200).json({
    message: 'Message added to the queue',
    token: receivedToken,
  });
});

// Start processing the queue
processQueue();

app.listen(port, () => {
  console.log('Server started on port 3000');
});

const express = require('express')
const FCM = require('fcm-node')
const SERVER_KEY = 'AAAA3dYMsTY:APA91bHCtvtywzKH8lH0vOK_7w77PoJXjqeXEGPdqI0SxZ_l5ST-c-AxV7FJTQaAalqP5hyalow8uGKli7YzkcqimuYv4sgt-thbP3wiLlA5eoNtxA1B6eEtZ0Gdh15N2gKCLx_StNtF '

const app = express();

const port = 3000;

app.listen(port, () => {
  console.log('Listening port 3000')
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Fcm 
app.post('/fcm', async(req, res, next) => {
  try {
      let fcm = new FCM(SERVER_KEY); 

      let message = {
        to : '/topics/' + req.body.topic,
        notification : {
          title : req.body.title,
          body : req.body.body,
          sound : 'default',
          "click_action" : "FCM_PLUGIN_ACTIVITY",
          "icon" : "fcm_icon_push"
        },
        data : req.body.data
      }

      fcm.send(message, (err, response) => {
        if (err) {
          next(err)
        }
        else {
          res.json(response)
        }
      })

  } catch (error) {
    
  }
})
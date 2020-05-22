const accountSid = 'AC8be00d7de4d63af2c9d80dff1ec98687';
const authToken = '6d4df65f83afb5c5e7149625b29b6340';
const client = require('twilio')(accountSid, authToken);

function sendSMS() {
  client.messages
    .create({
      body: 'Test SMS',
      from: '+12513206747',
      to: '+79779191527',
    })
    .then((message) => console.log(message.sid));
}

sendSMS();

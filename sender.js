const accountSid = 'AC8be00d7de4d63af2c9d80dff1ec98687';
const authToken = '6d4df65f83afb5c5e7149625b29b6340';
const senderPhone = '+12513206747';
const client = require('twilio')(accountSid, authToken);

async function sendSMS(cur, user, order) {
  await client.messages.create({
    body: `Доставьте заказ из ${order.title} по адресу ${user.address}. Клиент ${user.name}, телефон для связи с клиентом ${user.phone}`,
    from: senderPhone,
    to: `+${cur.phone}`,
  });
  await client.messages.create({
    body: `Ваш заказ из ${order.title} будет доставлен курьером ${cur.name}, номер для связи с курьером +${cur.phone}. Приятного аппетита!`,
    from: senderPhone,
    to: `+${user.phone}`,
  });
}

module.exports = { sendSMS };

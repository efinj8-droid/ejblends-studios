import twilio from 'twilio';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { clientName, serviceName, date, time, clientPhone } = req.body;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
  const barberNumber = process.env.BARBER_PHONE_NUMBER;

  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body: `💈 NEW BOOKING! ${clientName} booked ${serviceName} on ${date} at ${time}. Client Phone: ${clientPhone}`,
      from: twilioNumber,
      to: barberNumber,
    });

    return res.status(200).json({ success: true, sid: message.sid });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
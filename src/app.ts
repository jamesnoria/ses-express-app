import express from 'express';
import { RequestHandler } from 'express';
import sendEmail from './sendEmail';
import { json } from 'body-parser';

const app = express();

app.use(json());
app.use(express.urlencoded({ extended: true }));

const email: RequestHandler = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(401).json({
      message: 'pon tu correo pe causita, colabora...',
    });
  }

  try {
    const sender = new sendEmail();
    await sender.SendEmailInstance(email);

    res.status(200).json({
      message: `Un correito ha sido enviado a: ${email}`,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const simpleWelcome: RequestHandler = (req, res) => {
  res.send('<h1>Hello BROOO</h1>');
};

app.get('/', simpleWelcome);
app.post('/email', email);

export default app;

import express from 'express';
import { RequestHandler } from 'express';
import { json } from 'body-parser';

const app = express();

app.use(json());
app.use(express.urlencoded({ extended: true }));

const sendEmail: RequestHandler = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(401).json({
      message: 'pon tu correo pe causita, colabora...',
    });
  }

  res.status(200).json({
    message: `Tu correo es ${email}`,
  });
};

app.post('/email', sendEmail);

export default app;
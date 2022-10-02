import { AWSError, SES, config } from 'aws-sdk';
import { SendEmailRequest, SendEmailResponse } from 'aws-sdk/clients/ses';

config.update({ region: 'us-east-1' });
const sesClient = new SES();

class sendEmail {
  SendEmailInstance = (to_email: string) => {
    const params: SendEmailRequest = {
      Destination: {
        ToAddresses: [`${to_email}`],
      },
      Message: {
        Body: {
          Html: {
            Data: '<p>Hola, agradable sujeto, este correo se te envio porque funciona lo que estaba haciendo</p>',
          },
        },
        Subject: {
          Data: 'mensaje de prueba',
        },
      },
      Source: 'Copstone <noreply@copstone.net>',
      ReplyToAddresses: ['jnoria.dev@gmail.com'],
    };

    const sender = sesClient.sendEmail(params).promise();

    sender
      .then((data: SendEmailResponse) => {
        console.log(`Email sent to: ${to_email} | ${JSON.stringify(data)}`);
      })
      .catch((err: AWSError) => {
        console.error(err, err.stack);
      });

    return sender;
  };
}

export default sendEmail;

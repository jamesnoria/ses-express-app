"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
aws_sdk_1.config.update({ region: 'us-east-1' });
const sesClient = new aws_sdk_1.SES();
class SendEmail {
    constructor() {
        this.sendEmailInstance = (to_email) => {
            const params = {
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
                .then((data) => {
                console.log(`Email sent to: ${to_email} | ${JSON.stringify(data)}`);
            })
                .catch((err) => {
                console.error(err, err.stack);
            });
            return sender;
        };
    }
}
exports.default = SendEmail;

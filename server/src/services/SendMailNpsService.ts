import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import { resolve } from 'path';
import fs from 'fs';


class SendMailNpsService {
  private client: Transporter

  constructor() {
    nodemailer.createTestAccount()
      .then(account => {
        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          }
        });

        this.client = transporter;
      });
  }

  async execute(from: string, subject: string, variables: Object, path: string){
    const templateFileContent = fs.readFileSync(path).toString("utf8");

    const mailTemplateParse = handlebars.compile(templateFileContent)

    const html = mailTemplateParse(variables)

    // Message object
    const message = {
      from,
      subject,
      html,
      to: 'NPS <noraplay@nps.com.br>',
    };

    const mailInfo = await this.client.sendMail(message);

    console.log('Message sent: %s', mailInfo.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mailInfo));

  }
}

export default new SendMailNpsService;
let nodemailer = require('nodemailer');

// @flow
import * as mysql from 'mysql';
import { connection } from './connect';

import { lang, en, no } from '../util/lang';


class MailService {


  HashCode(str: string) {
    let hash = 0;
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }


  resetPassword(forgotPassEmail:string){
    let newPassword = Math.random().toString(36).slice(-8);
    let newPasswordHashed = this.HashCode(newPassword);
    let mailtext = lang.emailtext + newPassword;
    connection.query('UPDATE users SET password = ? WHERE mail = ? ', [newPasswordHashed, forgotPassEmail] , function(error,result,fields) {
      if(error) throw error;

    });
    mailService.newMail(forgotPassEmail, mailtext);
  }


  newMail(forgotPassEmail:string, mailtext:string) {
    // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'noreplycrusis27@gmail.com', // generated ethereal user
              pass: 'lOrrO9HI' // generated ethereal password
          }
      });

      // setup email data with unicode symbols
      let mailOptions = {
          from: 'noreplycrusis27', // sender address
          to: forgotPassEmail, // list of receivers
          subject: lang.emailsubject, // Subject line
          text: mailtext, // plain text body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });
  });
}
}

 let mailService = new MailService();

 export { mailService };

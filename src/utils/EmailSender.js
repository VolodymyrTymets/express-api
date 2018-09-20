const _ = require('lodash');
const { config } = require('../../config');
const path = require('path');
const jade = require('jade');
const nodemailer = require('nodemailer');
const logger = require('../../logger');

/**
 * Send email for users
 *
 * Provides rendering email templates ana sending emails for users
 *
 * Example of usage
 *
 * new EmailSender('your subject', 'template_name', res, {}).
 *       sendFor(['email1', 'email2'], err => ...);
 *
 * @constructor
 *
 * @param {String}
 * @param {String} name of template for rendering from private/templates
 * @param {Object} data for template
 * @param {Object} res from api
 */
class EmailSender {
  constructor(subject, templateName, templateDate) {
    this._subject = subject;
    this._templateName = templateName;
    this._templateDate = templateDate;
    this._transporter = nodemailer.createTransport(config.mailer);
    this._sendEmail = this._sendEmail.bind(this);
  }
  /**
   * Send Email
   *
   * @private
   * @param {String}
   * @param {Function}
   */
  _sendEmail(recipient, callback) {
    const fileName = path.resolve(__dirname, '../../views', `./${this._templateName}.jade`);

    const html = jade.renderFile(fileName, {
      subject: this._subject,
      otherProperty: this._templateDate,
    });
    const mailData = {
      html,
      from: config.mailer.auth.user,
      to: recipient,
      subject: this._subject,
    };
    this._transporter.sendMail(mailData, (error) => {
      if(!error) {
        logger.info(`EmailSender [${this._templateName}]`, { error });
      }
      callback();
    });
  }
  /**
   * Send email for email addresses
   *
   * @param [Object] email addresses
   */
  sendFor(recipients, callback) {
    const emails = _.isArray(recipients) ? recipients : [recipients];
    emails.forEach(email => this._sendEmail(email, callback));
  }

  static hrefFor(req, localPath, data, asParams) {
    const protocol = process.env.NODE_ENV === 'production' ? 'http' : req.protocol;
    const rootUrl = `${protocol}://${req.get('host')}`;
    const domainPath = rootUrl.slice(-1) === '/' && rootUrl || `${rootUrl}/`;
    const dataToPath = !asParams ? key => `/${data[key]}/` : key => `?${key}=${data[key]};`;
    const datePath = data ? Object.keys(data).map(dataToPath).join('') : '';

    return `${domainPath}${localPath}${datePath}`;
  }
}

module.exports = EmailSender;

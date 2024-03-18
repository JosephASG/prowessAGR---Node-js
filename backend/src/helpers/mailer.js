const nodemailer = require("nodemailer");

// Configuración de Nodemailer con Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "nexfonec123@gmail.com",
    clientId:
      "967394478850-ho3clgo567dcu24dculqkvnn3jmcn9ed.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken:
      "1//04jsejwseBkRKCgYIARAAGAQSNwF-L9IrQ18nhteoUtRahExriiF9M7NQHzGuSBRpU_a3c9FYq1ivqiTkP_bzBZedEtj174rT3CQ",
  },
});

exports.sendContactEmail = (email, subject, htmlContent, callback) => {
  const mailOptions = {
    from: "nexfonec123@gmail.com",
    to: email,
    subject: subject,
    html: htmlContent, // Usar html en lugar de text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar email:", error);
      return callback(error, null);
    }
    callback(null, info);
  });
};



exports.sendEmail = (email, subject, htmlContent, callback) => {
  const mailOptions = {
    from: "nexfonec123@gmail.com",
    to: email,
    subject: subject,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar email:", error);
      return callback(error, null);
    }
    callback(null, info);
  });
};

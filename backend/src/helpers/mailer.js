import nodemailer from 'nodemailer';

// Configuración de Nodemailer con Gmail y OAuth2
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'prowessagricola@gmail.com',
    clientId: '275335756273-qodt6g7h7fnb5svdmpjjcmolv92ku061.apps.googleusercontent.com',
    clientSecret: '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',
    refreshToken: '1//04xTrwvyds2vQCgYIARAAGAQSNwF-L9Ir7F1lPatHncv1JAENKRjJa-pELSTxorO32UfGNJgM95nJWaLOoFlZ9wEjwJ8guMpQH7A',
    accessToken: 'ya29.a0Ad52N38uRgwj5-1RNle8zb-jW1Dxu1fDKhsoN-DHI0YBs-0ainMwmeUuoI9dEv9EYwDtL5puwBWFX1oM1GYZ7-b66GpjkdNu3Xq_8D3sftHahiiviaDR49XhhKXacKN9hKXhSjaAFMrfKVj2a0Ph-Dg18kK5ObjhaxIgaCgYKAegSARMSFQHGX2MiPTGptHqQgGlmrmA2mAJ8Ew0171',
  },
  tls: {
    rejectUnauthorized: false
  }
});



const sendEmail = (email, subject, htmlContent, callback) => {
  const mailOptions = {
    from: "prowessagricola@gmail.com",
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


export {sendEmail};

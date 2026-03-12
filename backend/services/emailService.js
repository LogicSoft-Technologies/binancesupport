import { Resend } from "resend";
import { logEmail } from "../utils/emailLogger.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendCompanyEmail = async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const year = new Date().getFullYear();

  const html = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${subject}</title>
  <style type="text/css">
    body, html { margin:0!important;padding:0!important;width:100%!important;background-color:#f0f0f0!important; }
    * { -ms-text-size-adjust:100%;-webkit-text-size-adjust:100%; }
    table { border-collapse:collapse!important;mso-table-lspace:0pt;mso-table-rspace:0pt; }
    a { text-decoration:none; }
    @media screen and (max-width:600px) {
      .email-wrapper { width:100%!important; }
      .email-content { padding:32px 20px!important; }
      .email-header  { padding:28px 20px!important; }
      .email-footer  { padding:28px 20px!important; }
      .message-box   { padding:20px!important; }
      .h1 { font-size:22px!important;line-height:30px!important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f0f0f0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;color:#f0f0f0;line-height:1px;">
    ${subject} — Binance Support &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color:#f0f0f0;padding:40px 16px;">
    <tr>
      <td align="center">
        <table class="email-wrapper" role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;width:100%;background:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <tr>
            <td class="email-header" align="center" style="background-color:#0b0e11;padding:36px 40px 32px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 18px auto;">
                <tr>
                  <td align="center">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="width:8px;"></td>
                        <td align="center"><div style="width:14px;height:14px;background-color:#FCD535;transform:rotate(45deg);display:inline-block;margin-bottom:-8px;"></div></td>
                        <td style="width:8px;"></td>
                      </tr>
                      <tr>
                        <td align="center"><div style="width:14px;height:14px;background-color:#FCD535;transform:rotate(45deg);display:inline-block;"></div></td>
                        <td style="width:6px;"></td>
                        <td align="center"><div style="width:14px;height:14px;background-color:#FCD535;transform:rotate(45deg);display:inline-block;"></div></td>
                      </tr>
                      <tr>
                        <td style="width:8px;"></td>
                        <td align="center"><div style="width:22px;height:22px;background-color:#FCD535;transform:rotate(45deg);display:inline-block;margin-top:-8px;"></div></td>
                        <td style="width:8px;"></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-family:'Arial Black','Helvetica Neue',Arial,sans-serif;font-size:26px;font-weight:900;letter-spacing:3px;color:#FCD535;line-height:1;">BINANCE</p>
              <p style="margin:6px 0 0 0;font-size:11px;font-weight:500;letter-spacing:2px;color:rgba(255,255,255,0.35);text-transform:uppercase;">Support Center</p>
            </td>
          </tr>

          <tr><td style="background-color:#FCD535;height:3px;font-size:0;line-height:0;">&nbsp;</td></tr>

          <tr>
            <td class="email-content" style="padding:48px 40px 40px 40px;background-color:#ffffff;">
              <p style="margin:0 0 8px 0;font-size:13px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#848e9c;">Message from Support</p>
              <h1 class="h1" style="margin:0 0 28px 0;font-size:26px;font-weight:700;line-height:34px;color:#1e2329;letter-spacing:-0.3px;">${subject}</h1>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="height:1px;background-color:#eaecef;font-size:0;line-height:0;padding-bottom:28px;">&nbsp;</td></tr>
              </table>
              <div class="message-box" style="background-color:#fafafa;border:1px solid #eaecef;border-radius:4px;padding:28px;margin-bottom:28px;">
                <p style="margin:0;font-size:15px;line-height:26px;color:#474d57;white-space:pre-line;word-break:break-word;">${message.replace(/\n/g, '<br/>')}</p>
              </div>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background-color:#FCD535;border-radius:4px;">
                    <a href="mailto:${process.env.EMAIL_REPLY_TO}" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:700;color:#1e2329;letter-spacing:0.3px;text-decoration:none;">Reply to this message →</a>
                  </td>
                </tr>
              </table>
              <div style="background-color:#fffdf0;border:1px solid #f0d080;border-left:4px solid #FCD535;border-radius:4px;padding:16px 20px;">
                <p style="margin:0 0 4px 0;font-size:12px;font-weight:700;color:#b7791f;text-transform:uppercase;letter-spacing:0.8px;">🔒 Security Notice</p>
                <p style="margin:0;font-size:12.5px;line-height:20px;color:#92400e;">Binance will never ask for your password, private keys, or seed phrase. If you did not expect this email, please ignore it or contact our support team.</p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background-color:#f8f9fa;border-top:1px solid #eaecef;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:24px 40px 16px 40px;">
                    <a href="#" style="font-size:12px;color:#848e9c;text-decoration:none;margin:0 12px;">Help Center</a>
                    <span style="color:#d9d9d9;">|</span>
                    <a href="#" style="font-size:12px;color:#848e9c;text-decoration:none;margin:0 12px;">Privacy Policy</a>
                    <span style="color:#d9d9d9;">|</span>
                    <a href="#" style="font-size:12px;color:#848e9c;text-decoration:none;margin:0 12px;">Terms of Service</a>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="email-footer" align="center" style="padding:0 40px 32px 40px;">
                    <p style="margin:0 0 6px 0;font-size:12px;color:#b7bdc6;line-height:20px;">© ${year} Binance Support. All rights reserved.</p>
                    <p style="margin:0 0 6px 0;font-size:12px;color:#b7bdc6;line-height:20px;">You received this email because you have an active inquiry with Binance Support.</p>
                    <p style="margin:0;font-size:12px;color:#b7bdc6;line-height:20px;">Reply to: <a href="mailto:${process.env.EMAIL_REPLY_TO}" style="color:#848e9c;text-decoration:underline;">${process.env.EMAIL_REPLY_TO}</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color:#0b0e11;padding:16px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);letter-spacing:1px;">BINANCE · SUPPORT CENTER</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

  try {
    await resend.emails.send({
      from: "Binance Support <onboarding@resend.dev>",
      to,
      subject,
      replyTo: process.env.EMAIL_REPLY_TO,
      html,
    });

    logEmail({ to, subject, status: "SENT" });
    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error.message);
    logEmail({ to, subject, status: "FAILED" });
    res.status(500).json({ error: "Email failed", detail: error.message });
  }
};
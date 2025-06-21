// @ts-nocheck
import { Resend } from 'resend';

export const sendContactEmail = async ({
	name,
	email,
	subject,
	message,
	company,
}) => {
	const resend = new Resend(process.env.RESEND_API_KEY);

	const adminHtml = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
      <h2 style="color: #2c5282;">New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      <p><strong>Subject:</strong> ${subject}</p>
      <p style="white-space: pre-wrap;"><strong>Message:</strong><br/>${message}</p>
    </div>
  `;

	const autoReplyHtml = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: auto; background: #f8f5f2; padding: 24px; border-radius: 8px;">
      <h2>Thank you for reaching out to Blueberry Dairy!</h2>
      <p>Hi <strong>${name}</strong>, we’ve received your message and will get back to you shortly.</p>
      <p><strong>Your Message:</strong><br/>${message}</p>
      <p style="margin-top: 24px; font-size: 14px; color: #666;">
        With gratitude,<br/>
        <strong>Blueberry Dairy</strong><br/>
        <em>Local. Regenerative. Real.</em>
      </p>
    </div>
  `;

	try {
		const adminResponse = await resend.emails.send({
			from: 'Blueberry Dairy <contact@blueberrydairy.com>',
			to: process.env.ADMIN_EMAIL,
			reply_to: email,
			subject: `Contact Form: ${subject}`,
			html: adminHtml,
		});

		const userResponse = await resend.emails.send({
			from: 'Blueberry Dairy <contact@blueberrydairy.com>',
			to: email,
			subject: 'We’ve received your message',
			html: autoReplyHtml,
		});

		console.log(`📧 Contact email sent to admin and customer`);
		return { adminResponse, userResponse };
	} catch (error) {
		console.error('❌ Failed to send contact emails:', error);
		throw new Error(error.message);
	}
};

// @ts-nocheck
import dotenv from 'dotenv';
dotenv.config();
import { Resend } from 'resend';

/**
 * Sends an order confirmation email.
 * @param {Object} options
 * @param {string} options.to - Recipient email address.
 * @param {string} options.subject - Email subject.
 * @param {string} options.name - Customer's name.
 * @param {Array}  options.cartItems - Items in the order.
 * @param {string} options.pickupName - Person picking up the order.
 * @param {string} options.pickupLocation - Location selected.
 * @param {string} options.pickupTime - Date/time selected.
 * @param {boolean} [options.isAdminCopy=false] - If true, formats message for internal use.
 */
export const sendOrderConfirmationEmail = async ({
	to,
	subject,
	name,
	cartItems = [],
	pickupName,
	pickupLocation,
	pickupTime,
	isAdminCopy = false,
}) => {
	const resend = new Resend(process.env.RESEND_API_KEY);
	try {
		const html = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
        <h2 style="color: #2c5282;">${isAdminCopy ? 'New Order Received' : 'Thank You for Your Order!'}</h2>
        
        <p>${
					isAdminCopy
						? `A new order has been placed by <strong>${name}</strong>.`
						: `Hi <strong>${name}</strong>, thank you for placing your order with Blueberry Dairy!`
				}</p>
        
        <h3>Pickup Details</h3>
        <ul>
          <li><strong>Pickup Name:</strong> ${pickupName}</li>
          <li><strong>Location:</strong> ${pickupLocation}</li>
          <li><strong>Time:</strong> ${pickupTime}</li>
        </ul>

        <h3>Items</h3>
        <ul>
          ${
						Array.isArray(cartItems) && cartItems.length > 0
							? cartItems
									.map(
										(item) =>
											`<li>${item.quantity || 1} × ${item.name} — $${Number(item.price).toFixed(2)}</li>`
									)
									.join('')
							: '<li>No items listed.</li>'
					}
        </ul>

        ${!isAdminCopy ? `<p>We’ll see you soon! If you have questions, reply to this email.</p>` : ''}

        <p style="margin-top: 2rem; font-size: 0.9em; color: #666;">
          ${isAdminCopy ? 'Internal Notification' : 'Blueberry Dairy'}
        </p>
      </div>
    `;

		const response = await resend.emails.send({
			from: 'Blueberry Dairy <orders@blueberrydairy.com>',

			to,
			subject,
			html,
		});

		console.log(`📧 Email sent to ${to}:`, response);
		return response;
	} catch (error) {
		console.error(`❌ Failed to send email to ${to}:`, error);
		throw new Error(`Email failed: ${error.message}`);
	}
};

//Send password reset email
// @ts-nocheck

const resend = new Resend(process.env.RESEND_API_KEY);

// Send password reset email
export const sendPasswordResetEmail = async ({ to, name, resetURL }) => {
	try {
		const subject = 'Reset Your Password - Blueberry Dairy';
		const htmlContent = `
			<div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
				<h2>Hello ${name},</h2>
				<p>You requested a password reset for your Blueberry Dairy account.</p>
				<p>
					Click the button below to reset your password:
				</p>
				<p style="text-align: center; margin: 24px 0;">
					<a href="${resetURL}" style="padding: 12px 24px; background-color: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">
						Reset Password
					</a>
				</p>
				<p>If the button doesn't work, copy and paste this link into your browser:</p>
				<p style="word-break: break-all;">${resetURL}</p>
				<hr />
				<p style="font-size: 0.9em; color: #555;">
					If you did not request this, you can safely ignore this email.
				</p>
			</div>
		`;

		await resend.emails.send({
			from: 'Blueberry Dairy <noreply@blueberrydairy.com>',
			to,
			subject,
			html: htmlContent,
		});

		console.log(`✅ Password reset email sent to ${to}`);
	} catch (error) {
		console.error('❌ Failed to send password reset email:', error.message);
		throw new Error('Email sending failed');
	}
};

/**
 * Sends a contact form submission to the admin email.
 * @param {Object} options
 * @param {string} options.name - Full name of the sender.
 * @param {string} options.email - Sender's email address.
 * @param {string} options.subject - Subject of the message.
 * @param {string} options.message - Message content.
 * @param {string} [options.company] - Optional company name.
 */
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
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    </div>
  `;

const autoReplyHtml = `
  <div style="font-family: 'Georgia', serif; max-width: 600px; margin: auto; color: #3d3d3d; background: #f8f5f2; border: 1px solid #ddd; padding: 24px; border-radius: 8px;">
    <h2 style="color: #2e4a28; font-size: 26px;">Thank you for reaching out to Blueberry Dairy!</h2>

    <p style="font-size: 16px; line-height: 1.6;">
      Hi <strong>${name}</strong>,
    </p>

    <p style="font-size: 16px; line-height: 1.6;">
      We’ve received your message and will get back to you shortly.
    </p>

    <p style="font-size: 16px; line-height: 1.6;">Here’s a copy of your submission:</p>

    <div style="background: #fff; padding: 16px; border: 1px solid #ccc; border-radius: 6px; margin-top: 12px;">
      <p><strong>Subject:</strong> ${subject}</p>
      <p style="white-space: pre-wrap;"><strong>Message:</strong><br/>${message}</p>
    </div>

    <p style="font-size: 15px; line-height: 1.6; margin-top: 20px;">
      In the meantime, feel free to explore our <a href="https://blueberrydairy.com/products" style="color: #4f46e5; text-decoration: none;">products</a> or learn more <a href="https://blueberrydairy.com/our-farm" style="color: #4f46e5; text-decoration: none;">about our farm</a>.
    </p>

    <p style="margin-top: 24px; font-size: 14px; color: #666;">
      With gratitude,<br/>
      <strong>Blueberry Dairy</strong><br/>
      <em>Local. Regenerative. Real.</em>
    </p>
  </div>
`;


	try {
		// Send to admin
		const adminResponse = await resend.emails.send({
			from: 'Blueberry Dairy <contact@blueberrydairy.com>',
			to: process.env.ADMIN_EMAIL,
			reply_to: email,
			subject: `Contact Form: ${subject}`,
			html: adminHtml,
		});
		console.log(`📧 Contact email sent to admin:`, adminResponse);

		// Auto-reply to sender
		const userResponse = await resend.emails.send({
			from: 'Blueberry Dairy <contact@blueberrydairy.com>',
			to: email,
			subject: 'We’ve received your message',
			html: autoReplyHtml,
		});
		console.log(`📧 Auto-reply sent to customer:`, userResponse);

		return { adminResponse, userResponse };
	} catch (error) {
		console.error('❌ Failed to send contact emails:', error);
		throw new Error(`Failed to send contact emails: ${error.message}`);
	}
};

// @ts-nocheck
import { Resend } from 'resend';

export const sendPasswordResetEmail = async ({ to, name, resetURL }) => {
	const resend = new Resend(process.env.RESEND_API_KEY);

	try {
		const subject = 'Reset Your Password - Blueberry Dairy';
		const html = `
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
			html,
		});

		console.log(`✅ Password reset email sent to ${to}`);
	} catch (error) {
		console.error('❌ Failed to send password reset email:', error.message);
		throw new Error('Email sending failed');
	}
};

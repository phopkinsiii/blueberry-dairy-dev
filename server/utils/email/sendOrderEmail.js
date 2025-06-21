// @ts-nocheck
import { Resend } from 'resend';

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

		console.log(`📧 Order email sent to ${to}`);
		return response;
	} catch (error) {
		console.error(`❌ Failed to send order email:`, error);
		throw new Error(error.message);
	}
};

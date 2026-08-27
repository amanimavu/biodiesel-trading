import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { env } from "cloudflare:workers";

export const server = {
    contact: defineAction({
        accept: "form",
        input: z.object({
            name: z.string().min(1, "Name is required"),
            company: z.string().optional(),
            email: z.email("Enter a valid email"),
            phone: z.string().optional(),
            message: z.string().min(1, "Message is required"),
        }),
        handler: async (input) => {
            const {
                RESEND_API_KEY: apiKey,
                CONTACT_RECIPIENTS: recipients,
                CONTACT_CC: cc,
                CONTACT_FROM_ADDRESS: fromAddress,
            } = env;

            if (!apiKey || !recipients || !fromAddress) {
                throw new ActionError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Email service is not configured.",
                });
            }

            const html = `
        <p><strong>Name:</strong> ${input.name}</p>
        ${input.company ? `<p><strong>Company:</strong> ${input.company}</p>` : ""}
        <p><strong>Email:</strong> ${input.email}</p>
        ${input.phone ? `<p><strong>Phone:</strong> ${input.phone}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${input.message.replace(/\n/g, "<br />")}</p>
      `;

            const resendRes = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: fromAddress,
                    to: recipients,
                    cc,
                    reply_to: input.email,
                    subject: `New contact form submission from ${input.name}`,
                    html,
                }),
            });
            console.log(resendRes);

            if (!resendRes.ok) {
                throw new ActionError({
                    code: "BAD_GATEWAY",
                    message: "Failed to send message.",
                });
            }

            return { success: true };
        },
    }),
};

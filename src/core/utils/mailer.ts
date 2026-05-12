import { Resend } from 'resend';
import { env } from '@config/env';

const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${env.CLIENT_URL}/verify?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Подтвердите email',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px;">
        <h2 style="color: #3d6b45; margin-bottom: 16px;">Подтвердите email</h2>
        <p style="color: #5c5248; line-height: 1.6; margin-bottom: 28px;">
          Для завершения регистрации нажмите кнопку ниже.
          Ссылка действительна 24 часа.
        </p>
        
          href="${verificationUrl}"
          style="
            display: inline-block;
            padding: 14px 28px;
            background: #3d6b45;
            color: white;
            border-radius: 999px;
            text-decoration: none;
            font-weight: 600;
            font-size: 15px;
          "
        >
          Подтвердить email
        </a>
        <p style="color: #8c8078; font-size: 13px; margin-top: 28px;">
          Если вы не регистрировались — просто проигнорируйте это письмо.
        </p>
      </div>
    `,
  });
};
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PASS,
    },
});

export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ error: "Correo no encontrado" });

        const token = crypto.randomBytes(32).toString("hex");
        const expiration = new Date(Date.now() + 3600000); // 1 hora

        await prisma.user.update({
            where: { email },
            data: {
                resetToken: token,
                resetTokenExp: expiration,
            },
        });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        await transporter.sendMail({
            from: `"Soporte App" <${process.env.ETHEREAL_USER}>`,
            to: email,
            subject: "Recuperación de contraseña",
            html: `
                <h2>Recupera tu contraseña</h2>
                <p>Haz clic en el siguiente enlace para restablecerla:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>Este enlace expirará en 1 hora.</p>
            `,
        });

        res.json({ message: "Correo enviado con instrucciones" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al enviar el correo" });
    }
};

export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const user = await User.findOne({
            where: {
                resetToken: token,
                resetTokenExp: { [Op.gt]: Date.now() }
            }
        });

        if (!user) return res.status(400).json({ error: "Token inválido o expirado" });

        user.password = newPassword;
        user.resetToken = null;
        user.resetTokenExp = null;

        await user.save();

        res.json({ message: "Contraseña restablecida correctamente" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al restablecer la contraseña" });
    }
};



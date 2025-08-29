import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !phone || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Semua field harus diisi" }),
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TARGET,
      subject: `Pesan baru dari ${name}`,
      text: `
        Nama: ${name}
        Email: ${email}
        No HP: ${phone}
        Pesan: ${message}
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Email berhasil dikirim" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: "Gagal mengirim email" }),
      { status: 500 }
    );
  }
}

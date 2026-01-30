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
      host: "mail.sujocustomart.com", // ganti sesuai hosting
      port: 465, // biasanya 465 (SSL) atau 587 (TLS)
      secure: true, // true kalau pakai 465, false kalau pakai 587
      auth: {
        user: process.env.EMAIL_USER, // contoh: no-reply@sujocustomart.com
        pass: process.env.EMAIL_PASS, // password email hosting
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

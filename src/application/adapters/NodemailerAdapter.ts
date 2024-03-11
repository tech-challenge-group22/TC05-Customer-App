import nodemailer from "nodemailer";

export default class NodemailerAdapter {
	private service: string;
    private host: string;
    private port: number;
    private secure: boolean;
    private auth: {
        user: string;
        pass: string
    }

	constructor() {
        this.service = "Gmail";
        this.host = "smtp.gmail.com";
        this.port = Number(process.env.NODEMAILER_PORT);
        this.secure = true;
        this.auth = {
            user: `${process.env.NODEMAILER_USER}`,
            pass: `${process.env.NODEMAILER_PASS}`,
        }
	}

	async execute(params: { to: string; text: string }): Promise<any> {
		try {
			const transporter = nodemailer.createTransport({
				service: this.service,
                host: this.host,
                port: this.port,
                secure: this.secure,
				auth: this.auth,
			});

			// send mail with defined transport object
			const info = await transporter.sendMail({
				from: '"Grupo 22" <g22fiap@gmail.com>',
				to: params.to,
				subject: "Status do Pedido",
				html: `<b>${params.text}</b>`,
			});

			console.log("Message sent: %s", info.messageId);
			return info;
		} catch (error) {
			console.log(error);
		}
	}
}

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'barberAplikacje@gmail.com',
        pass: 'barber99?'
    }
})

class barberActions {
    reservationMail(req, res) {
        const {user, date} = req.body
        const mailOptions = {
            from: 'barberAplikacje@gmail.com',
            to: user.email,
            subject: "Rezerwacja Barber",
            text: "Witaj " + user.name + "\nPragniemy potwierdzić Twoją rezerwację w naszym salonie.\n\nSzczegóły: " +
                "\nBarber: " + date.employee + "\nTermin wizyty: " + date.date + " " + date.hour +
                "\nJeżeli pomyliłeś się w wyborze terminu/usługi, lub twoje plany ulegną zmianie i nie będziesz mógł nas odwiedzić, prosimy o anulowanie rezerwacji." +
                "\n\n\nWiadomość została wygenerowana automatycznie. Nie odpowiadaj na nią."
        }
        transporter.sendMail(mailOptions,function (error,info){
            if (error){
                res.send("Something is wrong").status(400)
            }else{
                res.send("Mail sent").status(200)
            }
        })
    }
}

module.exports = new barberActions()
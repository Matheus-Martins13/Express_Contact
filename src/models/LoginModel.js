const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body,
            this.errors = [],
            this.user = null
    }

    async login() {
        this.validateLogin();
        if (this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });

        if (!this.user) {
            this.errors.push('O usuário não existe.');
            return;
        }
        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.user = null;
            this.errors.push('Senha inválida.');
            return;
        }
    }

    async register() {
        this.validateRegister();
        if (this.errors.length > 0) return;

        await this.userExists();
        if (this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
    }

    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        if (this.user) this.errors.push('O usuário já existe.');
    }

    validateRegister() {
        if (!this.checkPassword()) return;
        this.clearUp();

        // email válido 
        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');

        // password válido
        if (this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
        }
    }

    validateLogin() {
        this.clearUp();
        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');
    }

    checkPassword() {
        if (this.body.password !== this.body.password2) {
            this.errors.push('As senhas não são iguais.');
            return false;
        } else {
            return true;
        }
    }

    clearUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] == '';
            }
        }

        this.body = {
            firstName: this.body.firstName,
            lastName: this.body.lastName,
            email: this.body.email,
            password: this.body.password,
        }
    }
}

module.exports = Login;

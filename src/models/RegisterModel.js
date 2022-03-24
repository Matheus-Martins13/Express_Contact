const mongoose = require('mongoose');
const validator = require('validator');

const RegisterSchema = new mongoose.Schema({
    email: { type: String, required: true },
    senha: { type: String, required: true },
});

const RegisterModel = mongoose.model('Register', RegisterSchema);

class Register {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    falar(){
        return this.body.email.length;
    }

    register() {
        this.valida();
        if(this.errors.length > 0) return;
    }

    valida() {
        this.cleanUp();
        // Validação
        // O e-mail precisa ser válido
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
        // A senha precisa ter entre 3 e 50 caracteres
        if(this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
        }
    }

    cleanUp() {
        for(let key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }
}

module.exports = Register;
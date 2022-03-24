const mongoose = require('mongoose');
const validator = require('validator');

const RegisterSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: {type: String, required: true}
})

const RegisterModel = mongoose.model('Register', RegisterSchema);

class Register {
    constructor(body) {
        this.body = body, 
        this.errors = [],
        this.user = null
    }

    async register(){

        this.validate();
        if(this.errors.length > 0) return;

        try {
            this.user = RegisterModel.create(this.body);
        } catch(err) {
            console.log(err);
        }
    }

    validate(){
        this.clearUp();

        // email válido 
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');

        // password válido
        if(this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
        }
    }

    clearUp() {
        for(let key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] == '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password,
        }
    }
}

module.exports = Register;

import { AppModule } from './../../../app.module';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Form } from '../../../shared/interfaces/forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  formContact: FormGroup;
  alert = '';
  alertTlf = '';
  constructor(private myData: AppModule) {
    this.formContact = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(7)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      reason: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(12),
      ]),
      message: new FormControl(),
    });
  }

  ngOnInit(): void {}
  async saveData() {
    const form: Form = {
      name: this.formContact.value.name,
      email: this.formContact.value.email,
      reason: this.formContact.value.reason,
      message: this.formContact.value.message,
    };
    if (this.formContact.invalid)
      this.alert =
        '*Revisa los campos que llenaste. Los campos marcados con * son obligatorios';
    if (
      this.formContact.get('reason')?.errors?.['required'] ||
      this.formContact.get('reason')?.errors?.['minLength']
    )
      this.alertTlf =
        'Telefono invalido. Recuerda que debe tener mínimo 10 digitos. Si estás en Colombia agregra el 57 (sin el +, ejemplo: 57 300 123 4567)';
    if (this.formContact.valid) {
      await this.myData.forms.add(form);
      this.formContact.reset();
      this.alert = '';
      this.alertTlf = '';
      window.alert('Mensaje enviado. Nos pondremos en contacto contigo');
    }
  }
  async sendWhatSapp() {
    this.saveData();
    if (this.formContact.valid) {
      await this.myData.forms.toArray().then((forms) => {
        const lastMsj = forms[forms.length - 1];
        const mensaje = `Nombre: ${lastMsj.name}%0ACorreo electrónico: ${lastMsj.email}%0ATeléfono: ${lastMsj.reason}%0AMensaje: ${lastMsj.message}`;
        const url = `https://api.whatsapp.com/send?phone=573145406467&text=${mensaje}`;
        window.open(url);
      });
    }
  }
}

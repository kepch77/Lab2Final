import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

class Registration {
  constructor(
    public firstName: string = '',
    public lastName: string = '',
    public dob: NgbDateStruct = null,
    public user: string = '',
    public password: string = '',
    public country: string = 'Seleccione Pais'
  ) {}
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // It maintains list of Registrations
  registrations: Registration[] = [];
  // It maintains registration Model
  regModel: Registration;
  // It maintains registration form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Guardar';
  // It maintains table row index based on selection.
  selectedRow: number;
  // It maintains Array of countries.
  countries: string[] = ['Guatemala', 'Mexico', 'Estados Unidos'];
  constructor() {
    // Add default registration data.
    this.registrations.push(new Registration('Johan', 'Peter', {year: 1980, month: 5, day: 12}, 'johan', 'johan123', 'UK'));
    this.registrations.push(new Registration('Mohamed', 'Tariq', {year: 1975, month: 12, day: 3}, 'tariq', 'tariq123', 'UAE'));
    this.registrations.push(new Registration('Nirmal', 'Kumar', {year: 1970, month: 7, day: 25}, 'nirmal', 'nirmal123', 'India'));
  }

  ngOnInit() {}

  // This method associate to New Button.
  onNew() {
    // Initiate new registration.
    this.regModel = new Registration();
    // Change submitType to 'Save'.
    this.submitType = 'Guardar';
    // display registration entry section.
    this.showNew = true;
  }

  // This method associate to Save Button.
  onSave() {
    if (this.submitType === 'Guardar') {
      // Push registration model object into registration list.
      this.registrations.push(this.regModel);
    } else {
      // Update the existing properties values based on model.
      this.registrations[this.selectedRow].firstName = this.regModel.firstName;
      this.registrations[this.selectedRow].lastName = this.regModel.lastName;
      this.registrations[this.selectedRow].dob = this.regModel.dob;
      this.registrations[this.selectedRow].user = this.regModel.user;
      this.registrations[this.selectedRow].password = this.regModel.password;
      this.registrations[this.selectedRow].country = this.regModel.country;
    }
    // Hide registration entry section.
    this.showNew = false;
  }

  // This method associate to Edit Button.
  onEdit(index: number) {
    // Assign selected table row index.
    this.selectedRow = index;
    // Initiate new registration.
    this.regModel = new Registration();
    // Retrieve selected registration from list and assign to model.
    this.regModel = Object.assign({}, this.registrations[this.selectedRow]);
    // Change submitType to Update.
    this.submitType = 'Guardar';
    // Display registration entry section.
    this.showNew = true;
  }

  // This method associate to Delete Button.
  onDelete(index: number) {
    // Delete the corresponding registration entry from the list.
    this.registrations.splice(index, 1);
  }

  // This method associate toCancel Button.
  onCancel() {
    // Hide registration entry section.
    this.showNew = false;
  }

  // This method associate to Bootstrap dropdown selection change.
  onChangeCountry(country: string) {
    // Assign corresponding selected country to model.
    this.regModel.country = country;
  }

}

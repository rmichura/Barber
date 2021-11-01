<template>
  <div class="boxWrapper">
    <div class="info">
      <p>Barber:</p>
    </div>
    <select v-model="employee" name="employee" id="employee" class="employee">
      <option value="damian">Damian</option>
      <option value="alex">Alex</option>
      <option value="klara">Klara</option>
    </select>
    <div class="info">
      <p>Usługa:</p>
    </div>
    <select v-model="service" name="service" class="service" id="service">
      <option value="shearing">Strzyżenie (nożyczki + maszynka) (35 zł)</option>
      <option value="beard">Broda (trymowanie, konturowanie) (35 zł)</option>
      <option value="combo">Combo (strzyżenie włosów + broda) (60 zł)</option>
      <option value="shavingHead">Golenie głowy (40 zł)</option>
      <option value="haircutReducing">Strzyżenie + redukowanie siwizny (60 zł)</option>
      <option value="shavingRazor">Golenie głowy brzytwą + broda (60 zł)</option>
    </select>
    <div class="datePicker" required>
      <date-picker v-model="date" value-type="DD-MM-YYYY" format="DD-MM-YYYY"
                   placeholder="Wybierz date" @input="handleBtn"
                   :disabled="isDisabledDate"
                   :disabled-date="disabledBeforeToday"/>
    </div>
    <div class="term">
      <table>
        <tr>
          <td>
            <button class="9" type="button" @click="hour = '9:00'" :disabled="hourFromDatabase === '9:00'"
                    :class="{active: hour === '9:00' }">9:00
            </button>
          </td>
          <td>
            <button class="10" type="button" @click="hour = '10:00'" :disabled="hourFromDatabase === '10:00'"
                    :class="{active: hour === '10:00' }">10:00
            </button>
          </td>
          <td>
            <button class="11" type="button" @click="hour = '11:00'" :disabled="hourFromDatabase === '11:00'"
                    :class="{active: hour === '11:00' }">11:00
            </button>
          </td>
          <td>
            <button class="12" type="button" @click="hour = '12:00'" :disabled="hourFromDatabase === '12:00'"
                    :class="{active: hour === '12:00' }">12:00
            </button>
          </td>
          <td>
            <button class="13" type="button" @click="hour = '13:00'" :disabled="hourFromDatabase === '13:00'"
                    :class="{active: hour === '13:00' }">13:00
            </button>
          </td>
          <td>
            <button class="14" type="button" @click="hour = '14:00'" :disabled="hourFromDatabase === '14:00'"
                    :class="{active: hour === '14:00'}">14:00
            </button>
          </td>
        </tr>
      </table>
    </div>
    <div class="dataCustomer">
      <input v-model="name" type="text"
             name="name" placeholder="*Imię">
      <input type="text" v-model="lastName"
             name="lastName" placeholder="*Nazwisko">
      <input v-model="number"
             type="number" name="number" placeholder="*Numer telefonu">
      <input v-model="email"
             type="email" name="email" placeholder="*Adres email">
    </div>
    <div class="button">
      <button id="button" name="button" v-on:click="buttonSend()" type="submit">Wyślij</button>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import axios from 'axios';

const API = `http://localhost:3000/api/`;

export default {
  name: 'Box',
  components: {
    DatePicker,
  },
  data() {
    return {
      date: '',
      name: '',
      lastName: '',
      number: '',
      email: '',
      employee: '',
      service: '',
      hour: '',
      hourFromDatabase: '',
      idUser: '',
      emailFromDatabase: '',
      idUserToRemove: '',
      dateFromDatabase: '',
    };
  },

  computed: {
    isDisabledDate: function () {
      return !this.employee
    },
  },

  methods: {
    disabledBeforeToday(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today || date > new Date(today.getTime() + 365 * 24 * 3600 * 1000);
    },

    validateEmail() {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.email)
    },

    validations() {
      return !this.name || !this.service || !this.employee || !this.date || !this.hour || !this.lastName || !this.number || !this.validateEmail()
    },

    goHome() {
      return this.$router.push('/');
    },

    handleBtn() {
      return axios.get(`${API}date?employee=${this.employee}&date=${this.date}`)
        .then((res) => {
          this.hourFromDatabase = res.data[0].hour
        })
        .catch(() => {
          console.log('Brak daty w bazie dla tego prawcownika zatem wszystkie godziny sa dostepne')
        })
    },

    checkDateAndEmail() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today
    },

    removeUserIfDateLessThanToday() {
      return axios.delete(`${API}users/${this.idUserToRemove}`)
        .catch((error) => {
          console.log(error)
        })
    },

    getDateFromDatabase() {
      return axios.get(`${API}date?user=${this.idUserToRemove}`)
        .then((res) => {
          this.dateFromDatabase = res.data[0].date
        }).catch(() => {
          console.log('nie ma w bazie')
        })
    },

    getEmail() {
      return axios.get(`${API}user?email=${this.email}`)
        .then((res) => {
          this.emailFromDatabase = res.data[0].email
          this.idUserToRemove = res.data[0]._id
        }).catch(() => {
          console.log('Nie ma takiego w bazie')
        })
    },

    saveUsers() {
      return axios.post(`${API}users`, {
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        number: this.number,
      })
        .catch((error) => {
          console.log(error)
        })
    },

    getUser() {
      return axios.get(`${API}user?name=${this.name}&lastName=${this.lastName}&email=${this.email}&number=${this.number}`)
        .then((res) => {
          this.idUser = res.data[0]._id
        })
        .catch((error) => {
          console.log(error)
        })
    },

    saveDates() {
      return axios.post(`${API}dates`, {
        id: this.idUser,
        date: this.date,
        hour: this.hour,
        service: this.service,
        employee: this.employee
      });
    },

    sendMail() {
      return axios.post(`${API}mail`, {
        user: {
          email: this.email,
          name: this.name
        },
        date: {
          employee: this.employee,
          hour: this.hour,
          date: this.date
        }
      })
        .catch((error) => {
          console.log(error)
        });
    },

    buttonSend() {
      if (this.validations()) {
        alert('Uzupełnij wszystkie pola')
      } else {
        this.getEmail()
          .then(() => {
            this.getDateFromDatabase()
            if (this.email === this.emailFromDatabase || this.dateFromDatabase < this.checkDateAndEmail()) {
              this.removeUserIfDateLessThanToday()
                .then(() => {
                  this.saveUsers()
                    .then(() => {
                      return this.getUser()
                    })
                    .then(() => {
                      this.saveDates()
                      this.sendMail()
                    })
                  alert('Gratulacje zapisałeś się')
                  this.goHome();
                })
            } else {
              this.saveUsers()
                .then(() => {
                  return this.getUser()
                })
                .then(() => {
                  this.saveDates()
                  this.sendMail()
                })
              alert('Gratulacje zapisałeś się')
              this.goHome();
            }
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.boxWrapper {
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px 140px;
  background-color: white;
}

@media (min-width: 768px) {
  font-size: 17px;
  max-height: 700px;
  min-height: 700px;
  margin-bottom: 10px;
}

@media (min-width: 1024px) {
  font-size: 17px;
}

.info {
  text-align: center;
  font-size: 22px;
}

.employee, .service {
  margin-bottom: 10px;
  width: 350px;
  height: 40px;
  font-size: 17px;
  text-align: center;
  border: 1px solid white;
  background-color: darkgray;
  color: white;
}

input {
  margin: 10px 10px 30px;
  color: black;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 18px;
  font-weight: 300;
  height: 30px;
  width: 350px;
  border: 0;
  background: none;
  border-bottom: 1px solid black;
}

.button {
  text-align: center;
}

.button button {
  font-size: 18px;
  font-weight: 350;
  height: 50px;
  width: 300px;
  background-color: white;
  border: 1px solid black;
}

.button button:hover {
  background-color: #aae665;
  color: white;
  border: 1px solid white;
}

.datePicker {
  padding: 20px;
  text-align: center;
}

.term button {
  font-size: 17px;
  font-weight: 350;
  height: 24px;
  background-color: white;
  border: 1px solid white;
}

.term button:hover {
  background-color: #dcdcdc;
}

.term .active {
  background-color: #dcdcdc;
}

input:hover {
  background-color: #dcdcdc;
}
</style>

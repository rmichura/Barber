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
            <button class="9" type="button" @click="hour = '9:00'" :disabled="hourFromDatabase !== '9:00'"
                    :class="{active: hour === '9:00' }">9:00
            </button>
          </td>
          <td>
            <button class="10" type="button" @click="hour = '10:00'" :disabled="hourFromDatabase !== '10:00'"
                    :class="{active: hour === '10:00' }">10:00
            </button>
          </td>
          <td>
            <button class="11" type="button" @click="hour = '11:00'" :disabled="hourFromDatabase !== '11:00'"
                    :class="{active: hour === '11:00' }">11:00
            </button>
          </td>
          <td>
            <button class="12" type="button" @click="hour = '12:00'" :disabled="hourFromDatabase !== '12:00'"
                    :class="{active: hour === '12:00' }">12:00
            </button>
          </td>
          <td>
            <button class="13" type="button" @click="hour = '13:00'" :disabled="hourFromDatabase !== '13:00'"
                    :class="{active: hour === '13:00' }">13:00
            </button>
          </td>
          <td>
            <button class="14" type="button" @click="hour = '14:00'" :disabled="hourFromDatabase !== '14:00'"
                    :class="{active: hour === '14:00'}">14:00
            </button>
          </td>
        </tr>
      </table>
    </div>
    <div class="button">
      <button id="button" name="button" v-on:click="buttonRemove()" type="submit">Zrezygnuj z rezerwacji</button>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import axios from 'axios';

const API = `http://localhost:3000/api/`;

export default {
  name: 'BoxRemoveReservation.vue',
  components: {
    DatePicker,
  },
  data() {
    return {
      date: '',
      employee: '',
      hour: '',
      idDate: '',
      idUser: '',
      hourFromDatabase: '',
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

    validations() {
      return !this.employee || !this.date || !this.hour
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
          console.log('Nie istenieje taka wizyta')
        })
    },

    getDate() {
      return axios.get(`${API}date?employee=${this.employee}&date=${this.date}&hour=${this.hour}`)
        .then((res) => {
          this.idDate = res.data[0]._id
          this.idUser = res.data[0].user
        })
        .catch((error) => {
          console.log(error)
        })
    },

    removeDate() {
      return axios.delete(`${API}dates/${this.idDate}`)
        .catch((error) => {
          console.log(error)
        })
    },

    checkDateAndEmail() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today
    },

    removeUser() {
      return axios.delete(`${API}users/${this.idUser}`)
        .catch((error) => {
          console.log(error)
        })
    },

    buttonRemove() {
      if (this.validations()) {
        alert('Uzupełnij poprawnie wszystkie pola!')
      } else {
        this.getDate()
          .then(() => {
            this.removeDate()
            this.removeUser()
          })
        alert('Zrezygnowałeś z rezerwacji :(')
        this.goHome();
      }
    },
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
  padding: 20px 70px 70px;
  background-color: white;
}

@media (min-width: 768px) {
  font-size: 17px;
  width: 420px;
  max-height: 700px;
  min-height: 700px;
  margin-bottom: 10px;
}

@media (min-width: 1024px) {
  font-size: 17px;
  width: 40%;
}

.info {
  text-align: center;
  font-size: 22px;
}

.employee {
  margin-bottom: 10px;
  width: 300px;
  height: 40px;
  font-size: 17px;
  text-align: center;
  border: 1px solid white;
  background-color: darkgray;
  color: white;
}

.button {
  text-align: center;
  margin-top: 10px;
}

.button button {
  font-size: 18px;
  font-weight: 300;
  height: 50px;
  width: 300px;
  background-color: white;
  border: 1px solid black;
}

.button button:hover {
  background-color: red;
  color: white;
  border: 1px solid white;
}

.datePicker {
  padding: 30px;
  text-align: center;
}

.term button {
  font-size: 16px;
  font-weight: 300;
  height: 20px;
  margin-bottom: 30px;
  margin-top: 10px;
  background-color: white;
  border: 1px solid white;
}

.term button:hover {
  background-color: #dcdcdc;
}

.term .active {
  background-color: #dcdcdc;
}

</style>

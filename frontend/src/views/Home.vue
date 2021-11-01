<template>
  <div class="wrapper">
    <Claim/>
    <Button/>
    <ButtonRemove/>
    <router-link to="/rezerwacja"/>
  </div>
</template>

<script>
import Claim from '../components/Claim.vue';
import Button from '../components/ButtonReservation.vue';
import ButtonRemove from "../components/ButtonRemove";

export default {
  name: 'Home',
  components: {
    ButtonRemove,
    Button,
    Claim,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  width: 100%;
  height: 100vh;
  background-image: url("../assets/barber2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 0%;
}
</style>

<template>
  <div class="wrapperReservation">
    <Box/>
  </div>
</template>

<script>
import Box from '../components/Box.vue';

export default {
  name: 'Reservation.vue',
  components: {
    Box,
  },
};
</script>

<style lang="scss" scoped>
.wrapperReservation {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  width: 100%;
  height: 100vh;
  font-family: Calibri, serif;
  background-image: url("../assets/barber.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 0;
}

.reservation {
  color: white;

  @media (min-width: 1024px) {
    font-size: 70px;
  }

  @media (min-width: 768px) {
    margin-top: 10px;
    font-size: 70px;
  }
}

</style>

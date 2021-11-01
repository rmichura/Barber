<template>
  <div class="wrapperReservation">
      <box-remove-reservation />
  </div>
</template>

<script>
import boxRemoveReservation from '../components/BoxRemoveReservation';

export default {
  name: 'RemoveReservation.vue',
  components: {
    boxRemoveReservation,
  },
};
</script>

<style lang="scss" scoped>
.wrapperReservation {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 30px;
  width: 100%;
  height: 100vh;
  font-family: Calibri, serif;
  background-image: url("../assets/menu.jpg");
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

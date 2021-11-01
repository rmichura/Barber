<template>
  <div class="buttonWrapper">
    <button id="button" name="button" @click="goReservation">Zapisz się</button>
  </div>
</template>

<script>
export default {
  name: 'ButtonReservation',
  methods: {
    goReservation() {
      return this.$router.push('/rezerwacja');
    },
  },
};
</script>

<style lang="scss" scoped>
.buttonWrapper {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 300px;

  @media (min-width: 1024px) {
    width: 350px;
  }

  button {
    font-size: 18px;
    font-weight: 350;
    height: 50px;
    border: 1px white;
    background-color: white;
  }

  button:hover {
    background-color: #aae665;
    color: white;
  }
}
</style>

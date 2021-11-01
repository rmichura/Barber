<template>
  <div class="claimWrapper">
    <h1 v-for="claim in info"
        class="claim">{{ claim.title }}</h1>
    <p v-for="subclaim in info" class="subclaim">
      {{ subclaim.body }}
    </p>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Claim',
  data() {
    return {
      info: null
    };
  },
  mounted() {
    axios.get(`http://localhost:3000/api/headers`)
      .then((res) => {
        this.info = res.data.headers;
      })
  }
};
</script>
<style lang="scss" scoped>
.claimWrapper {
  margin-top: 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.claim {
  font-size: 50px;
  margin: 0;

  @media (min-width: 1024px) {
    margin-top: 100px;
    font-size: 80px;
  }
}

.subclaim {
  margin: 20px 0 0 0;
  font-size: 13px;
  font-weight: 400;

  @media (min-width: 768px) {
    font-size: 17px;
    width: 500px;
    letter-spacing: 1px;
  }
}
</style>

<template>
  <div>
    <h2 class="mb-5">Total Data: {{ students.length }}</h2>
    <div class="table">
      <div class="table__header">
        <div class="table__header__item">Id</div>
        <div class="table__header__item">Name</div>
        <div class="table__header__item">Email</div>
        <div class="table__header__item">Phone</div>
      </div>
      <div class="table__content" v-for="student in students" :key="student.id">
        <div class="table__content__item">{{ student.id }}</div>
        <div class="table__content__item">{{ student.name }}</div>
        <div class="table__content__item">{{ student.email }}</div>
        <div class="table__content__item">{{ student.phone }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    students: Array,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.table {
  border: 2px solid gray;
  &__header {
    display: flex;
    &__item {
      flex: 1;
      font-weight: 700;
      padding: 10px 20px;
      background-color: white;
      border-bottom: 2px solid gray;
      &:not(:last-child) {
        border-right: 2px solid gray;
      }
    }
  }

  &__content {
    display: flex;
    &:not(:last-child) {
      border-bottom: 2px solid gray;
    }

    &__item {
      flex: 1;
      padding: 10px 20px;
      background-color: white;
      &:not(:last-child) {
        border-right: 2px solid gray;
      }
    }
  }
}
</style>

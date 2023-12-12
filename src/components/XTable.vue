<template>
  <div>
    <h2 class="mb-5">Total Data: {{ students.length }}</h2>
    <div class="table">
      <div class="table__header table__row">
        <div class="table__header__item table__cell">Id</div>
        <div class="table__header__item table__cell">Name</div>
        <div class="table__header__item table__cell">Email</div>
        <div class="table__header__item table__cell">Phone</div>
      </div>
      <div class="table__content">
        <div
          class="table__row"
          v-for="student in allStudents"
          :key="student.id"
        >
          <div class="table__row__item table__cell">{{ student.id }}</div>
          <div class="table__row__item table__cell">{{ student.name }}</div>
          <div class="table__row__item table__cell">{{ student.email }}</div>
          <div class="table__row__item table__cell">{{ student.phone }}</div>
        </div>
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
    return {
      allStudents: this.students,
    };
  },
};
</script>

<style lang="scss" scoped>
.table {
  border: 2px solid gray;
  position: relative;
  resize: both;

  max-height: 410px;
  overflow-y: scroll;
  scrollbar-gutter: 0px;

  &__header {
    display: flex;
    &__item {
      flex: 1;
      font-weight: 700;

      background-color: white;
      border-bottom: 2px solid gray;
      &:not(:last-child) {
        border-right: 2px solid gray;
      }
    }
  }

  &__content {
  }

  &__row {
    display: flex;
    max-height: 400px;

    &:not(:last-child) {
      border-bottom: 2px solid gray;
    }

    &--sticky {
      position: sticky;
      top: 0;
    }

    &__item {
      flex: 1;
      // padding: 10px 20px;
      background-color: white;
      &:not(:last-child) {
        border-right: 2px solid gray;
      }
    }
  }

  &__cell {
    min-width: 200px;
    padding: 10px 20px;
    resize: both;
  }
}
</style>

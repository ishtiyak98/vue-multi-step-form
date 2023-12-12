<template>
  <div class="container my-10">
    <div class="d-flex gap-5">
      <v-text-field
        type="number"
        class="me-4"
        label="No. of rows"
        v-model="rows"
        variant="underlined"
        @change="addRow"
      ></v-text-field>
      <v-text-field
        type="number"
        class="ms-4"
        v-model="columns"
        label="No. of cols"
        variant="underlined"
      ></v-text-field>
    </div>
    <XTable v-if="students.length > 0" :students="students"></XTable>
  </div>
</template>

<script>
import XTable from "../components/XTable.vue";
export default {
  name: "TableView",
  components: { XTable },
  data() {
    return {
      rows: 0,
      columns: 0,
      students: [],
    };
  },

  watch: {},
  methods: {
    addRow() {
      if (this.students.length < this.rows) {
        if (this.rows > 0) {
          Array(parseInt(this.rows - this.students.length))
            .fill({
              id: 1,
              name: "abc",
              email: "abc@mail.com",
              phone: "0123324",
              class: "xi",
              section: "B",
            })
            .map((item) => {
              this.students.push(item);
            });
        }
      } else {
        this.students.length = this.rows;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>

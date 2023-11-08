<template>
  <section class="form">
    <div class="form__tracker">
      <div class="form__tracker__container">
        <div class="progress-bar">
          <div
            :class="{
              'progress-bar--active__phase2': currentStep.id === 2,
              'progress-bar--active__phase3': currentStep.id === 3,
              'progress-bar--active__phase4': currentStep.id === 4,
            }"
            class="progress-bar--active"
          ></div>
        </div>
        <div v-for="step in steps" :key="step.id" class="form__step">
          <div
            :class="{ 'rounded-position--active': currentStep.id >= step.id }"
            class="rounded-position"
          >
            <p>{{ step.id }}</p>
          </div>
          <div class="form__step__info">
            <p class="small-text">STEP {{ step.id }}</p>
            <p class="large-text">{{ step.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100%; height: 100%">
      <div>
        <h2 class="form__header">{{ currentStep.name }}</h2>
        <p class="form__description">{{ currentStep.description }}</p>
      </div>
      <form @submit.prevent="submitForm">
        <div class="form__body" v-if="steps[0].status === 1">
          <div style="position: relative">
            <label class="form__body__label" for="name">Name</label>
            <input
              type="text"
              v-model="formData.name"
              name="name"
              id="name"
              class="form__body__input"
              placeholder="e.g Stephen King"
            />
            <span
              class="form__body__input--error"
              v-for="error of v$.formData.name.$errors"
              :key="error.$uid"
              >{{ error.$message }}</span
            >
          </div>
          <div style="position: relative">
            <label class="form__body__label" for="email">Email Address</label>
            <input
              type="text"
              v-model="formData.email"
              name="email"
              id="email"
              class="form__body__input"
              placeholder="stephenking@domain.com"
            />
            <span
              class="form__body__input--error"
              v-for="error of v$.formData.email.$errors"
              :key="error.$uid"
              >{{ error.$message }}</span
            >
          </div>
          <div style="position: relative">
            <label class="form__body__label" for="phone">Phone Number</label>
            <input
              type="text"
              v-model="formData.phone"
              name="phone"
              id="phone"
              class="form__body__input"
              placeholder="e.g. 01722211100"
            />
            <span
              class="form__body__input--error"
              v-for="error of v$.formData.phone.$errors"
              :key="error.$uid"
              >{{ error.$message }}</span
            >
          </div>
        </div>
        <div class="button-layout">
          <button
            v-if="!(steps[0].status === 1)"
            @click="back"
            type="button"
            class="form__body__next-btn"
          >
            Go Back
          </button>
          <button
            v-if="!(steps[3].status === 1)"
            @click="next"
            type="button"
            class="form__body__next-btn"
          >
            Next Step
          </button>
          <button
            v-if="steps[3].status === 1"
            type="submit"
            class="form__body__next-btn"
          >
            Submit
          </button>
        </div>
      </form>
      <p>{{ formData.name }}</p>
      <p>{{ formData.email }}</p>
      <p>{{ formData.phone }}</p>
    </div>
  </section>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  name: "MultiStepFood",
  data() {
    return {
      v$: useVuelidate(),
      steps: [
        {
          id: 1,
          name: "personal info",
          description:
            "Please provide your name, email address, and phone number",
          status: 1,
        },
        {
          id: 2,
          name: "select plan",
          description: "You have the option of monthly or yearly billing",
          status: 0,
        },
        {
          id: 3,
          name: "add-ons",
          description: "Add-ons help enhance your gaming experience",
          status: 0,
        },
        {
          id: 4,
          name: "finishing up",
          description: "Double check everything looks OK before confirming",
          status: 0,
        },
      ],

      formData: {
        name: "",
        email: "",
        phone: "",
      },
    };
  },
  validations() {
    return {
      formData: {
        name: {
          $property: this.formData.name,
          $validator: required,
          $message: "First name is required",
        },
        email: {
          $property: this.formData.email,
          $validator: required,
          $message: "Email is required",
        },
        phone: {
          $property: this.formData.phone,
          $validator: required,
          $message: "Phone is required",
        },
      },
    };
  },
  watch: {
    "formData.name": function (newVal) {
      console.log(newVal);
    },
  },
  computed: {
    currentStep() {
      return this.steps.find((step) => step.status === 1);
    },
  },
  methods: {
    submitForm() {
      console.log("form-submitted");
    },

    next() {
      // const currentIndex = this.steps.findIndex((step) => step.status === 1);
      // this.steps[currentIndex + 1].status = 1;
      // this.steps[currentIndex].status = 0;

      const result = this.v$.$validate();
      console.log(this.v$);
      console.log("next");
    },

    back() {
      const currentIndex = this.steps.findIndex((step) => step.status === 1);
      this.steps[currentIndex - 1].status = 1;
      this.steps[currentIndex].status = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";
@import "../styles/responsive";
.form {
  width: 100%;
  height: 100%;
  color: black;
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;

  &:hover &__header::after {
    width: 100%;
  }

  @include lg {
    width: 1080px;
    height: 620px;
    flex-wrap: nowrap;
  }

  &__tracker {
    padding: 30px;
    min-width: 100%;
    color: white;
    background-color: $form-primary;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;

    @include lg {
      min-width: 300px;
    }
    &__container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 30px;
      position: relative;

      @include lg {
        flex-direction: column;
      }

      .progress-bar {
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translate(0%, -50%);
        width: 90%;
        height: 2px;
        border-radius: 10px;
        background-color: white;

        @include lg {
          width: 2px;
          height: 90%;
        }

        &--active {
          width: 0%;
          height: 100%;
          background-color: $form-primary-light;
          transition: all 0.4s;

          @include lg {
            width: 100%;
            height: 0%;
          }

          &__phase2 {
            width: 35%;
            height: 100%;

            @include lg {
              height: 35%;
              width: 100%;
            }
          }

          &__phase3 {
            width: 70%;
            height: 100%;

            @include lg {
              height: 70%;
              width: 100%;
            }
          }

          &__phase4 {
            width: 100%;
            height: 100%;

            @include lg {
              height: 100%;
              width: 100%;
            }
          }
        }
      }

      .form__step {
        display: flex;
        align-items: center;
        gap: 16px;
        z-index: 10;
        .rounded-position {
          color: white;
          border: 3px solid white;
          width: 30px;
          height: 30px;
          border-radius: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.4s;
          background-color: $form-primary;

          &--active {
            color: $form-primary;
            font-weight: 600;
            background-color: $form-primary-light;
            border-color: $form-primary-light;
            transform: scale(1.3);
          }
        }

        &__info {
          display: none;

          @include lg {
            display: block;
          }
          .small-text {
            color: $form-primary-light;
            font-size: 12px;
            margin-bottom: 5px;
          }

          .large-text {
            font-size: 16px;
            text-transform: uppercase;
          }
        }
      }
    }
  }

  &__header {
    font-size: 32px;
    font-weight: 600;
    color: $form-primary;
    position: relative;
    display: inline-block;
    text-transform: capitalize;

    &::after {
      content: "";
      width: 25%;
      height: 4px;
      border-radius: 50px;
      background-color: $form-primary;
      position: absolute;
      bottom: -10px;
      left: 0;
      transition: width 0.5s ease-in-out;
    }
  }

  &__description {
    margin-top: 30px;
    color: $form-primary;
    font-weight: 400;
    font-size: 18px;
  }

  &__body {
    margin-top: 60px;
    padding-right: 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;

    @include lg {
      padding-right: 210px;
    }

    &__label {
      color: $form-primary;
      font-size: 18px;
      font-weight: 600;
      display: inline-block;
      margin-bottom: 10px;
    }
    &__input {
      display: block;
      min-width: 100%;
      font-size: 18px;
      padding: 12px;
      border: 2px solid #e7e2e2;
      border-radius: 8px;
      outline: none;
      transition: border-color 0.4s;
      letter-spacing: 1px;

      &:focus {
        border-color: $form-primary;
      }

      &--error {
        color: red;
        display: inline-block;
        margin-top: 8px;
        position: absolute;
        bottom: -22px;
        right: 5px;
      }
    }

    &__next-btn {
      padding: 16px 28px;
      color: white;
      font-size: 16px;
      letter-spacing: 1px;
      background-color: $form-primary;
      border: none;
      border-radius: 8px;
      display: inline-block;
      margin-top: 35px;

      &:hover {
        cursor: pointer;
        background-color: lighten($form-primary, 10);
      }
    }
  }
}

.button-layout {
  display: flex;
  gap: 20px;
}
</style>

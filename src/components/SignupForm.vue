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
        <h2 class="form__header">
          {{ currentStep.name }}
        </h2>
        <p class="form__description">{{ currentStep.description }}.</p>
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
              :class="{
                'form__body__input--error': formValidation.nameValidation.error,
              }"
              class="form__body__input"
              placeholder="e.g Stephen King"
            />
            <span
              v-if="formValidation.nameValidation.error"
              class="form__body__input--error__message"
              >{{ formValidation.nameValidation.message }}</span
            >
          </div>
          <div style="position: relative">
            <label class="form__body__label" for="email">Email Address</label>
            <input
              type="text"
              v-model="formData.email"
              name="email"
              id="email"
              :class="{
                'form__body__input--error':
                  formValidation.emailValidation.error,
              }"
              class="form__body__input"
              placeholder="stephenking@domain.com"
            />
            <span
              v-if="formValidation.emailValidation.error"
              class="form__body__input--error__message"
              >{{ formValidation.emailValidation.message }}</span
            >
          </div>
          <div style="position: relative">
            <label class="form__body__label" for="phone">Phone Number</label>
            <input
              type="text"
              v-model="formData.phone"
              name="phone"
              id="phone"
              :class="{
                'form__body__input--error':
                  formValidation.phoneValidation.error,
              }"
              class="form__body__input"
              placeholder="e.g. 01722211100"
            />
            <span
              v-if="formValidation.phoneValidation.error"
              class="form__body__input--error__message"
              >{{ formValidation.phoneValidation.message }}</span
            >
          </div>
        </div>

        <!-- for 2nd step -->
        <div class="form__body" v-if="steps[1].status === 1">
          <div>
            <div
              class="radio-select__wrapper"
              v-for="activePlan in plans.filter((plan) => plan.active === true)"
              :key="activePlan.id"
            >
              <div
                class="select"
                :class="{
                  'select--active': formData.selectedPlan.id === plan.id,
                }"
                v-for="plan in activePlan.categories"
                :key="plan.id"
                @click="() => (formData.selectedPlan = plan)"
              >
                <input
                  class="form__body__radio"
                  type="radio"
                  :name="activePlan.name"
                  :id="plan.name"
                />
                <label class="form__body__radio-label" :for="plan.name">
                  <div class="form__body__radio-label__wrapper">
                    <div class="icon">
                      <span><v-icon scale="1.8" :name="plan.iconName" /></span>
                    </div>
                    <div class="content">
                      <p class="content__name">{{ plan.name }}</p>
                      <p class="content__price">${{ plan.price }}</p>
                    </div>
                  </div>
                </label>
              </div>
              <div class="toggle-btn__wrapper">
                <p>Monthly</p>
                <label class="toggle-btn">
                  <input
                    :checked="activePlan.name === 'yearly'"
                    type="checkbox"
                    name=""
                    id=""
                    v-model="planToggle"
                  />
                  <span class="toggle-btn__slider"></span>
                </label>
                <p>Yearly</p>
              </div>
            </div>
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
    </div>
  </section>
</template>

<script>
import { OhVueIcon } from "oh-vue-icons";

export default {
  name: "MultiStepFood",
  components: {
    "v-icon": OhVueIcon,
  },
  data() {
    return {
      planToggle: false,
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

      plans: [
        {
          id: 1,
          name: "monthly",
          active: true,
          categories: [
            { id: 11, name: "arcade", price: 9, iconName: "si-applearcade" },
            { id: 12, name: "advanced", price: 12, iconName: "si-applearcade" },
            { id: 13, name: "pro", price: 15, iconName: "si-applearcade" },
          ],
        },
        {
          id: 2,
          name: "yearly",
          active: false,
          categories: [
            { id: 21, name: "arcade", price: 15, iconName: "si-applearcade" },
            { id: 22, name: "advanced", price: 25, iconName: "si-applearcade" },
            { id: 23, name: "pro", price: 40, iconName: "si-applearcade" },
          ],
        },
      ],

      formData: {
        name: "",
        email: "",
        phone: "",
        selectedPlan: {},
      },

      formValidation: {
        nameValidation: {
          error: false,
          message: "",
        },
        emailValidation: {
          error: false,
          message: "",
        },
        phoneValidation: {
          error: false,
          message: "",
        },
      },
    };
  },

  watch: {
    "formData.name": function (newVal) {
      this.checkName(newVal);
    },

    "formData.email": function (newVal) {
      this.checkEmail(newVal);
    },

    "formData.phone": function (newVal) {
      this.checkPhone(newVal);
    },

    planToggle: function (newVal) {
      if (newVal === false) {
        this.plans.find((plan) => plan.name === "yearly").active = false;
        this.plans.find((plan) => plan.name === "monthly").active = true;
      } else {
        this.plans.find((plan) => plan.name === "yearly").active = true;
        this.plans.find((plan) => plan.name === "monthly").active = false;
      }
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

    //-------- form next method --------
    next() {
      this.checkName(this.formData.name);
      this.checkEmail(this.formData.email);
      this.checkPhone(this.formData.phone);

      if (
        !this.formValidation.nameValidation.error &&
        !this.formValidation.emailValidation.error &&
        !this.formValidation.phoneValidation.error
      ) {
        const currentIndex = this.steps.findIndex((step) => step.status === 1);
        this.steps[currentIndex + 1].status = 1;
        this.steps[currentIndex].status = 0;
      }
    },

    //-------- form back method --------
    back() {
      const currentIndex = this.steps.findIndex((step) => step.status === 1);
      this.steps[currentIndex - 1].status = 1;
      this.steps[currentIndex].status = 0;
    },

    //-------- form name field validation --------
    checkName(name) {
      if (name.length <= 0) {
        this.formValidation.nameValidation.error = true;
        this.formValidation.nameValidation.message = "Name cannot be empty!";
      } else if (name.length > 0) {
        this.formValidation.nameValidation.error = false;
        this.formValidation.nameValidation.message = "";
      }
    },

    //-------- form email field validation --------
    checkEmail(email) {
      let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

      if (email.length <= 0) {
        this.formValidation.emailValidation.error = true;
        this.formValidation.emailValidation.message = "Email cannot be empty!";
      } else if (!email.match(regex)) {
        this.formValidation.emailValidation.error = true;
        this.formValidation.emailValidation.message = "Not a valid mail!";
      } else if (email.length > 0) {
        this.formValidation.emailValidation.error = false;
        this.formValidation.emailValidation.message = "";
      }
    },

    //-------- form phone field validation --------
    checkPhone(phone) {
      if (phone.length <= 0) {
        this.formValidation.phoneValidation.error = true;
        this.formValidation.phoneValidation.message = "Phone cannot be empty!";
      } else if (phone.length < 11 || phone.length > 11) {
        this.formValidation.phoneValidation.error = true;
        this.formValidation.phoneValidation.message =
          "Please enter 11 digit number!";
      } else if (phone.length > 0) {
        this.formValidation.phoneValidation.error = false;
        this.formValidation.phoneValidation.message = "";
      }
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
      padding-right: 110px;
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
        border-color: $form-error;
        &__message {
          color: $form-error;
          display: inline-block;
          margin-top: 8px;
          position: absolute;
          bottom: -22px;
          right: 5px;
        }
      }
    }

    .radio-select__wrapper {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 20px;

      @include lg {
        grid-template-columns: repeat(3, 1fr);
      }

      .select {
        &--active {
          .form__body__radio-label {
            border: 2px solid $form-primary;
            color: white;
            background-color: $form-primary;
          }
        }
      }
    }

    &__radio {
      display: none;
    }

    &__radio-label {
      display: inline-flex;
      margin-bottom: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      width: 100%;
      border: 2px solid rgb(163, 163, 163);
      background-color: rgb(245, 245, 245);
      transition: all 0.4s;
      cursor: pointer;

      &:hover {
        border: 2px solid $form-primary;
        color: white;
        background-color: $form-primary;
      }

      &__wrapper {
        display: flex;
        gap: 18px;
        .content {
          display: flex;
          flex-direction: column;
          gap: 8px;

          &__name {
            font-size: 20px;
            text-transform: capitalize;
          }

          &__price {
            font-size: 24px;
          }
        }
      }
    }

    .toggle-btn__wrapper {
      display: flex;
      gap: 20px;
      .toggle-btn {
        position: relative;
        display: inline-block;
        width: 48px;
        height: 22px;

        input {
          opacity: 0;
          width: 0;
          height: 0;

          &:checked + .toggle-btn__slider {
            background-color: $form-primary;

            &::before {
              transform: translate(180%, -50%);
            }
          }
        }

        &__slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgb(217, 217, 217);
          transition: all 0.4s;
          border-radius: 50px;
          display: flex;

          &::before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            top: 50%;
            transform: translate(20%, -50%);
            background-color: white;
            transition: all 0.4s;
            border-radius: 50px;
          }
        }
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

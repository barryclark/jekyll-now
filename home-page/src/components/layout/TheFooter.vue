<template>
  <footer class="row fixed-bottom justify-content-center">
    <social-button
      v-for="button in socialButtons"
      :key="button.link"
      :link="button.link"
      :icon="button.icon"
    ></social-button>
    <p class="text-center mt-2">
      Copyright &copy; {{ new Date().getFullYear() }} Joe Tatusko
    </p>
  </footer>
</template>

<script>
import SocialButton from "../UI/SocialButton.vue";

export default {
  components: {
    SocialButton,
  },
  data() {
    return {
      socialButtons: [
        {
          link: "mailto:tatuskojc@gmail.com",
          icon: "svg-icon email",
        },
        {
          link: "https://github.com/joetats",
          icon: "svg-icon github",
        },
        {
          link: "https://www.linkedin.com/in/joseph-tatusko-a0862884",
          icon: "svg-icon linkedin",
        },
        {
          link: "https://youtube.com/channel/UCAOvckbaZM8MEh9R83KH9HA",
          icon: "svg-icon youtube",
        },
      ],
    };
  },
};
</script>
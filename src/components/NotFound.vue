<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>{{ t("notFound") }}</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script setup>
import { useGlobal } from "../utils/shared-globals";
const { t } = useGlobal();
</script>

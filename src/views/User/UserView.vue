<script setup>
import { computed, ref } from 'vue'
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiPlus,
  mdiAccountGroup,
  mdiMagnify
} from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import TableUsers from '@/components/User/TableUsers.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import FormControlIcon from '@/components/FormControlIcon.vue'
import { useMainStore } from '@/stores/main'

const mainStore = useMainStore()
const items = computed(() => mainStore.clients)
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton  :icon="mdiAccountGroup" title="User List" main>
      </SectionTitleLineWithButton>
      <div class="flex p-4">
        <div class="relative max-w-xs mr-2">
          <input
            type="text"
            id="input-group-1"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search Name..."
          />
          <FormControlIcon :icon="mdiMagnify" h="h-11" />
        </div>
        <BaseButton
          href="/user/create"
          target="_blank"
          :icon="mdiPlus"
          label="Add User"
          rounded-full
          small
          color="contrast"
          class="m-auto mr-0"
        />
      </div>
      <TableUsers v-if="items" />
      <CardBox v-else>
        <CardBoxComponentEmpty />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

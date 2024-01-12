<script setup>
import { mdiMonitorCellphone, mdiTableBorder, mdiTableOff, mdiGithub } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import TableSampleClients from '@/components/TableSampleClients.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox>
        <div class="text-center py-24 text-gray-500 dark:text-slate-400">
          <h1 style="font-size: 32px">404 Page Not Found</h1>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

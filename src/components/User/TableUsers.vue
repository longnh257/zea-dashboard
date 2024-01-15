<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'

defineProps({
  checkable: Boolean
})

const mainStore = useMainStore()

const items = computed(() => mainStore.clients)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(5)

const currentPage = ref(0)

const checkedRows = ref([])

const itemsPaginated = computed(() =>
  items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client)
  } else {
    checkedRows.value = remove(checkedRows.value, (row) => row.id === client.id)
  }
}
</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Sample modal">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal v-model="isModalDangerActive" title="Please confirm" button="danger" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <div class="overflow-x-auto">
    <table class="border-separate border border-slate-400 table-res">
      <thead>
        <tr>
          <th class="border border-slate-300" v-if="checkable" />
          <th class="border border-slate-300" />
          <th class="border border-slate-300">Name</th>
          <th class="border border-slate-300">Company</th>
          <th class="border border-slate-300">City</th>
          <th class="border border-slate-300">Created</th>
          <th class="border border-slate-300" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in itemsPaginated" :key="client.id">
          <TableCheckboxCell v-if="checkable" @checked="checked($event, client)" />
          <td class="lg:w-6 before:hidden border border-slate-300">
            <UserAvatar :username="client.name" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
          </td>
          <td class="border border-slate-300" data-label="Name">
            {{ client.name }}
          </td>
          <td class="border border-slate-300" data-label="Company">
            {{ client.company }}
          </td>
          <td class="border border-slate-300" data-label="City">
            {{ client.city }}
          </td>

          <td class="border border-slate-300 lg:w-1 whitespace-nowrap" data-label="Created">
            <small class="text-gray-500 dark:text-slate-400" :title="client.created">
              {{ client.created }}
            </small>
          </td>
          <td class="before:hidden lg:w-1 whitespace-nowrap border border-slate-300">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton color="info" :icon="mdiEye" small @click="isModalActive = true" />
              <BaseButton
                color="danger"
                :icon="mdiTrashCan"
                small
                @click="isModalDangerActive = true"
              />
            </BaseButtons>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="p-3 lg:px-4 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>

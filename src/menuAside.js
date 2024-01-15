import {
  mdiMonitor,
  mdiTable,
  mdiAccountGroup ,

} from '@mdi/js'

export default [
  {
    to: '/',
    icon: mdiMonitor,
    label: 'Dashboard'
  },
  {
    to: '/user',
    label: 'User List',
    icon: mdiAccountGroup 
  },
  /* 
   {
     label: 'Dropdown',
     icon: mdiViewList,
     menu: [
       {
         label: 'Item One'
       },
       {
         label: 'Item Two'
       }
     ]
   }, */

]

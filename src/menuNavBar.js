import {
  
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
 
} from '@mdi/js'

export default [

  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'My Profile',
        to: '/profile'
      },
      {
        icon: mdiCogOutline,
        label: 'Settings'
      },
      {
        icon: mdiEmail,
        label: 'Messages'
      },
      {
        isDivider: true
      },
      {
        icon: mdiLogout,
        label: 'Log Out',
        isLogout: true
      }
    ]
  },

  {
    icon: mdiLogout,
    label: 'Log out',
    isDesktopNoLabel: true,
    isLogout: true
  }
]

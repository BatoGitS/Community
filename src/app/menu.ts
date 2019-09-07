import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Users',
    icon: 'people-outline',
    link: '/pages/users',
  },
  {
    title: 'Technologies',
    icon: 'pricetags-outline',
    link: '/pages/technologies',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',

      },
      {
        title: 'Register',
        link: '/auth/register',
      },
    ],
  },
];

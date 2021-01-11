export interface MenuItem {
  name: string;
  url: string;
  icon?: string;
  open?: boolean;
  children?: MenuItem[];
}
export const menuItems: MenuItem[] = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Page 1',
    url: 'page-1',
    children: [
      {
        name: 'Page 2',
        url: 'page-2',
        children: [{ name: 'Page 3', url: 'page-3' }],
      },
    ],
  },
];

import type { JSXElementConstructor, ReactElement } from 'react';
import Authentication from '../Routes/Authentication/Authentication';
import RecoverPassword from '../Routes/Authentication/RecoverPassword';
import SetPassword from '../Routes/Authentication/SetPassword';
import SignIn from '../Routes/Authentication/SignIn';
import SignUp from '../Routes/Authentication/SignUp';

export const defaultRoutes: RouteItem[] = [
  {
    path: '/',
    Component: Authentication,
    children: [
      {
        index: true,
        Component: SignIn,
      },
      {
        path: 'sign-up',
        Component: SignUp,
      },
      {
        path: 'recover-password',
        Component: RecoverPassword,
      },
      {
        path: 'set-password',
        Component: SetPassword,
      },
    ],
  },
];

interface RouteItem {
    path?: string,
    index?: boolean,
    Component: JSXElementConstructor<ReactElement>,
    children?: {
        path?: string,
        index?: boolean,
        Component: JSXElementConstructor<ReactElement>,
    }[]
}

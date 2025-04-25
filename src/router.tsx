import * as Pages from './pages';
import { DefaultLayout } from './layouts';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Pages.HomePage />,
      },
      {
        path: 'market/:id',
        element: <Pages.MarketDetailPage />,
      },
    ],
  },
]);

export default router;

import * as Pages from './pages';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    index: true,
    element: <Pages.HomePage />,
  },
  {
    path: 'market/:id',
    element: <Pages.MarketDetailPage />,
  },
]);

export default router;

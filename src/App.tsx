import router from './router';
import { QueryClientProvider } from './providers';
import { RouterProvider } from 'react-router';

const App = () => (
  <QueryClientProvider>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;

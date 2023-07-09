import { Box } from '@chakra-ui/react';
import Provider from './provider/Provider';
import AppRoutes from './routes';

function App(): JSX.Element {
  return (
    <Provider>
      <AppRoutes />
    </Provider>
  );
}

export default App;

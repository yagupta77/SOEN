import React from 'react';
 import AppRoutes from './routes/AppRoutes';
import { UserProvider } from './context/user.context';
const App = () => <UserProvider><AppRoutes /></UserProvider>  ;

export default App;

import {Provider} from 'react-redux'
import AppRoutes from "./routes/AppRoutes"
import appStore from './utils/AppStore'
function App() {


  return (
    <>
    <Provider store={appStore}>

      <AppRoutes />
    </Provider>
    </>
  )
}

export default App

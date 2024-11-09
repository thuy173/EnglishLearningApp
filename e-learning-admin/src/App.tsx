import { Provider } from "react-redux";
import store from "./store/store";
import { ThemeContext } from "./context/ThemeContext";
import { TooltipProvider } from "./components/ui/tooltip";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router";

function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeContext defaultTheme='light' storageKey='ui-theme'>
          <TooltipProvider>
            <RouterProvider router={router} />
          </TooltipProvider>
        </ThemeContext>
      </Provider>
    </>
  )
}

export default App

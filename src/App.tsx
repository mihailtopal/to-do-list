import { useGetAuthQuery } from "./api/authAPI";
import "./App.css";
import LoginPageContainer from "./components/LoginPage/LoginPageContainer";
import { Routes, Route, Navigate } from "react-router-dom";
import TodoLists from "./components/TodoLists/TodoLists";
const App = () => {
  const { isLoading } = useGetAuthQuery();

  if (isLoading) {
    return <div>Загрузка</div>; // пока идет инициализация показываем прелоадер
  }
  console.log("APP!!!!!");
  return (
    <div>
      <div>
        <Routes>
          <Route path="/todolists" element={<TodoLists />} />
          <Route path="/login" element={<LoginPageContainer />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;

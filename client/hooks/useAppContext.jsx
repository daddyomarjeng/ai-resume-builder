import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const useAppContext = () => {
  const { resume, setResume } = useContext(AppContext);
  return {
    resume: resume,
    setResume: setResume,
  };
};

export default useAppContext;

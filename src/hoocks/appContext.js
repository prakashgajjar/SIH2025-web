import { createContext, useContext, useState } from 'react';

// 1. Create the context
const AppContext = createContext();

// 2. Provider component
export const AppProvider = ({ children }) => {
  const [mealPlanData, setMealPlanData] = useState(null);
  const [userData, setUserData] = useState(null);
    const [aiResponseDiet, setAIResponseDiet] = useState(null);

  return (
    <AppContext.Provider value={{aiResponseDiet, setAIResponseDiet,mealPlanData, setMealPlanData, userData, setUserData }}>
      {children}
    </AppContext.Provider>
  );
};

// 3. Custom hook to use context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }
  return context;
};

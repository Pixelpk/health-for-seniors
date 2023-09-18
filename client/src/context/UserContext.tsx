import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  FC,
} from "react";

// Define the shape of your user object
interface UserInfo {
  [key: string]: any;
}

// Create a context with the user object's type
export const UserContext = createContext<{
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}>({
  userInfo: null,
  setUserInfo: () => null,
});

// Define the props for your UserProvider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() =>
    JSON.parse(localStorage.getItem("user") || "null")
  );

  useEffect(() => {
    const userStoredInfo = localStorage.getItem("user");
    if (userStoredInfo) {
      setUserInfo(JSON.parse(userStoredInfo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

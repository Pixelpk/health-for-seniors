import React, { FC, ReactNode, createContext, useState } from "react";

// Define the shape of your user object
interface UserInfo {
  [key: string]: any;
}

// Create a context with the user object's type
export const FileSharingContext = createContext<{
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}>({
  userInfo: null,
  setUserInfo: () => null,
});

// Define the props for your FileSharingProvider component
interface FileSharingProviderProps {
  children: ReactNode;
}

export const FileSharingProvider: FC<FileSharingProviderProps> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  return (
    <FileSharingContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </FileSharingContext.Provider>
  );
};

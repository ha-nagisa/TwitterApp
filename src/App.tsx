import React, { useEffect } from "react";
import styles from "./App.module.css";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";
import Auth from "./components/Auth";
import Feed from "./components/Feed";

const App: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);
  return (
    <>
      {user.uid ? (
        <div className={styles.app}>
          <Feed />
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;

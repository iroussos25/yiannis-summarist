"use client";

import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { clearUser } from "@/app/redux/authSlice";
import UserNotLoggedIn from "@/components/UserNotLoggedIn";
import styles from "./Settings.module.css";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user, isLoading, isPremium } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      router.push("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) return <div className={styles.loadingContainer}>Loading settings...</div>;

  if (!user) return <UserNotLoggedIn />;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Settings</h1>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Subscription</h2>
        <div className={styles.card}>
          <p className={styles.statusText}>
            Status: <strong>{isPremium ? "Premium" : "Basic"}</strong>
          </p>
          {!isPremium && (
            <button className={styles.upgradeBtn} onClick={() => router.push('/plan')}>
              Upgrade to Premium
            </button>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Email</h2>
        <div className={styles.card}>
          <p className={styles.emailText}>{user.email}</p>
        </div>
      </div>

      <button className={styles.logoutBtn} onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/api/auth/firebaseConfig";
import { usePathname, useRouter } from "next/navigation";
import { setLoading, setUser } from "@/lib/features/authSlice";

export default function AuthWatcher() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                dispatch(setUser(user));
                if (!user) {
                    return router.push("/auth/signIn");
                }
            } finally {
                dispatch(setLoading(false));
            }
        }, undefined);

        return () => unsubscribe();
    }, [dispatch]);

    return null;
}

'use client';

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import Auth from "./auth";
import { closeLoginModal } from "@/app/redux/authSlice";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;

}

export default function LoginModal() {
    const isOpen = useAppSelector((state) => state.auth.isModalOpen);
    const dispatch = useAppDispatch();
    
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={() => dispatch(closeLoginModal())}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={() => dispatch(closeLoginModal())}>&times;</button>
            <Auth/>
            </div>
        </div>
    )

}
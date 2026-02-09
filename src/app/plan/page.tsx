"use client";

import React, { useEffect, useState } from "react";
import styles from "./Plan.module.css";
import { FaArrowLeft, FaChevronDown, FaChevronUp, FaFileAlt, FaHandshake } from "react-icons/fa";
import { RiPlantFill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { openLoginModal, setPremium } from "../redux/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";


const PlanPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector(state => state.auth);

   const handleSimulatedUpgrade = async () => {
    if (!user) {
      alert("Please log in to your guest account to see the Premium transition!");
      dispatch(openLoginModal());
      return;
    } 

   
    dispatch(setPremium(true));
    router.push("/success");

    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { 
        isPremium: true, 
        subscriptionStatus: 'premium' 
      }, { merge: true });
      
      console.log("Firestore updated successfully in the background!");
    } catch (e) {
      console.error("Background Firestore update failed:", e);
    }
  };

  

  const handleRealStripePayment = () => { 
    if (!user) {
        dispatch(openLoginModal());
    } else {
        router.push(`/checkout?plan=${selectedPlan}`);
    }
    };

    useEffect(() => {
      const originalOverflow = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "visible";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, []);  

  const faqs = [
    {
      q: "How does the free 7-day trial work?",
      a: "Begin your 7-day free trial with a Summarist annual plan. You are free to cancel at any time during the trial period. If you don't cancel, your paid subscription will start automatically.",
    },
    {
      q: "Can I switch plans later?",
      a: "Yes, you can easily switch between monthly and yearly billing or cancel your subscription at any time within your account settings.",
    },
    {
      q: "What is included in the Premium plan?",
      a: "Premium gives you unlimited access to every book summary in our library, audio versions of all summaries, and the ability to read offline.",
    },
  ];

  return (
    
    <div className={styles.fullWidthContainer}>

    <div className={styles.planContainer}>

      <div className={styles.planHero}>
        <div className={styles.planHeroText}>
            <h1 className={styles.planTitle} style={{color: 'white'}}>Get unlimited access to many amazing books to read</h1>
          <h2 className={styles.planSubtitle}>Turn ordinry moments into amazing learning opportunities</h2>
        </div>
       <div className={styles.arch}>
    <img
      src="/pricing-top.png"
      alt="Pricing Illustration"
      className={styles.planHeroImg}
    />
  </div>
</div>
      <div className={styles.heroWrapper}>
        <Link href="/for-you" className={styles.backToHomeLink}>
        <FaArrowLeft size={20} />
        <span>Back to Home</span>
        </Link>



<div className={styles.planFeaturesWrapper}>
    <div className={styles.planFeature}>
        <figure className={styles.planFeaturesIcon}>
            <FaFileAlt size={60} />
        </figure>
        <div className={styles.planFeaturesText}> <b>Key ideas in a few min</b> with many books to read </div>
    </div>
    <div className={styles.planFeature}>
        <figure className={styles.planFeaturesIcon}>
            <RiPlantFill size={60} />
        </figure>
        <div className={styles.planFeaturesText}> <b>3 million</b> people growing with Summarist every day</div>
    </div>
    <div className={styles.planFeature}>
        <figure className={styles.planFeaturesIcon}>
            <FaHandshake size={60} />
        </figure>
        <div className={styles.planFeaturesText}> <b>Precise recommendations</b> collections curated by experts</div>
    </div>
</div>

      <div className={styles.pricingSelection}>
        <div 
          className={`${styles.planOption} ${selectedPlan === "yearly" ? styles.active : ""}`}
          onClick={() => setSelectedPlan("yearly")}
          >
          <div className={styles.radio}></div>
          <div>
            <div style={{ fontWeight: 700 }}>Summarist Premium Yearly</div>
            <div style={{ fontSize: "20px", fontWeight: 700 }}>$99.99/year</div>
            <div style={{ color: "#6b7280" }}>7 days free, then $99.99/year</div>
          </div>
        </div>

        <div className={styles.separator}>

          <div className={styles.separatorLine}></div>
          <div className={styles.separatorText}>OR</div>
          <div className={styles.separatorLine}></div>
        
        </div>

        <div 
          className={`${styles.planOption} ${selectedPlan === "monthly" ? styles.active : ""}`}
          onClick={() => setSelectedPlan("monthly")}
          >
          <div className={styles.radio}></div>
          <div>
            <div style={{ fontWeight: 700 }}>Summarist Premium Monthly</div>
            <div style={{ fontSize: "20px", fontWeight: 700 }}>$9.99/month</div>
            <div style={{ color: "#6b7280" }}>No free trial, $9.99/month</div>
          </div>
        </div>

        
      </div>
      <div className={styles.ctaWrap}>
      <div className={styles.buttons}>
      <button className={styles.ctaButton} onClick={handleRealStripePayment}>
        {selectedPlan === "yearly" ? "Start your free 7-day trial" : "Start your Monthly subscription"}
      </button>
      <button 
    className={styles.demoButton} 
    onClick={handleSimulatedUpgrade}
    >
    Instant Demo: Unlock Premium
  </button>
      </div>
      <div className={styles.planDisclaimer}>Cancel your trial at any time before it ends,and you won't be charged.</div>

      </div>


      <div className={styles.accordionSection}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.accordionItem}>
            <div 
              className={styles.accordionHeader} 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
              {faq.q}
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`${styles.accordionContent} ${openIndex === index ? styles.open : ""}`}>
              {faq.a}
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
</div>
  );
};

export default PlanPage;

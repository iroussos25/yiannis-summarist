"use client";

import React, { useState } from "react";
import styles from "./Plan.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PlanPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      {/* Hero Graphic Section */}

      <div className={styles.planHero}>
        <div className={styles.planHeroText}>
            <h1 style={{color: 'white'}}>Get unlimited access to many amazing books to read</h1>
          <h2>Turn ordinry moments into amazing learning opportunities</h2>
        </div>
        <img 
          src="/pricing-top.png"
          alt="Pricing Illustration" 
          className={styles.planHeroImg} 
          />
    </div>

      {/* Pricing Selection */}
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

      <button className={styles.ctaButton}>
        {selectedPlan === "yearly" ? "Start your free 7-day trial" : "Start your Monthly subscription"}
      </button>

      {/* Accordion FAQ Section */}
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
  );
};

export default PlanPage;

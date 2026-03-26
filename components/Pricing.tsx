import React from "react";

const plans = [
    {
        name: "Starter",
        price: "$0",
        features: ["5 Hero Generations / mo", "Standard Resolution", "Community Support"],
        cta: "Start Free",
        featured: false,
    },
    {
        name: "Unlimited Pro",
        price: "$49",
        features: ["Infinite Hero Generations", "4K Ultra-HD Assets", "Custom Style Training", "Priority GPU Access"],
        cta: "Go Unlimited",
        featured: true,
    },
    {
        name: "Studio",
        price: "$199",
        features: ["Unlimited Teams", "API Access", "White-label Exports", "Dedicated Account Manager"],
        cta: "Contact Sales",
        featured: false,
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-bg px-8">
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-display italic text-text mb-6">Choose Your Power</h2>
                <p className="text-muted max-w-xl mx-auto italic">Scale your creative output with our simple, transparent plans.</p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`p-10 rounded-3xl border ${plan.featured ? 'border-accent bg-surface/50 scale-105 shadow-2xl shadow-accent/5' : 'border-stroke bg-bg'} flex flex-col items-center text-center transition-all duration-500 hover:translate-y--2`}
                    >
                        <h3 className="text-2xl font-display italic text-text mb-2">{plan.name}</h3>
                        <div className="text-4xl font-display italic text-text mb-8">{plan.price}<span className="text-sm text-muted">/mo</span></div>

                        <ul className="space-y-4 mb-10 flex-1">
                            {plan.features.map((feature, fIndex) => (
                                <li key={fIndex} className="text-muted text-sm flex items-center justify-center gap-2">
                                    <span className="text-accent">✓</span> {feature}
                                </li>
                            ))}
                        </ul>

                        <button className={`w-full py-4 rounded-full font-semibold transition-all duration-300 ${plan.featured ? 'bg-accent-gradient text-bg hover:opacity-90' : 'border border-stroke text-text hover:bg-surface'}`}>
                            {plan.cta}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

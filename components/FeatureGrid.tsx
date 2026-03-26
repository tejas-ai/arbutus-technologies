import React from "react";

const features = [
    {
        title: "Infinite Generation",
        description: "Never run out of inspiration with our proprietary character blooming engine.",
        icon: "∞",
    },
    {
        title: "4K Animated Delivery",
        description: "Every character is delivered as a high-resolution, production-ready asset.",
        icon: "🎥",
    },
    {
        title: "Custom Style Training",
        description: "Train the AI on your brand's unique 2D or 3D aesthetic for perfect consistency.",
        icon: "🎨",
    },
];

export default function FeatureGrid() {
    return (
        <section id="features" className="py-24 bg-[#010226] px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <div key={index} className="group p-8 rounded-2xl bg-[#020338]/40 backdrop-blur-md border border-white/10 hover:border-[#00b4d8]/40 transition-all duration-500 shadow-sm hover:shadow-xl">
                            <div className="text-4xl mb-6 bg-gradient-to-br from-[#023e8a] to-[#00b4d8] bg-clip-text text-transparent w-fit font-bold">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-display italic text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-white/60 leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

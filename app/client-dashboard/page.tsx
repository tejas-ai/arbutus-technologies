"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
    LayoutDashboard, 
    Package, 
    MessageSquare, 
    ShoppingCart, 
    Bell, 
    User, 
    ArrowRight,
    TrendingUp,
    Clock,
    Search
} from "lucide-react";

const ClientDashboard = () => {
    // Premium Color Palette
    const colors = {
        slateBlue: "#475569",
        softWhite: "#F8FAFC",
        accent: "#3B82F6",
        white: "#FFFFFF",
        slate50: "#F1F5F9",
        slate100: "#E2E8F0",
        slate500: "#64748B",
        slate900: "#0F172A",
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
            },
        },
    };

    const metrics = [
        { label: "Active Orders", value: "12", icon: ShoppingCart, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Pending Inquiries", value: "05", icon: MessageSquare, color: "text-slate-600", bg: "bg-slate-50" },
        { label: "Shipments", value: "03", icon: Package, color: "text-indigo-600", bg: "bg-indigo-50" },
    ];

    const quickActions = [
        { label: "New Inquiry", icon: MessageSquare },
        { label: "Track Order", icon: Package },
        { label: "Products", icon: Search },
    ];

    const activities = [
        { id: 1, title: "Inquiry #4201 Updated", time: "2 hours ago", status: "In Progress" },
        { id: 2, title: "Order #9882 Shipped", time: "5 hours ago", status: "Shipped" },
        { id: 3, title: "New Quotation Received", time: "Yesterday", status: "Action Required" },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans pb-24 overflow-y-auto custom-scrollbar">
            {/* Header */}
            <header className="px-6 pt-10 pb-6 flex justify-between items-center bg-white shadow-sm sticky top-0 z-10 transition-all duration-300">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Dashboard</h1>
                    <p className="text-[#64748B] text-sm">Welcome back, Tejas</p>
                </div>
                <div className="relative">
                    <button className="p-2 rounded-full hover:bg-slate-100 transition-colors duration-200">
                        <Bell className="w-6 h-6 text-slate-600" />
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>
            </header>

            <motion.main 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="px-6 mt-6 space-y-8 max-w-lg mx-auto"
            >
                {/* Metrics Grid */}
                <section className="grid grid-cols-2 gap-4">
                    {metrics.map((metric, idx) => (
                        <motion.div 
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className={`${metric.bg} p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between h-32 transition-all duration-300`}
                        >
                            <metric.icon className={`w-6 h-6 ${metric.color}`} />
                            <div>
                                <p className="text-3xl font-bold tracking-tight">{metric.value}</p>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{metric.label}</p>
                            </div>
                        </motion.div>
                    ))}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        className="bg-slate-900 p-5 rounded-3xl shadow-lg flex flex-col justify-between h-32 transition-all duration-300"
                    >
                        <TrendingUp className="w-6 h-6 text-blue-400" />
                        <div>
                            <p className="text-3xl font-bold tracking-tight text-white">+15%</p>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Growth</p>
                        </div>
                    </motion.div>
                </section>

                {/* Quick Actions */}
                <section className="space-y-4">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        Quick Actions
                    </h2>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                        {quickActions.map((action, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-none bg-white px-5 py-3 rounded-2xl shadow-md border border-slate-100 flex items-center gap-3 transition-shadow duration-300 hover:shadow-lg"
                            >
                                <div className="p-2 bg-slate-50 rounded-xl">
                                    <action.icon className="w-5 h-5 text-slate-600" />
                                </div>
                                <span className="font-bold text-sm whitespace-nowrap">{action.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </section>

                {/* Recent Activity */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold">Recent Activity</h2>
                        <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline">
                            View All <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {activities.map((activity) => (
                            <motion.div 
                                key={activity.id}
                                variants={itemVariants}
                                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50 flex items-center justify-between group hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">{activity.title}</p>
                                        <p className="text-xs text-slate-500">{activity.time}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                                    {activity.status}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </motion.main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-6 left-6 right-6 bg-slate-900 shadow-2xl rounded-full h-16 flex items-center justify-around px-2 z-20 border border-white/10 backdrop-blur-lg lg:max-w-md lg:mx-auto">
                <button className="p-3 text-blue-400 bg-white/10 rounded-full">
                    <LayoutDashboard className="w-6 h-6" />
                </button>
                <button className="p-3 text-slate-400 hover:text-white transition-colors">
                    <ShoppingCart className="w-6 h-6" />
                </button>
                <button className="p-3 text-slate-400 hover:text-white transition-colors">
                    <MessageSquare className="w-6 h-6" />
                </button>
                <button className="p-3 text-slate-400 hover:text-white transition-colors">
                    <User className="w-6 h-6" />
                </button>
            </nav>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default ClientDashboard;

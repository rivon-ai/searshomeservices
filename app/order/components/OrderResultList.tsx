"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { Appointment } from "../../services/appointmentService";

interface OrderResultListProps {
    orders: Appointment[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

// Format date for display (e.g., "Thursday, January 29")
function formatServiceDate(dateStr: string): string {
    // If already formatted, return as is
    if (dateStr.includes(',')) return dateStr;

    // Otherwise try to parse and format
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    } catch {
        return dateStr;
    }
}

// Format status for display
function formatStatus(status: string): string {
    return status.toUpperCase();
}

const OrderResultList: React.FC<OrderResultListProps> = ({
    orders,
    currentPage,
    totalPages,
    onPageChange
}) => {
    if (!orders || orders.length === 0) return null;

    return (
        <motion.div
            className="w-full mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Table */}
            <Table>
                <TableHeader>
                    <TableRow className="border-t border-gray-100 hover:bg-transparent">
                        <TableHead className="text-xs text-gray-500 font-medium">Order Number</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">Service Date</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium">Technician Arrival Window</TableHead>
                        <TableHead className="text-xs text-gray-500 font-medium text-center">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <AnimatePresence mode="wait">
                        {orders.map((order, index) => (
                            <motion.tr
                                key={order.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.05,
                                    ease: "easeOut"
                                }}
                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors group cursor-pointer"
                                whileHover={{
                                    backgroundColor: "rgb(249 250 251)",
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <TableCell className="py-6">
                                    <Link
                                        href={`/order/${order.id}`}
                                        className="text-[#0046BE] font-bold text-sm hover:underline">
                                        {order.id}
                                    </Link>
                                </TableCell>
                                <TableCell className="py-6">
                                    <Link
                                        href={`/order/${order.id}`}
                                        className="text-[#0046BE] font-medium text-sm">
                                        {formatServiceDate(order.serviceDate)}
                                    </Link>
                                </TableCell>
                                <TableCell className="py-6">
                                    <Link
                                        href={`/order/${order.id}`}
                                        className="text-[#0046BE] font-medium text-sm">
                                        {order.serviceTime}
                                    </Link>
                                </TableCell>
                                <TableCell className="py-6">
                                    <Link
                                        href={`/order/${order.id}`}
                                        className="flex items-center gap-2 justify-center">
                                        <span className="text-[#0046BE] font-bold text-xs tracking-wider uppercase">
                                            {formatStatus(order.status)}
                                        </span>
                                        <motion.div
                                            whileHover={{ x: 3 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronRight className="text-gray-300 w-5 h-5 group-hover:text-[#0046BE] transition-colors" />
                                        </motion.div>
                                    </Link>
                                </TableCell>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </TableBody>
            </Table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <motion.div
                    className="flex items-center gap-4 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`text-2xl leading-none transition-colors ${currentPage === 1
                            ? 'text-gray-200 cursor-not-allowed'
                            : 'text-[#0046BE] hover:text-[#00388C] cursor-pointer'
                            }`}
                        aria-label="Previous page"
                        whileHover={currentPage !== 1 ? { scale: 1.1 } : {}}
                        whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </motion.button>

                    <motion.span
                        className="text-sm text-gray-600"
                        key={currentPage}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        Page {currentPage} of {totalPages}
                    </motion.span>

                    <motion.button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`text-2xl leading-none transition-colors ${currentPage === totalPages
                            ? 'text-gray-200 cursor-not-allowed'
                            : 'text-[#0046BE] hover:text-[#00388C] cursor-pointer'
                            }`}
                        aria-label="Next page"
                        whileHover={currentPage !== totalPages ? { scale: 1.1 } : {}}
                        whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default OrderResultList;

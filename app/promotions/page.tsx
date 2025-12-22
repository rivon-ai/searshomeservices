import React from 'react'
import TabSection from './components/TabSection'

export default function page() {
    return (
        <div>
            <div className="max-w-7xl mx-auto px-4">
                <div className="relative">
                    {/* Background Image */}
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
                        alt="Family on couch"
                        className="w-full h-64 object-cover rounded-lg"
                    />

                    {/* Overlay Card */}
                    <div className="absolute inset-0 top-1/2 flex items-center justify-center px-4">
                        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md">
                            <h2 className="text-[#003d82] text-2xl font-bold mb-4">
                                Sears appliance coupons and deals
                            </h2>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                Looking for sales and deals? You're in the right place. Sears Home Services offers expert appliance repair you can count on.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <TabSection />
        </div>
    )
}
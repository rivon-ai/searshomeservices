import React from "react";
import Link from "next/link";

const AppointmentInfo = () => {
    return (
        <div className="w-full ml-auto mt-8 lg:mt-0">
            <div className="text-center lg:text-left">
                <h2 className="text-[#002855] text-lg mb-6">
                    Manage your appointment:
                </h2>

                <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm lg:text-base mx-auto lg:mx-0 max-w-xs lg:max-w-none text-left inline-block lg:block">
                    <li>Cancel or reschedule</li>
                    <li>Get up-to-date info about technician arrival</li>
                    <li>Sign up for text message alerts for up to 4 phone numbers</li>
                </ul>

                <div className="mt-12 text-[#002855]">
                    <span className="text-gray-600">Have an account? </span>
                    <Link href="/signin" className="text-[#004BBC] hover:underline">
                        Sign in here
                    </Link>
                </div>

                <div className="text-gray-500 space-y-3 my-6">
                    <h2 className="text-2xl text-black font-semibold uppercase">
                        FINDING YOUR ORDER NUMBER
                    </h2>

                    <p>
                        If you provided an email address when you scheduled your appointment, you should have received an email containing your Service Order Number. To find your number, please:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>Go to your email inbox.</li>
                        <li>Search for "Sears Home Services" (make sure to look in your junk folder).</li>
                        <li>Open the email and look for "Order Number".</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default AppointmentInfo;

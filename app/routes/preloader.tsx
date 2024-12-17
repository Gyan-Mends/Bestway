import { Button } from "@nextui-org/react";
import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import LoaderIcon from "~/components/icons/LoaderIcon";
import OfflineIcon from "~/components/icons/OfflineIcon";
import landingPageIllustration from "~/components/illustration/landingPageIllustration.jpg";
import landingPageLogo from "~/components/illustration/landingPageLogo.png";
import Offline from "~/components/modal/OfflineModal";

const LandingPage = () => {
    return (
        <Offline redirectTo="/login" className="h-[100vh]">
            {/* Background image */}
            <div className="w-full h-[100vh] relative">
                <img
                    className="w-full h-[100vh] object-cover"
                    src={landingPageIllustration}
                    alt="Landing Page Illustration"
                />
            </div>

            {/* Overlay content */}
            <div className="w-full h-[100vh] backdrop-blur absolute top-0 left-0 bg-black bg-opacity-70 flex flex-col items-center justify-center gap-4">
                <div className="rounded-xl shadow-sm w-60 h-60 bg-white">
                    <img
                        className="w-60 h-60 rounded-xl"
                        src={landingPageLogo}
                        alt="Landing Page logo"
                    />
                </div>
                <div>
                    <p className="font-nunito font-semibold text-2xl">
                        Point Of Sales
                    </p>
                </div>
                <div>
                    <LoaderIcon className="text-white w-10 h-10" />
                </div>
                <div>
                    <p className="font-nunito font-semibold">
                        Welcome To Our Store
                    </p>
                </div>
            </div>
        </Offline>
    );
};

export default LandingPage;

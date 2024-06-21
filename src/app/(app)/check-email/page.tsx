import LogoBadge from "../../../packages/client/component/LogoBadge";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import allBotsSrc from "../../../packages/client/assets/all-robots.png";
import logoSrc from "../../../packages/client/assets/cyobot-logo.png";
const CheckEmailPage: FC = () => {
  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <section
        className={`bg-brand-purple-dark rounded-xl shadow-lg p-4 w-2/3 lg:w-1/2 h-1/3 lg:h-[55%] max-w-3xl max-h-[30rem] overflow-autoflex flex-col justify-between transform transition-all duration-300 `}
      >
        <div className="h-full flex flex-col justify-evenly">
          <div className="mx-auto">
            <LogoBadge description={""} src={logoSrc.src} />
          </div>
          <h1 className="text-center text-brand-green text-4xl xl:text-5xl font-vt323">
            Email has been sent.
            <br /> Please check your mailbox.
          </h1>
          <p className="mx-auto w-4/5 text-white font-robotoRegular text-lg lg:text-xl xl:text-2xl text-center">
            We have robots!{" "}
            <span className="underline underline-offset-4">
              <Link
                href="https://cyobot.myshopify.com/"
                className="hover:animate-pulse hover:text-brand-green"
              >
                Check us out
              </Link>
            </span>
          </p>
          <div className="mx-auto">
            <div className="relative flex-shrink-0 h-24 w-24 sm:h-28 sm:w-28 md:h-44 md:w-96">
              <Image
                src={allBotsSrc.src}
                alt="logo"
                quality={100}
                fill
                sizes="100vw"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CheckEmailPage;

import LogoBadge from "../../packages/client/component/LogoBadge";
import { FC } from "react";
import logoSrc from "../../packages/client/assets/cyobot-logo.png";
import Button from "../../packages/client/component/form/form-button/FormButton";
const WelcomePage: FC = () => {
  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <section className="container bg-brand-purple-dark rounded-xl shadow-lg p-4 w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 xl:min-w-[673px] max-h-400:h-[90%] h-2/3 sm:h-1/3 md:h-[55%] lg:h-1/2 max-h-[30rem] overflow-autoflex flex-col justify-between transform transition-all duration-300">
        <div className="h-full flex flex-col justify-evenly">
          <div className="mx-auto">
            <LogoBadge description={""} src={logoSrc.src} />
          </div>
          <h1 className="text-center text-brand-green text-3xl sm:text-[2rem] md:text-4xl lg:text-[2.5rem] xl:text-5xl font-vt323">
            Welcome to your Robotics Quest
          </h1>
          <p className="mx-auto w-full text-white font-robotoRegular text-base sm:text-lg md:text-xl xl:text-2xl text-center">
            Which career paths in engineering suits you the most?
            <br /> Start your adventure with Robotics Quest to find out.
          </p>
          <div className="w-1/2 sm:w-1/3 mx-auto mt-3">
            <Button type="button" label="START QUIZ" link="/quiz" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default WelcomePage;

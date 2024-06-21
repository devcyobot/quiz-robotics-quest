import LogoBadge from "../../packages/client/component/LogoBadge";
import { FC } from "react";
import logoSrc from "../../packages/client/assets/cyobot-logo.png";
import Button from "../../packages/client/component/form/form-button/FormButton";
const WelcomePage: FC = () => {
  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <section
        className={`bg-brand-purple-dark rounded-xl shadow-lg p-4 w-2/3 lg:w-1/2 h-1/3 lg:h-1/2 max-w-3xl max-h-[30rem] overflow-autoflex flex-col justify-between transform transition-all duration-300 `}
      >
        <div className="h-full flex flex-col justify-evenly">
          <div className="mx-auto">
            <LogoBadge description={""} src={logoSrc.src} />
          </div>
          <h1 className="text-center text-brand-green text-4xl xl:text-5xl font-vt323">
            Welcome to your Robotics Quest
          </h1>
          <p className="mx-auto w-full text-white font-robotoRegular text-lg lg:text-xl xl:text-2xl text-center">
            Which career paths in engineering suits you the most?
            <br /> Start your adventure with Robotics Quest to find out.
          </p>
          <div className="w-1/3 mx-auto mt-3">
            <Button type="button" label="START QUIZ" link="/quiz" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default WelcomePage;

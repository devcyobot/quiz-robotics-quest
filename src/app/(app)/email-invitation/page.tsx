"use client";
import FormInput from "../../../packages/client/component/form/input/FormInput";
import LogoBadge from "../../../packages/client/component/LogoBadge";
import { redirect } from "next/navigation";
import { FC, useActionState, useEffect, useState } from "react";
import logoSrc from "../../../packages/client/assets/cyobot-logo.png";
import SubmitButton from "../../../packages/client/component/form/form-button/FormButton";
import { useQuiz } from "../../../packages/client/context/QuizContext";
import {
  SubmitResult,
  SubmitQuiz,
} from "../../../packages/client/context/types";

export const formSubmit = async (
  previousState: SubmitResult | null,
  formData: FormData,
  submit: SubmitQuiz
) => {
  const formObject = {
    email: (formData.get("email") as string) || "",
  };

  const res = await submit(formObject);

  return res;
};

const EmailInvitaionPage: FC = () => {
  //   const [loading, setLoading] = useState(false);
  //   const [message, setMessage] = useState<string | null>(null);
  const [tempData, setTempData] = useState(false);
  const { submitQuiz, totalPages, answers } = useQuiz();
  // const [data, formAction] = useActionState(
  //   (previousState: SubmitResult | null, formData: FormData) =>
  //     formSubmit(previousState, formData, submitQuiz),
  //   null
  // );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.currentTarget);
    // setLoading(true);
    setTempData(true);
    // formAction(formData);
  };

  //   Submit the quiz after user has answered all questions
  useEffect(() => {
    if (tempData) {
      //   setLoading(false);
      redirect("/check-email");
    }
  }, [tempData]);

  return (
    <main className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50">
      <section
        className={`bg-brand-purple-dark rounded-xl shadow-lg w-2/3 lg:w-1/2 h-1/3 lg:h-[55%] max-w-2xl max-h-[30rem] overflow-autoflex flex-col justify-between transform transition-all duration-300 `}
      >
        <div className="h-full flex flex-col justify-evenly">
          <div className="mx-auto h-10">
            <LogoBadge description={""} src={logoSrc.src} />
          </div>
          <h1 className="text-center text-brand-green text-4xl xl:text-5xl font-vt323">
            Enter your email to continue
          </h1>
          <form
            className="flex flex-col justify-between mx-auto w-4/5"
            onSubmit={handleSubmit}
          >
            <label className="text-lg lg:text-xl xl:text-2xl text-white font-robotoRegular grid grid-cols-[1fr_6fr] items-center">
              Name
              <FormInput typeInput="text" name="full-name" placeHolder="Name" />
            </label>
            <label className="text-lg lg:text-xl xl:text-2xl text-white font-robotoRegular mt-3 grid grid-cols-[1fr_6fr] items-center">
              Email
              <FormInput typeInput="email" name="email" placeHolder="Email" />
            </label>
          </form>
          <div className="w-1/4 mx-auto">
            <SubmitButton
              type="button"
              label="GET RESULT"
              link="/check-email"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default EmailInvitaionPage;

"use client";
import FormInput from "./input/FormInput";
import LogoBadge from "../../component/LogoBadge";
import { redirect } from "next/navigation";
import { FC, useEffect, useState } from "react";
import logoSrc from "../../assets/cyobot-logo.png";
import SubmitButton from "./form-button/FormButton";
import { useQuiz } from "../../context/QuizContext";
import { SubmitResult, SubmitQuiz } from "../../context/types";
import { useFormState } from "react-dom";
import Popup from "../Popup";

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

const EmailInvitaion: FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const { submitQuiz, totalPages, answers } = useQuiz();
  const [data, formAction] = useFormState(
    (previousState: SubmitResult | null, formData: FormData) =>
      formSubmit(previousState, formData, submitQuiz),
    null
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.currentTarget);

    console.log(formData.keys);
    setLoading(true);
    formAction(formData);
  };

  //   Submit the quiz after user has answered all questions
  useEffect(() => {
    if (data?.success) {
      setLoading(false);
      redirect("/check-email");
    } else {
      if (data?.message) {
        if (
          data.message ===
          "Error sending email: 422 validation_error - Invalid `to` field. The email address needs to follow the `email@example.com` or `Name <email@example.com>` format."
        )
          setMessage(
            "The email address needs to follow the `email@example.com` or `Name <email@example.com>` format."
          );
        else setMessage("Invalid. Please try again.");
        setShowPopup(true);
      }
    }
  }, [data]);

  return (
    <main className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50">
      <section className="container bg-brand-purple-dark rounded-xl shadow-lg w-auto sm:w-2/3 lg:w-1/2 xl:w-1/3 xl:min-w-[673px] max-h-400:h-[75%] h-1/2 md:h-4/5 lg:h-[55%] max-h-[25rem] overflow-autoflex flex-col justify-between transform transition-all duration-300">
        <div className="h-full flex flex-col justify-evenly">
          <div className="mx-auto h-10">
            <p className="sr-only">CYOBot Company</p>
            <LogoBadge description={""} src={logoSrc.src} />
          </div>
          <h1 className="text-center text-brand-green text-3xl sm:text-[2rem] md:text-4xl lg:text-[2.5rem] xl:text-5xl font-vt323 mx-5 sm:mx-0">
            Enter your email to continue
          </h1>
          <form className="mx-auto w-4/5" onSubmit={handleSubmit}>
            <label className="text-base sm:text-lg md:text-xl xl:text-2xl text-white font-robotoRegular mt-3 grid grid-cols-[1fr_4fr] sm:grid-cols-[1fr_6fr] items-center">
              Email
              <FormInput typeInput="email" name="email" placeHolder="Email" />
            </label>
            <div className="w-1/2 sm:w-1/3 mx-auto mt-8 sm:mt-10">
              <SubmitButton
                type="submit"
                label="GET RESULTS"
                disabled={loading}
              />
            </div>
          </form>
          {showPopup && (
            <Popup message={`${message}`} onClose={() => setShowPopup(false)} />
          )}
        </div>
      </section>
    </main>
  );
};

export default EmailInvitaion;

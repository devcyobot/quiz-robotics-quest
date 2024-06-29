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
import Link from "next/link";

export const formSubmit = async (
  previousState: SubmitResult | null,
  formData: FormData,
  submit: SubmitQuiz
) => {
  let marketingCheck = formData.get("marketing");

  const formObject = {
    email: (formData.get("email") as string) || "",
    displayName: (formData.get("displayName") as string) || "",
    isMarketingConsent: (formData.get("marketing") as string) || "false",
  };

  const res = await submit(formObject);

  return res;
};

const EmailInvitaion: FC = () => {
  // const [termsChecked, setTermsChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);
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
    if (Object.keys(answers).length !== 10) {
      setMessage("You haven't answered the questions.");
      setShowPopup(true);
      return;
    }
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
      <section className="container bg-brand-purple-dark rounded-xl shadow-lg w-auto sm:w-[80%] md:w-[75%] lg:w-[60%] xl:w-[55%] xl:min-w-[673px] max-w-[45rem] max-h-400:h-[98%] min-h-[30rem] h-1/2 md:h-[65%] lg:h-[70%] xl:h-[75%] max-h-[45rem] overflow-auto flex flex-col justify-between transform transition-all duration-300">
        <div className="h-full flex flex-col justify-evenly">
          <div className="mx-auto h-10">
            <p className="sr-only">CYOBot Company</p>
            <LogoBadge description={""} src={logoSrc.src} />
          </div>
          <h1 className="text-center text-brand-green text-3xl sm:text-[2rem] md:text-4xl lg:text-[2.5rem] xl:text-5xl font-vt323 mx-5 sm:mx-0">
            Enter your email to continue
          </h1>
          <form
            className="flex flex-col justify-evenly mx-auto w-[90%] sm:w-[85%] h-[55%]"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="displayName"
              className="text-base sm:text-lg md:text-xl xl:text-2xl text-white font-robotoRegular mt-3 grid grid-cols-[1fr_4fr] sm:grid-cols-[1fr_6fr] items-center"
            >
              Name
              <FormInput
                typeInput="text"
                name="displayName"
                placeHolder="Name"
                id="displayName"
              />
            </label>
            <label className="text-base sm:text-lg md:text-xl xl:text-2xl text-white font-robotoRegular mt-3 grid grid-cols-[1fr_4fr] sm:grid-cols-[1fr_6fr] items-center">
              Email
              <FormInput
                typeInput="email"
                name="email"
                placeHolder="Email"
                id="email"
              />
            </label>
            <div className="font-robotoRegular flex flex-col justify-evenly gap-y-2 h-1/4 w-full my-5">
              <label
                htmlFor="terms"
                className="grid grid-cols-[1fr_15fr] gap-x-3 sm:gap-x-0 text-xs md:text-sm text-white w-full"
              >
                <input
                  type="checkbox"
                  id="terms"
                  value="terms"
                  name="terms"
                  // checked={termsChecked}
                  // onChange={(e) => setTermsChecked(e.target.checked)}
                  className="h-5 w-5"
                  required
                />
                <p>
                  By checking this, you agree to our
                  <Link
                    passHref={true}
                    target="_blank"
                    href="https://www.roboticsquest.com/cyobot-terms-and-conditions.pdf"
                    className="underline mx-1"
                  >
                    Terms & Conditions
                  </Link>
                  and
                  <Link
                    passHref={true}
                    target="_blank"
                    href="https://www.roboticsquest.com/cyobot-privacy-policy.pdf"
                    className="underline mx-1"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </label>
              <label
                htmlFor="marketing"
                className="grid grid-cols-[1fr_15fr] text-xs md:text-sm text-white w-full"
              >
                <input
                  type="checkbox"
                  id="marketing"
                  value="true"
                  name="marketing"
                  checked={marketingChecked}
                  onChange={(e) => setMarketingChecked(e.target.checked)}
                  className="mr-2 h-5 w-5"
                />
                By checking this, you agree to receive marketing communications
                regarding services and offerings
              </label>
            </div>
            <div className="w-1/2 sm:w-1/3 mx-auto">
              <SubmitButton
                type="submit"
                label="GET RESULT"
                disabled={loading}
              />
            </div>
          </form>
          {showPopup && (
            <Popup
              message={`${message}`}
              label1={"START QUIZ"}
              link1="/quiz"
              onClose={() => setShowPopup(false)}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default EmailInvitaion;

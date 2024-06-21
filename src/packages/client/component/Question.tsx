import { FC } from "react";
import Option from "./Option";

type QuestionProps = {
  description: string;
  options: string[];
  //   index: number;
};
const Question: FC<QuestionProps> = ({ description, options }) => {
  return (
    <section className="h-full w-[90%] flex flex-col place-content-center m-auto">
      <h2 className="font-vt323 text-white text-3xl text-center h-1/2 w-full py-10">
        {description}
      </h2>
      <ul className="h-1/2 w-full grid grid-cols-2 grid-rows-2">
        {options.map((item, i) => (
          <Option key={i} width={130} height={20} text={item} />
        ))}
      </ul>
    </section>
  );
};

export default Question;

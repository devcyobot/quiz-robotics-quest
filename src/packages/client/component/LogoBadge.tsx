import Image from "next/image";
import { FC } from "react";

type LogoBadgeProps = {
  description: string;
  src: string;
};

const LogoBadge: FC<LogoBadgeProps> = ({ description, src }) => {
  return (
    <div className="flex items-center ml-2 sm:ml-1 md:ml-0 lg:ml-0">
      <div className="relative flex-shrink-0 w-32 h-6 lg:h-10">
        <Image
          src={src}
          alt="logo"
          quality={100}
          fill
          sizes="(max-width: 640px) 80px, (max-width: 768px) 90px, (max-width: 1024px) 100px, 120px"
          style={{ objectFit: "contain" }}
        />
      </div>
      <span className="font-robotoRegular text-white text-base sm:text-lg md:text-xl ml-2 sm:ml-3 md:ml-4 lg:ml-2">
        {description}
      </span>
    </div>
  );
};

export default LogoBadge;

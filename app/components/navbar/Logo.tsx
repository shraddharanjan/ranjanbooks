"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      className="hidden shrink-0 md:block"
      aria-label="Go to homepage"
    >
      <Image
        src="/images/logo.png"
        alt="Ranjan Books"
        width={72}
        height={72}
        className="h-[72px] w-[72px] object-contain"
        priority
      />
    </button>
  );
};

export default Logo;
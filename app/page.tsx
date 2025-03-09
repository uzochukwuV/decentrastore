import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex items-center justify-between gap-4 py-8 md:py-10">
      <div className=" flex flex-col justify-start items-start">
        <div className="inline-block max-w-xl space-y-6">

          <span className={title()}>Grow&nbsp;</span>
          <span className={title({ color: "violet" })}>Together&nbsp;</span>
          <br />
          <span className={title()}>
            Trade to Future
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Decentralized marketplace connecting buyers, and sellers innovators in a transparent ecosystem.
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "lg",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Start Trading
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "lg" })}
            href={siteConfig.links.github}
          >
            List Products
          </Link>
        </div>
      </div>
      <div>
        <div className=" grid grid-cols-2  auto-rows-[100px] gap-6 rounded-3xl rounded-tl-[30%] overflow-hidden">
          <Image src={"/images/weed.jpg"} className=" row-span-3 rounded-md h-full" alt="agricultural produce" width={300} height={200} />
          <Image src={"/images/lettus.jpg"} className=" row-span-2 rounded-md h-full" alt="fresh lettuce" width={300} height={200} />
          <Image src={"/images/seedling.jpg"} className=" row-span-2 rounded-md h-full" alt="growing seedling" width={300} height={200} />
          <Image src={"/images/virtual.jpg"} className="row-span-1 rounded-md h-full" alt="digital farming" width={300} height={200} />
        </div>
      </div>
    </section>
  );
}


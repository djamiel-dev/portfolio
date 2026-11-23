import Image from "next/image";
import about from "@/app/about/about.module.css";
import c from "./case.module.css";

/**
 * Next case: one large link at the foot of a case, so nobody hits a dead end. Hover as a homepage card. The image is the one each case
 * already showed there (some flat, some on a device); the link text already says where it goes, so it has no alt.
 */
export function NextCase({
  href,
  title,
  image,
  flat = false,
}: {
  href: string;
  title: string;
  image: { src: string; width: number; height: number };
  flat?: boolean; // a flat screenshot instead of a device: gets the small rounding of a screen
}) {
  return (
    // data-case: "View case" at the pointer, as on the homepage cards (CaseCursor on the page)
    <a href={href} className={c.next} data-case>
      <span className={c.nextText}>
        <span className={about.label}>Next case</span>
        <span className={c.nextTitle}>
          <span>{title}</span>
        </span>
      </span>
      <Image
        className={flat ? `${c.nextImage} ${c.nextFlat}` : c.nextImage}
        src={image.src}
        alt=""
        width={image.width}
        height={image.height}
        sizes="(max-width: 768px) 60vw, 320px"
      />
    </a>
  );
}

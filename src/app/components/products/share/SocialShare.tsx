"use client";
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";

export default function SocialShareWrapper({ itemUrl }: { itemUrl: string }) {
  return (
    <section className="flex gap-3 mt-3">
      <FacebookShareButton
        url={itemUrl}
        quote={"Discover top cosmetics"}
        hashtag={"#cosmetics"}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TelegramShareButton url={itemUrl} title={"Discover top cosmetics"}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <TwitterShareButton url={itemUrl} title={"Discover top cosmetics"}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </section>
  );
}

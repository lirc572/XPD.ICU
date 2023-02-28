import LemonIcon from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/lemon-2.tsx";
import BrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/brand-github.tsx";

export default function Footer() {
  return (
    <div class="bg-white flex flex-col sm:flex-row w-full gap-8 sm:gap-16 px-8 py-8 text-sm bottom-0 bg-gray-100">
      <div class="flex-1">
        <div class="flex items-center gap-1">
          <LemonIcon class="inline-block" />
          <div class="font-bold text-2xl">
            XPD Tracking
          </div>
        </div>
        <div class="text-gray-500">
          Xiao-Po-Dao package tracking (unofficial)
        </div>
        <div class="text-gray-500">
          Official tracking website:{" "}
          <a
            href="http://gzdgj.kingtrans.net/WebTrack"
            target="_blank"
            class="underline hover:text-black"
          >
            link
          </a>
        </div>
      </div>

      <div class="text-gray-500 space-y-2 text-right">
        <div class="text-xs">
          Copyright © 2023-Present &nbsp;
          <a href="https://github.com/lirc572" target="_blank" class="hover:text-black">
            lirc572
          </a>
          <br />
          All right reserved.
        </div>

        <a
          href="https://github.com/lirc572/XPD.ICU"
          class="inline-block hover:text-black"
        >
          <BrandGithub />
        </a>
      </div>
    </div>
  );
}

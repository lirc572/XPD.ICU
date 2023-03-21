import { Head } from "$fresh/runtime.ts";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

export default function About() {
  return (
    <div
      class="w-screen min-h-screen flex flex-col bg-gray-200 bg-repeat"
      style="background-image: url(/grid.svg)"
    >
      <Head>
        <title>XPD Package Tracking</title>
      </Head>
      <Header active="/about" />
      <div class="p-4 mx-auto flex-1 max-w-screen-md">
        <p class="my-6">
          Welcome to XPD Package Tracking!
        </p>
        <p class="my-6">
          This web app simplifies XPD package tracking, built with ❤️ using{" "}
          <a
            href="https://fresh.deno.dev/"
            target="_blank"
            class="text-blue-500"
          >
            fresh 🍋
          </a>.
        </p>
        <p class="my-6">
          Contact{" "}
          <a
            href="mailto:lirc572@gmail.com"
            target="_blank"
            class="text-blue-500"
          >
            lirc572@gmail.com
          </a>{" "}
          for removal request.
        </p>
        <p class="my-6">
          Official tracking website:{" "}
          <a
            href="http://gzdgj.kingtrans.net/WebTrack"
            target="_blank"
            class="text-blue-500"
          >
            gzdgj.kingtrans.net/WebTrack
          </a>
        </p>
      </div>
      <Footer />
    </div>
  );
}

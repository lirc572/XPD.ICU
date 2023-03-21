import { Head } from "$fresh/runtime.ts";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import OrderForm from "../islands/OrderForm.tsx";

export default function Home() {
  return (
    <div
      class="w-screen min-h-screen flex flex-col bg-gray-200 bg-repeat"
      style="background-image: url(/grid.svg)"
    >
      <Head>
        <title>XPD Package Tracking</title>
      </Head>
      <Header active="/" />
      <div class="p-4 mx-auto flex flex-col flex-1 max-w-screen-md">
        <div class="my-auto">
          <OrderForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}

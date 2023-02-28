import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import PackageBasicInfo from "../components/PackageBasicInfo.tsx";
import HistoryTable from "../islands/HistoryTable.tsx";

import { getTrackingInfo, TrackingInfo } from "../utils/api.ts";

export const handler: Handlers<TrackingInfo | null> = {
  async GET(_, ctx) {
    const { order_id } = ctx.params;
    try {
      const trackingInfo = await await getTrackingInfo(order_id);
      return ctx.render(trackingInfo);
    } catch (e) {
      return ctx.render(null);
    }
  },
};

export default function TrackingInfoPage(
  { data }: PageProps<TrackingInfo | null>,
) {
  return (
    <div
      class="w-screen h-screen flex flex-col bg-gray-200"
      style="background-image: url(/grid.svg)"
    >
      <Head>
        <title>XPD Package Tracking</title>
      </Head>
      <Header active="/tracking" />
      <div class="p-4 mx-auto max-w-full flex flex-col gap-10 flex-1">
        {data
          ? (
            <>
              <PackageBasicInfo data={data} />
              <HistoryTable data={data} />
            </>
          )
          : <></>}
      </div>
      <Footer />
    </div>
  );
}

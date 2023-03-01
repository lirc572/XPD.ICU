import { HandlerContext } from "$fresh/server.ts";
import { getTrackingInfo, TrackingInfo } from "../../../utils/api.ts";

export const handler = async (_req: Request, ctx: HandlerContext<TrackingInfo>): Promise<Response> => {
  try {
    const trackingInfo = await getTrackingInfo(
      ctx.params.order_id,
    );
    return new Response(JSON.stringify(trackingInfo, null, 2), {
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }, null, 2), {
      status: 500,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  }
};

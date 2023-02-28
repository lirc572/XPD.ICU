import { HandlerContext } from "$fresh/server.ts";
import { getTrackingInfo } from "../../utils/api.ts";

export const handler = async (req: Request, _ctx: HandlerContext): Promise<Response> => {
  try {
    const url = new URL(req.url);
    const oid = url.searchParams.get("oid");
    if (!oid) {
      throw new Error("Missing order ID");
    }
    const trackingInfo = await getTrackingInfo(
      oid ?? "",
    );
    return new Response(JSON.stringify(trackingInfo), {
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  }
};

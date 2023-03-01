import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";

export interface TrackingInfo {
  bill_id: string | undefined;
  channel_id: string | undefined;
  package_type: string | undefined;
  country_cn: string | undefined;
  country_en: string | undefined;
  last_status_time: string | undefined;
  last_status_location_cn: string | undefined;
  last_status_desc_cn: string | undefined;
  last_status_desc_en: string | undefined;
  num_packages: string | undefined;
  weight: string | undefined;
  track_status: string | undefined;
  history: {
    time: string | undefined;
    status_cn: string | undefined;
    desc_cn: string | undefined;
    desc_en: string | undefined;
  }[];
}

export async function getTrackingInfo(oid: string, verbose = true) {
  if (verbose) {
    console.log("Requesting tracking info for order ID", oid);
  }
  const url = "http://gzdgj.kingtrans.net/WebTrack?action=repeat";
  const res = await fetch(url, {
    "headers": {
      "accept": "application/xml, text/xml, */*; q=0.01",
      "accept-language":
        "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,ja;q=0.6,zh-TW;q=0.5",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "JSESSIONID=63299F963694DA829F6779D5FCC51172",
      "Referer": "http://gzdgj.kingtrans.net/WebTrack?action=list",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    "body": `index=0&billid=${oid}&isRepeat=no&language=zh`,
    "method": "POST",
  });
  const xmlRes = await res.text();
  //   const contentType = res.headers.get("content-type");
  //   const mimeType = contentType?.split(";")[0] || "text/xml";
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(
    xmlRes,
    // mimeType as DOMParserSupportedType,
    "text/html",
  );
  if (xmlDoc === null) {
    throw new Error("Failed to parse XML");
  }
  const trackElem = xmlDoc.getElementsByTagName("track")[0];
  const result = {
    bill_id: trackElem.getAttribute("billid") ?? undefined,
    channel_id: trackElem.getAttribute("rchannelid") ?? undefined,
    package_type: trackElem.getAttribute("goodstype") ?? undefined,
    country_cn: trackElem.getAttribute("country") ?? undefined,
    country_en: trackElem.getAttribute("countryEn") ?? undefined,
    last_status_time: trackElem.getAttribute("sdate") ?? undefined,
    last_status_location_cn: trackElem.getAttribute("desti") ?? undefined,
    last_status_desc_cn: trackElem.getAttribute("intro")?.split("  ")[0],
    last_status_desc_en: trackElem.getAttribute("intro")?.split("  ")[1],
    num_packages: trackElem.getAttribute("goodsnum") ?? undefined,
    weight: trackElem.getAttribute("rweight") ?? undefined,
    track_status: trackElem.getAttribute("trackstatus") ?? undefined, // what is this?
    history: Array.from(xmlDoc.getElementsByTagName("trackitem")).map(
      (item) => {
        return {
          time: item.getAttribute("sdate") ?? undefined,
          status_cn: item.getAttribute("place") ?? undefined,
          desc_cn: item.getAttribute("intro")?.split("  ")[0],
          desc_en: item.getAttribute("intro")?.split("  ")[1],
        };
      },
    ),
  };
  // console.log('Got tracking info', result);
  return result;
}

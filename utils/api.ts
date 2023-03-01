import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";

export interface TrackingInfo {
  bill_id: string | null;
  channel_id: string | null;
  package_type: string | null;
  country_cn: string | null;
  country_en: string | null;
  last_status_time: string | null;
  last_status_location_cn: string | null;
  last_status_desc_full: string | null;
  num_packages: string | null;
  weight: string | null;
  track_status: string | null;
  history: {
    time: string | null;
    status_cn: string | null;
    desc_full: string | null;
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
    bill_id: trackElem.getAttribute("billid"),
    channel_id: trackElem.getAttribute("rchannelid"),
    package_type: trackElem.getAttribute("goodstype"),
    country_cn: trackElem.getAttribute("country"),
    country_en: trackElem.getAttribute("countryEn"),
    last_status_time: trackElem.getAttribute("sdate"),
    last_status_location_cn: trackElem.getAttribute("desti"),
    last_status_desc_full: trackElem.getAttribute("intro"),
    num_packages: trackElem.getAttribute("goodsnum"),
    weight: trackElem.getAttribute("rweight"),
    track_status: trackElem.getAttribute("trackstatus"), // what is this?
    history: Array.from(xmlDoc.getElementsByTagName("trackitem")).map(
      (item) => {
        return {
          time: item.getAttribute("sdate"),
          status_cn: item.getAttribute("place"),
          desc_full: item.getAttribute("intro"),
        };
      },
    ),
  };
  // console.log('Got tracking info', result);
  return result;
}

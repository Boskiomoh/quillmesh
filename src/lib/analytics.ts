export type AnalyticsEvent = "page_view" | "cta_click" | "form_submit";

export const track = (event: AnalyticsEvent, label: string) => {
  try {
    if (localStorage.getItem("quillmesh-consent") !== "all") return;
  } catch {
    return;
  }
  const body = JSON.stringify({ event, label, path: location.pathname });
  if (
    !navigator.sendBeacon?.(
      "/api/events",
      new Blob([body], { type: "application/json" }),
    )
  ) {
    void fetch("/api/events", {
      method: "POST",
      body,
      keepalive: true,
      headers: { "content-type": "application/json" },
    });
  }
};

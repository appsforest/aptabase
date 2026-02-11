import { trackEvent } from "@aptabase/web";
import { Button } from "@components/Button";
import { Page, PageHeading } from "@components/Page";
import { liveSessionDetails } from "@features/analytics/query";
import { useApps, useCurrentApp } from "@features/apps";
import { CountryFlag, CountryName } from "@features/geo";
import { formatNumber } from "@fns/format-number";
import { IconArrowLeft, IconCircleCheck, IconClick, IconClock, IconDevices, IconUser } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { OSIcon } from "./dashboard/icons/os";
import { Metric, SessionTimeline } from "./liveview/timeline";

Component.displayName = "LiveSessionDetailsPage";

export function Component() {
  const { buildMode } = useApps();
  const app = useCurrentApp();
  const { sessionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  if (!app || !sessionId) return <Navigate to="/" />;

  const { isLoading, data } = useQuery({
    queryKey: ["live-session-details", app.id, buildMode, sessionId],
    queryFn: () => liveSessionDetails({ appId: app.id, buildMode, sessionId }),
    refetchInterval: 10000,
  });

  const firstEvent = JSON.parse(data?.eventsStringProps[0] ?? '{}') as { locale?: string; userId?: string; proActive?: string }

  useEffect(() => {
    trackEvent("liveview_session_viewed");
  }, []);

  const handleBack = () => {
    if (location.state?.returnTo) {
      navigate(location.state.returnTo.pathname + location.state.returnTo.search, {
        state: { sessionFilters: location.state.sessionFilters },
      });
    } else {
      navigate(`/${app.id}/live/`);
    }
  };

  return (
    <Page title="Live View">
      <div className="flex flex-row justify-between items-center">
        <PageHeading title="Session Timeline" subtitle={sessionId} />
        <Button className="mb-5" variant="ghost" onClick={handleBack}>
          <IconArrowLeft />
          {location.state?.sessionFilters ? "Back to sessions" : "Back to Live View"}
        </Button>
      </div>


      {data && (
        <div className="mt-10 flex flex-col">
          <div className="flex items-center gap-4">
            {firstEvent.userId && <Metric name="User ID" value={firstEvent.userId} icon={<IconUser className="text-muted-foreground h-4 w-4" />} />}
            {firstEvent.proActive && <Metric name="Pro" value={firstEvent.proActive} icon={<IconCircleCheck className="text-muted-foreground h-4 w-4" />} />}
            {firstEvent.locale && <Metric name="Locale" value={firstEvent.locale} />}

            <Metric name="Events" value={data.eventsCount} icon={<IconClick className="text-muted-foreground h-4 w-4" />} />
            <Metric name="Duration" value={formatNumber(data.duration, "duration")} icon={<IconClock className="text-muted-foreground h-4 w-4" />} />

            {data.regionName && data.countryCode && (
              <Metric name="Country" value={<>{data.regionName ? <span>{data.regionName} · </span> : null}<CountryName countryCode={data.countryCode} /></>} icon={<CountryFlag countryCode={data.countryCode} />} />
            )}

            <Metric name="App Version" value={data.appVersion} icon={<IconDevices className="text-muted-foreground h-4 w-4" />} />
            <Metric name="Device" value={<>{data.osName} {data.osVersion}</>} icon={<OSIcon name={data.osName} className="text-muted-foreground h-4 w-4" />} />
          </div>

          <div className="mt-8 flex flex-col gap-6">
            <SessionTimeline {...data} />
          </div>
        </div>
      )}
    </Page>
  );
}

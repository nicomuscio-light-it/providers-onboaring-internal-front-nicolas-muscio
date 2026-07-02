import { Icons } from "@/components/ui";
import type { Provider } from "@/services";

export type ProviderOverviewProps = {
  provider: Provider;
};

export const ProviderOverview = ({ provider }: ProviderOverviewProps) => {
  return (
    <div className="flex flex-col gap-5">
      <section className="flex flex-col gap-2">
        <h3 className="font-semibold text-text-default-default">About</h3>
        <p className="text-sm text-text-default-secondary">{provider.about}</p>
      </section>

      <hr className="border-border-default-default" />

      <section className="flex flex-col gap-2">
        <h3 className="font-semibold text-text-default-default">Contact information</h3>
        <div className="flex flex-col gap-3 text-sm text-text-default-default md:flex-row md:gap-8">
          <span className="flex items-center gap-2">
            <Icons.Phone className="text-icon-default-secondary" />
            {provider.phone}
          </span>
          <span className="flex items-center gap-2">
            <Icons.Mail className="text-icon-default-secondary" />
            {provider.email}
          </span>
        </div>
      </section>

      <hr className="border-border-default-default" />

      <section className="flex flex-col gap-2">
        <h3 className="font-semibold text-text-default-default">Languages</h3>
        <span className="flex items-center gap-2 text-sm text-text-default-default">
          <Icons.Globe className="text-icon-default-secondary" />
          {provider.languages.join(", ")}
        </span>
      </section>
    </div>
  );
};

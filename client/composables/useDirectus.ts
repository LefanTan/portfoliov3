import { Directus } from "@directus/sdk";
import { DirectusTypes } from "~/directus";

export default function useDirectus() {
  const config = useRuntimeConfig();
  const directus = new Directus<DirectusTypes>(config.public.cmsUrl, {});

  return directus;
}

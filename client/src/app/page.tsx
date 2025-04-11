import { redirect } from "next/navigation";

import { routes } from "@/helpers/navigation";

export default async function Home() {
  redirect(routes.dashboard());
}
import { cookies } from "next/headers";
import { AUTHENTICATION_COOKIE } from "./auth-cookie";

export default async function authenticated() {
    const c = await cookies();
    const hasCookie = !!c.get(AUTHENTICATION_COOKIE)?.value;
    console.log('Authentication check:', hasCookie);
    return hasCookie;
  }
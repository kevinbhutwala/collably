import { redirect } from "next/navigation";

export default function BrandRegisterPage() {
  redirect("/register?role=brand");
}

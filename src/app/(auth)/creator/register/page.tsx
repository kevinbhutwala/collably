import { redirect } from "next/navigation";

export default function CreatorRegisterPage() {
  redirect("/register?role=creator");
}

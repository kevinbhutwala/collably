export {
  AbeyCollabLogo,
  AbeyCollabLogo as CollablyLogo,
  AbeyCollabSymbol,
  ValenceLogo,
  NexusLogo,
} from "./AbeyCollabLogo";

export type { AbeyCollabLogoProps, AbeyCollabLogoProps as CollablyLogoProps } from "./AbeyCollabLogo";

export default function LegacyCollablyLogoWrapper(props: any) {
  const { AbeyCollabLogo } = require("./AbeyCollabLogo");
  return <AbeyCollabLogo {...props} />;
}

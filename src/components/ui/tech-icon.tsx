import type { IconType } from "react-icons";
import {
  SiCplusplus, SiCss, SiDjango, SiDocker, SiEthereum, SiExpress, SiGit, SiGithub, SiHtml5, SiIpfs,
  SiJavascript, SiLangchain, SiMongodb, SiNextdotjs, SiNodedotjs, SiOpenjdk, SiPostgresql, SiPostman,
  SiPython, SiReact, SiSocketdotio, SiSolidity, SiTailwindcss, SiTypescript, SiWebrtc,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { RiOpenaiFill } from "react-icons/ri";
import { Braces, Database, KeyRound, Layers, Network, ScanSearch, Sparkles, Waves, Wallet, Workflow, BrainCircuit, ShieldCheck } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type AnyIcon = IconType | ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

/** Maps a skill/stack label to an icon. Unknown labels fall back to a neutral glyph. */
const icons: Record<string, AnyIcon> = {
  java: SiOpenjdk,
  "c++": SiCplusplus,
  python: SiPython,
  javascript: SiJavascript,
  typescript: SiTypescript,
  sql: Database,
  "react.js": SiReact,
  react: SiReact,
  "next.js": SiNextdotjs,
  html5: SiHtml5,
  css3: SiCss,
  "tailwind css": SiTailwindcss,
  "node.js": SiNodedotjs,
  "express.js": SiExpress,
  express: SiExpress,
  "rest apis": Braces,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  "generative ai": Sparkles,
  llms: BrainCircuit,
  langchain: SiLangchain,
  rag: Workflow,
  "openai apis": RiOpenaiFill,
  openai: RiOpenaiFill,
  chromadb: Layers,
  "vector databases": Layers,
  embeddings: ScanSearch,
  faiss: ScanSearch,
  aws: FaAws,
  "aws s3": FaAws,
  git: SiGit,
  github: SiGithub,
  docker: SiDocker,
  postman: SiPostman,
  "oauth 2.0": KeyRound,
  ldap: Network,
  scim: Network,
  "sailpoint identityiq": ShieldCheck,
  whisper: Waves,
  django: SiDjango,
  solidity: SiSolidity,
  ethereum: SiEthereum,
  ipfs: SiIpfs,
  metamask: Wallet,
  webrtc: SiWebrtc,
  "socket.io": SiSocketdotio,
};

export function TechIcon({ name, size = 16, className }: { name: string; size?: number; className?: string }) {
  const Icon = icons[name.toLowerCase()] ?? Braces;
  return <Icon size={size} className={className} aria-hidden="true" />;
}

export function TechBadge({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span
      className={`toon-sm inline-flex items-center gap-1.5 rounded-full bg-bg-elev px-2.5 py-1 text-[12.5px] font-bold text-fg transition-[transform,background-color,color] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-0.5 hover:-rotate-2 hover:bg-yellow hover:text-ink ${className}`}
    >
      <TechIcon name={name} size={12} />
      {name}
    </span>
  );
}

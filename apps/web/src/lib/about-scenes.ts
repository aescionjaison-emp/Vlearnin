import fs from "fs";
import path from "path";

export type CinematicMode = "video" | "frames" | "cutout25d" | "plate" | "pending";

export interface SceneAssetManifest {
  sceneId: string;
  title: string;
  mode: CinematicMode;
  masterPath: string | null;
  backgroundPath: string | null;
  cutoutPath: string | null;
  shadowPath: string | null;
  mobilePath: string | null;
  videoPath: string | null;
  framePaths: string[];
  movementRangePx: number;
  anchor: "bottom-right" | "bottom-left" | "bottom-center";
}

const PUBLIC_ROOT = path.join(process.cwd(), "public");
const ABOUT_PUBLIC = "/images/about";

function publicExists(relPath: string): boolean {
  return fs.existsSync(path.join(PUBLIC_ROOT, relPath.replace(/^\//, "")));
}

function firstExisting(candidates: string[]): string | null {
  for (const rel of candidates) {
    if (publicExists(rel)) return rel;
  }
  return null;
}

export function resolveSceneManifest(
  sceneId: string,
  title: string,
  anchor: SceneAssetManifest["anchor"] = "bottom-right",
  movementRangePx = 28
): SceneAssetManifest {
  const dirRel = `${ABOUT_PUBLIC}/${sceneId}`;
  const dirAbs = path.join(PUBLIC_ROOT, "images", "about", sceneId);

  const masterPath = firstExisting([`${dirRel}/master.webp`, `${dirRel}/master.png`, `${dirRel}/master.jpg`]);
  const backgroundPath = firstExisting([
    `${dirRel}/background.webp`,
    `${dirRel}/${sceneId.split("/").pop()}-background.webp`,
  ]);
  const cutoutPath = firstExisting([
    `${dirRel}/student-cutout.webp`,
    `${dirRel}/student-cutout.png`,
    `${dirRel}/student-mentor-cutout.webp`,
    `${dirRel}/student-mentor-cutout.png`,
  ]);
  const shadowPath = firstExisting([`${dirRel}/shadow.webp`, `${dirRel}/shadow.png`]);
  const mobilePath = firstExisting([`${dirRel}/mobile.webp`, `${dirRel}/mobile.png`]);
  const videoPath = firstExisting([`${dirRel}/cinematic.mp4`, `${dirRel}/cinematic.webm`]);

  const framesAbs = path.join(dirAbs, "frames");
  let framePaths: string[] = [];
  if (fs.existsSync(framesAbs)) {
    framePaths = fs
      .readdirSync(framesAbs)
      .filter((f) => /\.(webp|png|jpg)$/i.test(f))
      .sort()
      .map((f) => `${dirRel}/frames/${f}`);
  }

  let mode: CinematicMode = "pending";
  if (videoPath) mode = "video";
  else if (framePaths.length > 0) mode = "frames";
  else if (cutoutPath && backgroundPath) mode = "cutout25d";
  else if (masterPath || backgroundPath) mode = "plate";

  return {
    sceneId,
    title,
    mode,
    masterPath,
    backgroundPath,
    cutoutPath,
    shadowPath,
    mobilePath,
    videoPath,
    framePaths,
    movementRangePx,
    anchor,
  };
}

export function getSignatureSceneManifests() {
  return {
    vision: resolveSceneManifest("vision", "Our Vision", "bottom-right", 32),
    mission: resolveSceneManifest("mission", "Our Mission", "bottom-left", 26),
    philosophy: resolveSceneManifest("philosophy", "Our Educational Philosophy", "bottom-center", 28),
  };
}

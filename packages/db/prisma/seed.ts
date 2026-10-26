

import prisma from  "../index"



const DEFAULT_WALLPAPERS = [
  { name: "Sunset", url: "/wallpapers/sunset.svg" },
  { name: "Ocean", url: "/wallpapers/ocean.svg" },
  { name: "Violet", url: "/wallpapers/violet.svg" },
  { name: "Forest", url: "/wallpapers/forest.svg" },
  { name: "Midnight", url: "/wallpapers/midnight.svg" },
  { name: "Rose", url: "/wallpapers/rose.svg" },
  { name: "Amber", url: "/wallpapers/amber.svg" },
  { name: "Mint", url: "/wallpapers/mint.svg" },
  { name: "Lavender", url: "/wallpapers/lavender.svg" },
  { name: "Slate", url: "/wallpapers/slate.svg" },
  { name: "Coral", url: "/wallpapers/coral.svg" },
  { name: "Teal", url: "/wallpapers/teal.svg" },
  { name: "Peach", url: "/wallpapers/peach.svg" },
  { name: "Charcoal", url: "/wallpapers/charcoal.svg" },
  { name: "Aurora", url: "/wallpapers/aurora.svg" },
];


async function seed(){
    for (const wallpaper of DEFAULT_WALLPAPERS){
        const existing = await prisma.wallpaper.findFirst({
            where:{name : wallpaper.name, isDefault:true}
        })
        if (existing) {
      console.log(`skip (already exists): ${wallpaper.name}`);
      continue;
    }
     await prisma.wallpaper.create({
      data: { ...wallpaper, isDefault: true, ownerId: null },
    });
    console.log(`created: ${wallpaper.name}`);
  }
}


seed()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
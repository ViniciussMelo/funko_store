import fs from "fs";

import uploadConfig from "../config/uploadConfig";

const deleteFile = async (file: string) => {
  const fileLocation = `${uploadConfig.tmpFolder}/${file}`;
  try {
    await fs.promises.stat(fileLocation);
  } catch {
    return;
  }

  await fs.promises.unlink(fileLocation);
}

export { deleteFile };